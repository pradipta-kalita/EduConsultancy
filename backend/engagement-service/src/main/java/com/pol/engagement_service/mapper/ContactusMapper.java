package com.pol.engagement_service.mapper;

import com.pol.engagement_service.dto.contact.ContactusRequestDTO;
import com.pol.engagement_service.dto.contact.ContactusResponseDTO;
import com.pol.engagement_service.dto.contact.ContactusSummaryDTO;
import com.pol.engagement_service.entity.ContactUs;

public class ContactusMapper {
    public static ContactUs toEntity(ContactusRequestDTO contactusRequestDTO){
        ContactUs contactUs = new ContactUs();
        contactUs.setEmail(contactusRequestDTO.getEmail());
        contactUs.setName(contactusRequestDTO.getName());
        contactUs.setSubject(contactusRequestDTO.getSubject());
        contactUs.setMessage(contactusRequestDTO.getMessage());
        contactUs.setPhoneNumber(contactusRequestDTO.getPhoneNumber());
        return contactUs;
    }

    public static ContactusResponseDTO toResponseDTO(ContactUs contactUs){
        ContactusResponseDTO contactusResponseDTO = new ContactusResponseDTO();
        contactusResponseDTO.setEmail(contactUs.getEmail());
        contactusResponseDTO.setName(contactUs.getName());
        contactusResponseDTO.setSubject(contactUs.getSubject());
        contactusResponseDTO.setMessage(contactUs.getMessage());
        contactusResponseDTO.setId(contactUs.getId());
        contactusResponseDTO.setPhoneNumber(contactUs.getPhoneNumber());
        return contactusResponseDTO;
    }

}
