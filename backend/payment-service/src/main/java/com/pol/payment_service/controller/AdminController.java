package com.pol.payment_service.controller;

import com.pol.payment_service.dto.ApiResponse;
import com.pol.payment_service.dto.PaymentPageResponseDTO;
import com.pol.payment_service.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/payments")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    public ResponseEntity<ApiResponse<PaymentPageResponseDTO>> getAllPayments(
            @RequestParam(defaultValue = "0",required = false) int page,
            @RequestParam(defaultValue = "10",required = false) int size,
            @RequestParam(defaultValue = "order_id",required = false) String sortBy,
            @RequestParam(defaultValue = "asc",required = false) String order
    ){
        return null;
    }
}
