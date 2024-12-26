package com.pol.engagement_service.service;

import com.pol.engagement_service.dto.contact.ContactPageResponseDTO;
import com.pol.engagement_service.dto.contact.ContactusRequestDTO;
import com.pol.engagement_service.dto.contact.ContactusResponseDTO;
import com.pol.engagement_service.dto.contact.ContactusSummaryDTO;
import com.pol.engagement_service.entity.ContactUs;
import com.pol.engagement_service.entity.Feedback;
import com.pol.engagement_service.mapper.ContactusMapper;
import com.pol.engagement_service.repository.ContactusRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ContactusService {

    private final ContactusRepository contactusRepository;

    public ContactusService(ContactusRepository contactusRepository) {
        this.contactusRepository = contactusRepository;
    }

    public void createContactUs(ContactusRequestDTO contactusRequestDTO){
        contactusRepository.save(ContactusMapper.toEntity(contactusRequestDTO));
    }

    public ContactusResponseDTO getContactUsById(UUID id){
        return ContactusMapper.toResponseDTO(contactusRepository.findById(id).orElseThrow(()->new RuntimeException("Contact us entity not found by id : "+id)));
    }

    public void deleteContactUsById(UUID id){
        if(contactusRepository.existsById(id)){
            contactusRepository.deleteById(id);
        }else {
            throw new RuntimeException("Contact us entity doesn't exist by id : "+id);
        }
    }

    public ContactPageResponseDTO getAllContactus(int page, int size, String sortBy, String order){
        String[] sortFields = sortBy.split(",");
        Sort sort = Sort.by(order.equalsIgnoreCase("asc")?Sort.Order.asc(sortFields[0]):Sort.Order.desc(sortFields[0]));
        for(int i=1;i<sortFields.length;i++){
            sort= Sort.by(order.equalsIgnoreCase("asc")?Sort.Order.asc(sortFields[i]):Sort.Order.desc(sortFields[i]));
        }
        Pageable pageable = PageRequest.of(page,size,sort);
        Page<ContactusSummaryDTO> contactusSummaryDTOPage =contactusRepository.getAllContactusList(pageable);
        return ContactPageResponseDTO.builder()
                .list(contactusSummaryDTOPage.getContent())
                .totalElements(contactusSummaryDTOPage.getTotalElements())
                .totalPages(contactusSummaryDTOPage.getTotalPages())
                .pageSize(contactusSummaryDTOPage.getSize())
                .currentPage(contactusSummaryDTOPage.getNumber())
                .hasNext(contactusSummaryDTOPage.hasNext())
                .hasPrevious(contactusSummaryDTOPage.hasPrevious())
                .build();
    }
}
