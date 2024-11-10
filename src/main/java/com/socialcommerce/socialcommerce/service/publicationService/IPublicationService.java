package com.socialcommerce.socialcommerce.service.publicationService;

import com.socialcommerce.socialcommerce.dto.CreatePublicationDto;
import com.socialcommerce.socialcommerce.dto.ShowPublicationDto;
import com.socialcommerce.socialcommerce.model.Publication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface IPublicationService {

    CreatePublicationDto createANewPost(CreatePublicationDto publicationDto, UUID sellerId);
    List<Publication> getAllPublications();
    List<ShowPublicationDto> getAllPublicationByBuyer(UUID buyerId);

    List<ShowPublicationDto> getAllByLocalDateOrder(String type);
 }
