package com.pol.engagement_service.service;

import com.pol.engagement_service.dto.feedback.FeedbackPageResponseDTO;
import com.pol.engagement_service.dto.feedback.FeedbackRequestDTO;
import com.pol.engagement_service.dto.feedback.FeedbackResponseDTO;
import com.pol.engagement_service.dto.feedback.FeedbackSummaryDTO;
import com.pol.engagement_service.mapper.FeedbackMapper;
import com.pol.engagement_service.repository.FeedbackRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class FeedbackService {
    private final FeedbackRepository feedbackRepository;

    public FeedbackService(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    public void createFeedback(FeedbackRequestDTO feedbackRequestDTO){
        System.out.println(feedbackRequestDTO);
        feedbackRepository.save(FeedbackMapper.toEntity(feedbackRequestDTO));
    }

    public void deleteFeedback(UUID id){
        if(feedbackRepository.existsById(id)){
            feedbackRepository.deleteById(id);
        }else {
            throw new RuntimeException("Feedback with id : "+id+" doesn't exist.");
        }
    }

    public FeedbackResponseDTO getFeedbackById(UUID id){
        return FeedbackMapper.toResponseDTO(feedbackRepository.findById(id).orElseThrow(()->new RuntimeException("Feedback with id : "+id+" doesn't exist.")));
    }

    public FeedbackPageResponseDTO getAllFeedbacks(int page, int size, String sortBy, String order){
        String[] sortFields = sortBy.split(",");
        Sort sort = Sort.by(order.equalsIgnoreCase("asc")?Sort.Order.asc(sortFields[0]):Sort.Order.desc(sortFields[0]));
        for(int i=1;i<sortFields.length;i++){
            sort= Sort.by(order.equalsIgnoreCase("asc")?Sort.Order.asc(sortFields[i]):Sort.Order.desc(sortFields[i]));
        }
        Pageable pageable = PageRequest.of(page,size,sort);
        Page<FeedbackSummaryDTO> feedbackPage =feedbackRepository.getAllFeedbackList(pageable);
        return FeedbackPageResponseDTO.builder()
                .list(feedbackPage.getContent())
                .currentPage(feedbackPage.getNumber())
                .totalPages(feedbackPage.getTotalPages())
                .totalElements(feedbackPage.getTotalElements())
                .pageSize(feedbackPage.getSize())
                .hasNext(feedbackPage.hasNext())
                .hasPrevious(feedbackPage.hasPrevious())
                .build();
    }
}
