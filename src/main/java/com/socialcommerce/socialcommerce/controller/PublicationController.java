package com.socialcommerce.socialcommerce.controller;


import com.socialcommerce.socialcommerce.dto.CreatePublicationDto;
import com.socialcommerce.socialcommerce.service.PublicationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/publications")
public class PublicationController {

    private PublicationService publicationService;

    public PublicationController(PublicationService publicationService) {
        this.publicationService = publicationService;
    }

    @PostMapping("/{sellerId}/createPublication")
    public ResponseEntity<CreatePublicationDto> createPublication(@RequestBody CreatePublicationDto createPublicationDto, @PathVariable UUID sellerId) {
        return new ResponseEntity<>(publicationService.createANewPost(createPublicationDto, sellerId), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<?> getAllPublications() {
        return new ResponseEntity<>(publicationService.getAllPublications(), HttpStatus.OK);
    }
}