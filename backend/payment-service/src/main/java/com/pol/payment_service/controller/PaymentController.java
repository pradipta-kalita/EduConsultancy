package com.pol.payment_service.controller;

import com.pol.payment_service.client.ProductFeignClient;
import com.pol.payment_service.dto.ApiResponse;
import com.pol.payment_service.dto.CoursePriceDTO;
import com.pol.payment_service.dto.PaymentRequestDTO;
import com.pol.payment_service.exceptions.ProductNotFoundException;
import com.pol.payment_service.service.PaymentService;
import com.razorpay.RazorpayException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    private final PaymentService paymentService;
    private final ProductFeignClient productFeignClient;

    public PaymentController(PaymentService paymentService, ProductFeignClient productFeignClient) {
        this.paymentService = paymentService;
        this.productFeignClient = productFeignClient;
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<String>> createOrder(@RequestBody @Valid PaymentRequestDTO paymentRequestDTO, @RequestHeader("X-User-Id") String userId) {
        try {
            String orderId = paymentService.createOrder(paymentRequestDTO,userId);
            return ResponseEntity.ok(new ApiResponse<>(HttpStatus.CREATED.value(), "Order created successfully", orderId));
        } catch (RazorpayException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Order creation failed", null));
        } catch (ProductNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(HttpStatus.NOT_FOUND.value(), e.getMessage(), null));
        }
    }

    @GetMapping("/course-price/{id}")
    public ResponseEntity<ApiResponse<CoursePriceDTO>> getCoursePrice(@PathVariable UUID id) {
        try {
            CoursePriceDTO coursePriceDTO = productFeignClient.getCoursePriceById(id);
            return ResponseEntity.ok(new ApiResponse<>(HttpStatus.CREATED.value(), "Course price retrieved", coursePriceDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(HttpStatus.NOT_FOUND.value(), "Course not found", null));
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<ApiResponse<String>> verifyPayment(@RequestBody Map<String, String> paymentDetails) {
        try {
            String verificationStatus = paymentService.verifyPayment(paymentDetails);
            return ResponseEntity.ok(new ApiResponse<>(HttpStatus.CREATED.value(), "Payment verified successfully", verificationStatus));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Payment verification failed", null));
        }
    }
}
