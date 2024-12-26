package com.pol.payment_service.service;

import com.pol.payment_service.client.ProductFeignClient;
import com.pol.payment_service.dto.CoursePriceDTO;
import com.pol.payment_service.dto.PaymentRequestDTO;
import com.pol.payment_service.entity.Payment;
import com.pol.payment_service.exceptions.PaymentNotFoundException;
import com.pol.payment_service.exceptions.ProductNotFoundException;
import com.pol.payment_service.repository.PaymentRepository;
import com.razorpay.RazorpayClient;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;


import java.util.Map;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PaymentServiceTest {

    @Mock
    private RazorpayClient razorpayClient;

    @Mock
    private PaymentRepository paymentRepository;

    @Mock
    private ProductFeignClient productFeignClient;

    @InjectMocks
    private PaymentService paymentService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createOrder_ShouldThrowProductNotFoundException() {
        // Arrange
        UUID productId = UUID.randomUUID();
        PaymentRequestDTO paymentRequestDTO = new PaymentRequestDTO();
        paymentRequestDTO.setProductId(productId);

        when(productFeignClient.getCoursePriceById(productId)).thenReturn(null);

        // Act & Assert
        assertThrows(ProductNotFoundException.class, () -> paymentService.createOrder(paymentRequestDTO,UUID.randomUUID().toString()));
    }


    @Test
    void verifyPayment_ShouldThrowPaymentNotFoundException() {
        // Arrange
        String razorpayOrderId = UUID.randomUUID().toString();
        Map<String, String> paymentDetails = Map.of(
                "razorpay_payment_id", "payment_id",
                "razorpay_order_id", razorpayOrderId,
                "razorpay_signature", "signature"
        );

        when(paymentRepository.existsById(UUID.fromString(razorpayOrderId))).thenReturn(false);

        // Act & Assert
        assertThrows(PaymentNotFoundException.class, () -> paymentService.verifyPayment(paymentDetails));
    }


}
