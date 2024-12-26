package com.pol.email_service.service;


import com.pol.email_service.utils.EmailTemplates;
import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import com.resend.services.emails.model.CreateEmailResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ResendService {

    @Value("${resend.from-email}")
    private String fromEmail;

    private final Resend resend;
    private final EmailTemplates emailTemplates = EmailTemplates.getInstance();

    public ResendService(Resend resend) {
        this.resend = resend;
    }


    public void sendWelcomeEmail(String to, String userName) {

        CreateEmailOptions options = CreateEmailOptions.builder()
                .from(fromEmail)
                .to(to)
                .subject("Welcome, "+userName)
                .html(emailTemplates.getWelcomeTemplate(userName))
                .build();
        try {
             resend.emails().send(options);
        } catch (ResendException e) {
            throw new RuntimeException("There was a error while sending email. Please try again later.");
        }
    }


    public void sendForgotPasswordOTPEmail(String to, String name,String otp) {
        CreateEmailOptions options = CreateEmailOptions.builder()
                .from(fromEmail)
                .to(to)
                .subject("OTP VERIFICATION")
                .html(emailTemplates.getForgotPasswordTemplate(name,otp))
                .build();
        try {
            resend.emails().send(options);
        } catch (ResendException e) {
            throw new RuntimeException("There was a error while sending email. Please try again later.");
        }
    }

    public void sendCoursePurchasedEmail(String orderId,String userId, String amount, String currency, String productId, String purchasedAt) {
        CreateEmailOptions options = CreateEmailOptions.builder()
                .from(fromEmail)
                .to("info.coderpol@gmail.com")
                .subject("Course sold")
                .html(emailTemplates.getCoursePurchaseTemplate(orderId, userId, amount, currency, productId, purchasedAt))
                .build();
        try {
            resend.emails().send(options);
        } catch (ResendException e) {
            throw new RuntimeException("There was a error while sending email. Please try again later.");
        }
    }
}
