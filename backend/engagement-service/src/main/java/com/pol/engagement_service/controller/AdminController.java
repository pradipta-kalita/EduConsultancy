package com.pol.engagement_service.controller;

import com.pol.engagement_service.dto.contact.ContactPageResponseDTO;
import com.pol.engagement_service.dto.contact.ContactusResponseDTO;
import com.pol.engagement_service.dto.feedback.FeedbackPageResponseDTO;
import com.pol.engagement_service.dto.feedback.FeedbackResponseDTO;
import com.pol.engagement_service.service.ContactusService;
import com.pol.engagement_service.service.FeedbackService;
import com.pol.engagement_service.utils.AppConstants;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final FeedbackService feedbackService;
    private final ContactusService contactusService;

    public AdminController(FeedbackService feedbackService, ContactusService contactusService) {
        this.feedbackService = feedbackService;
        this.contactusService = contactusService;
    }

    @GetMapping("/feedbacks")
    public ResponseEntity<FeedbackPageResponseDTO> getAllFeedbacks(
            @RequestParam(defaultValue = AppConstants.PAGE,required = false) int page,
            @RequestParam(defaultValue = AppConstants.SIZE,required = false) int size,
            @RequestParam(defaultValue = AppConstants.SORT_BY_ID,required = false) String sortBy,
            @RequestParam(defaultValue = AppConstants.ORDER,required = false) String order
    ){
        return ResponseEntity.ok(feedbackService.getAllFeedbacks(page,size,sortBy,order));
    }

    @GetMapping("/feedbacks/{id}")
    public ResponseEntity<FeedbackResponseDTO> getFeedbackById( @PathVariable  UUID id){
        FeedbackResponseDTO response = feedbackService.getFeedbackById(id);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/feedbacks/{id}")
    public void deleteFeedbackById(@PathVariable  UUID id){
        feedbackService.deleteFeedback(id);
    }

    @GetMapping("/contactus")
    public ResponseEntity<ContactPageResponseDTO> getAllContactus(
            @RequestParam(defaultValue = AppConstants.PAGE,required = false) int page,
            @RequestParam(defaultValue = AppConstants.SIZE,required = false) int size,
            @RequestParam(defaultValue = AppConstants.SORT_BY_ID,required = false) String sortBy,
            @RequestParam(defaultValue = AppConstants.ORDER,required = false) String order
    ){
        return ResponseEntity.ok(contactusService.getAllContactus(page,size,sortBy,order));
    }

    @GetMapping("/contactus/{id}")
    public ResponseEntity<ContactusResponseDTO> getContactUsById(@PathVariable  UUID id){
        ContactusResponseDTO response = contactusService.getContactUsById(id);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/contactus/{id}")
    public void deleteContactUsById(@PathVariable  UUID id){
        contactusService.deleteContactUsById(id);
    }
}
