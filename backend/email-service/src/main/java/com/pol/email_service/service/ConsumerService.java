package com.pol.email_service.service;


import com.pol.payment_service.schema.avro.CoursePurchasedEvent;
import com.pol.user_service.schema.avro.ForgotPasswordEvent;
import com.pol.user_service.schema.avro.UserRegisteredEvent;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class ConsumerService {

    private final ResendService resendService;

    public ConsumerService(ResendService resendService) {
        this.resendService = resendService;
    }

    @KafkaListener(topics = "user-registered-topic", groupId = "notification-service")
    public void processRegistrationOtp(UserRegisteredEvent event) {
        resendService.sendWelcomeEmail(event.getEmail().toString(),event.getName().toString());
    }

    @KafkaListener(topics = "forgot-password-topic", groupId = "notification-service")
    public void processForgotPasswordOtp(ForgotPasswordEvent event) {
        resendService.sendForgotPasswordOTPEmail(event.getEmail().toString(),event.getName().toString(),event.getOtp().toString());
    }

    @KafkaListener(topics = "course-purchased-topic", groupId = "notification-service")
    public void processCoursePurchased(CoursePurchasedEvent event) {
        System.out.println(event);
        resendService.sendCoursePurchasedEmail(
                event.getOrderId().toString(),
                event.getUserName().toString(),
                event.getAmount().toString(),
                event.getCurrency().toString(),
                event.getProduct().toString(),
                event.getTime().toString()
        );
    }
}
