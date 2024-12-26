package com.pol.engagement_service.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "feedbacks")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank(message = "Your name is required.")
    @Size(max = 50, message = "Your name cannot be longer than 50 letters.")
    @Column(nullable = false)
    private String name;

    @Email(message = "Email address is not valid.")
    @NotBlank(message = "Email is required.")
    @Column(nullable = false)
    private String email;

    @NotBlank(message = "Feedback is required.")
    @Column(columnDefinition = "MEDIUMTEXT", nullable = false)
    private String feedback;

    @NotNull(message = "Rating is required.")
    @Column(nullable = false)
    private int rating;

    @Column(length = 200, nullable = false)
    @ColumnDefault("''")
    private String summary;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate(){
        this.createdAt= LocalDateTime.now();
        updateFeedbackSummary();
    }

    private void updateFeedbackSummary() {
        if (this.feedback != null) {
            this.summary = this.feedback.length() > 200
                    ? this.feedback.substring(0, 197) + "..."
                    : this.feedback;
        } else {
            this.summary = "";
        }
    }
}
