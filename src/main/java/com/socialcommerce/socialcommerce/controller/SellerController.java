package com.socialcommerce.socialcommerce.controller;

import com.socialcommerce.socialcommerce.dto.*;
import com.socialcommerce.socialcommerce.service.sellerService.SellerService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/seller")
public class SellerController {

    private SellerService sellerService;

    public SellerController(SellerService sellerService) {
        this.sellerService = sellerService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createSeller(@Valid @RequestBody CreateSellerDto sellerDto) {
        sellerService.createSeller(sellerDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/profile/{sellerId}")
    public ResponseEntity<SellerProfileDto> sellerProfile (@PathVariable Long sellerId){
        return ResponseEntity.ok(sellerService.sellerProfile(sellerId));
    }

    @GetMapping("/findASeller/{sellerName}")
    public ResponseEntity<List<SellerForBuyerProfileDto>> findAllSellersByName (@PathVariable String sellerName){
        return ResponseEntity.ok(sellerService.getAllByName(sellerName));
    }

    @PutMapping("{sellerId}/image")
    public ResponseEntity<?> uploadImage(@PathVariable Long sellerId,@RequestBody ImagePathDto imagePath){
        sellerService.uploadImage(sellerId, imagePath);
        return ResponseEntity.status(200).build();
    }

    @GetMapping("/metrics/{sellerId}")
    public ResponseEntity<SellerMetrics> getAllSellerMetrics (@PathVariable Long sellerId){
        return ResponseEntity.ok(sellerService.getSellerMetrics(sellerId));
    }

}
