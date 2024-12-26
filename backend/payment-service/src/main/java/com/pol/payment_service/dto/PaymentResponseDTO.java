package com.pol.payment_service.dto;

import com.pol.payment_service.entity.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentResponseDTO {
    private String id;
    private BigDecimal amount;
    private BigDecimal amountPaid;
    private BigDecimal amountDue;
    private String currency;
    private PaymentStatus status;
    private UUID userId;
    private UUID productId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
