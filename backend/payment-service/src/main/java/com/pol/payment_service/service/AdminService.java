package com.pol.payment_service.service;

import com.pol.payment_service.dto.PaymentPageResponseDTO;
import com.pol.payment_service.entity.Payment;
import com.pol.payment_service.repository.PaymentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final PaymentRepository paymentRepository;

    public AdminService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public PaymentPageResponseDTO getAllPayments(int page, int size, String sortBy, String order){
        String[] sortFields = sortBy.split(",");
        Sort sort = Sort.by(order.equalsIgnoreCase("asc")?Sort.Order.asc(sortFields[0]):Sort.Order.desc(sortFields[0]));
        for(int i=1;i<sortFields.length;i++){
            sort= Sort.by(order.equalsIgnoreCase("asc")?Sort.Order.asc(sortFields[i]):Sort.Order.desc(sortFields[i]));
        }
        Pageable pageable = PageRequest.of(page,size,sort);
        Page<Payment> payments = paymentRepository.findAll(pageable);

        return PaymentPageResponseDTO.builder()
                .list(payments.getContent())
                .currentPage(payments.getNumber())
                .totalPages(payments.getTotalPages())
                .totalElements(payments.getTotalElements())
                .pageSize(payments.getSize())
                .hasNext(payments.hasNext())
                .hasPrevious(payments.hasPrevious())
                .build();
    }
}
