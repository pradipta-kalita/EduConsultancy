package com.pol.payment_service.service;

import com.pol.payment_service.client.ProductFeignClient;
import com.pol.payment_service.constants.KafkaTopics;
import com.pol.payment_service.dto.CoursePriceDTO;
import com.pol.payment_service.dto.PaymentRequestDTO;
import com.pol.payment_service.entity.Payment;
import com.pol.payment_service.exceptions.PaymentNotFoundException;
import com.pol.payment_service.exceptions.PaymentProcessingException;
import com.pol.payment_service.exceptions.ProductNotFoundException;
import com.pol.payment_service.mapper.PaymentMapper;
import com.pol.payment_service.repository.PaymentRepository;
import com.pol.payment_service.schema.avro.CoursePurchasedEvent;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Service
public class PaymentService {

    private final RazorpayClient razorpay;
    private final PaymentRepository paymentRepository;
    private final ProductFeignClient productFeignClient;
    private final KafkaTemplate<String,Object> kafkaTemplate;
    private static final Logger logger = LoggerFactory.getLogger(PaymentService.class);

    public PaymentService(RazorpayClient razorpay, PaymentRepository paymentRepository, ProductFeignClient productFeignClient, KafkaTemplate<String, Object> kafkaTemplate) {
        this.razorpay = razorpay;
        this.paymentRepository = paymentRepository;
        this.productFeignClient = productFeignClient;
        this.kafkaTemplate = kafkaTemplate;
    }

    @Value("${razorpay.key_secret}")
    private String keySecret;


    public String createOrder(PaymentRequestDTO paymentRequestDTO,String userId) throws RazorpayException {
        if (paymentRequestDTO.getProductId() == null) {
            throw new IllegalArgumentException("Product ID must be provided.");
        }

        UUID productId = paymentRequestDTO.getProductId();
        CoursePriceDTO coursePriceDTO;
        try {
            coursePriceDTO = productFeignClient.getCoursePriceById(productId);
        } catch (Exception e) {
            throw new ProductNotFoundException("Failed to fetch product details for ID: " + productId, e);
        }

        if (coursePriceDTO == null || coursePriceDTO.getPrice() == null) {
            throw new ProductNotFoundException("Product not found with ID: " + productId);
        }

        JSONObject options = new JSONObject();
        options.put("amount", coursePriceDTO.getPrice().multiply(new BigDecimal(100)));
        options.put("currency", "INR");
        options.put("receipt", UUID.randomUUID().toString());

        Order order;
        try {
            order = razorpay.orders.create(options);
        } catch (RazorpayException e) {
            throw new PaymentProcessingException("Failed to create Razorpay order", e);
        }

        Payment payment = PaymentMapper.toEntity(order);
        payment.setProductId(productId);
        payment.setUserId(UUID.fromString(userId));
        payment.setCreatedAt(LocalDateTime.now());
        paymentRepository.save(payment);

        CoursePurchasedEvent coursePurchasedEvent = new CoursePurchasedEvent();
        coursePurchasedEvent.setOrderId(payment.getId());
        coursePurchasedEvent.setAmount(payment.getAmount().toString());
        coursePurchasedEvent.setCurrency(payment.getCurrency());
        coursePurchasedEvent.setUserName(userId);
        coursePurchasedEvent.setProduct(payment.getProductId().toString());
        coursePurchasedEvent.setTime(LocalDateTime.now().toString());
        try {
            kafkaTemplate.send(KafkaTopics.CoursePurchasedEvent, coursePurchasedEvent);
        } catch (Exception kafkaException) {
            logger.error("Failed to publish course purchased event to Kafka", kafkaException);
        }

        return payment.getId();
    }

    public String verifyPayment(Map<String, String> paymentDetails) throws RazorpayException {
        String razorpayPaymentId = paymentDetails.get("razorpay_payment_id");
        String razorpayOrderId = paymentDetails.get("razorpay_order_id");
        String razorpaySignature = paymentDetails.get("razorpay_signature");

        if (!paymentRepository.existsById(UUID.fromString(razorpayOrderId))) {
            throw new PaymentNotFoundException("Order ID not found: " + razorpayOrderId);
        }

        JSONObject options = new JSONObject();
        options.put("razorpay_payment_id", razorpayPaymentId);
        options.put("razorpay_order_id", razorpayOrderId);
        options.put("razorpay_signature", razorpaySignature);

        boolean isValid;
        try {
            isValid = Utils.verifyPaymentSignature(options, keySecret);
        } catch (RazorpayException e) {
            throw new PaymentProcessingException("Signature verification failed", e);
        }

        return isValid ? "Successful" : "Failed";
    }
}
