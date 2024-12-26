package com.pol.engagement_service.controller;

import com.pol.engagement_service.dto.contact.ContactusRequestDTO;
import com.pol.engagement_service.service.ContactusService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/contactus")
public class ContactusController {

    private final ContactusService contactusService;

    public ContactusController(ContactusService contactusService) {
        this.contactusService = contactusService;
    }

    @PostMapping
    public void createContactUs(@Valid @RequestBody ContactusRequestDTO contactusRequestDTO){
        contactusService.createContactUs(contactusRequestDTO);
    }
}
