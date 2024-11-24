package com.socialcommerce.socialcommerce.controller;


import com.socialcommerce.socialcommerce.dto.CreatePublicationDto;
import com.socialcommerce.socialcommerce.dto.ShowProductDto;
import com.socialcommerce.socialcommerce.dto.ShowPublicationDto;
import com.socialcommerce.socialcommerce.service.publicationService.PublicationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/publications")
public class PublicationController {

    private PublicationService publicationService;

    public PublicationController(PublicationService publicationService) {
        this.publicationService = publicationService;
    }

    @PostMapping("/{sellerId}/createPublication")
    public ResponseEntity<CreatePublicationDto> createPublication(@RequestBody CreatePublicationDto createPublicationDto, @PathVariable Long sellerId) {
        return new ResponseEntity<>(publicationService.createANewPost(createPublicationDto, sellerId), HttpStatus.CREATED);
    }

//    @GetMapping("/{buyerId}/order")
//    public ResponseEntity<List<ShowPublicationDto>> getAllPublicationInOrder(@RequestParam String type, @PathVariable Long buyerId) {
//        return ResponseEntity.ok(publicationService.getAllByLocalDateOrder(buyerId, type));
//    }

    @GetMapping("/promo/{buyerId}")
    public ResponseEntity<List<ShowPublicationDto>> getAllPromoPublication(@PathVariable Long buyerId) {
        return ResponseEntity.ok(publicationService.getAllByPromo(buyerId));
    }

    @PutMapping("/delete/{publicationId}/seller/{sellerId}")
    public ResponseEntity<?> deleteAPublicationBySeller(@PathVariable Long publicationId, @PathVariable Long sellerId){
        publicationService.deleteAPublicationBySellerId(sellerId, publicationId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/buyer/{buyerId}/category/{categoryId}")
    public ResponseEntity<List<ShowPublicationDto>> getAllByCategoryType(@PathVariable Long buyerId, @PathVariable Integer categoryId) {
        return ResponseEntity.ok(publicationService.getAllByCategoryType(categoryId, buyerId));
    }

    @GetMapping("/buyer/{buyerId}")
    public ResponseEntity<List<ShowPublicationDto>> getAllByBuyer(@PathVariable Long buyerId) {
        return ResponseEntity.ok(publicationService.getAllPublicationByBuyer(buyerId));
    }

    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<ShowPublicationDto>> getAllBySeller(@PathVariable Long sellerId) {
        return ResponseEntity.ok(publicationService.getAllBySeller(sellerId));
    }

    @GetMapping("/mostPromo/{sellerId}")
    public ResponseEntity<List<ShowPublicationDto>> getAllBestPromoPosts(@PathVariable Long sellerId) {
        return ResponseEntity.ok(publicationService.getAllPostsWithMorePromotion(sellerId));
    }


}
