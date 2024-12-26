package com.pol.engagement_service.repository;

import com.pol.engagement_service.dto.feedback.FeedbackSummaryDTO;
import com.pol.engagement_service.entity.Feedback;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, UUID> {

    @Query(
            "SELECT new com.pol.engagement_service.dto.feedback.FeedbackSummaryDTO(f.id, f.name, f.rating, f.email, f.summary, CAST(f.createdAt AS string)) " +
                    "FROM Feedback f"
    )
    Page<FeedbackSummaryDTO> getAllFeedbackList(Pageable pageable);
}
