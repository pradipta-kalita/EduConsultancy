package com.pol.engagement_service.repository;

import com.pol.engagement_service.dto.contact.ContactusSummaryDTO;
import com.pol.engagement_service.entity.ContactUs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ContactusRepository extends JpaRepository<ContactUs, UUID> {

    @Query(
            "SELECT new com.pol.engagement_service.dto.contact.ContactusSummaryDTO(c.id, c.name, c.subject, CAST(c.createdAt AS string)) " +
                    "FROM ContactUs c"
    )
    Page<ContactusSummaryDTO> getAllContactusList(Pageable pageable);
}
