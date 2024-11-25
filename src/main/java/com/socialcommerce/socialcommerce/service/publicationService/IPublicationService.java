package com.socialcommerce.socialcommerce.service.publicationService;

import com.socialcommerce.socialcommerce.dto.CreatePublicationDto;
import com.socialcommerce.socialcommerce.dto.ShowPublicationDto;
import com.socialcommerce.socialcommerce.model.Publication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface IPublicationService {

    CreatePublicationDto createANewPost(CreatePublicationDto publicationDto, Long sellerId);
    List<ShowPublicationDto> getAllPublicationByBuyer(Long buyerId);
//    List<ShowPublicationDto> getAllByLocalDateOrder(Long buyerId, String type);
    List<ShowPublicationDto> getAllByPromo(Long buyerId);
    void deleteAPublicationBySellerId(Long sellerId, Long publicationId);
    List<ShowPublicationDto> getAllByCategoryType(Integer categoryId, Long buyerId);
    List<ShowPublicationDto> getAllBySeller(Long sellerId);
    List<ShowPublicationDto> getAllPostsWithMorePromotion(Long sellerId);

 }
