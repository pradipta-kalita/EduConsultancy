package com.pol.engagement_service.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ErrorResponseDto {
    private int errorCode;
    private String message;
    private String timestamp;
    private String details;
    private String resolveHint;
}