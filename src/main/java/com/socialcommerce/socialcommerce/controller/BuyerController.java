package com.socialcommerce.socialcommerce.controller;

import com.socialcommerce.socialcommerce.dto.BuyerProfileDto;
import com.socialcommerce.socialcommerce.dto.CreateBuyerDto;
import com.socialcommerce.socialcommerce.service.buyerService.BuyerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/buyer")
public class BuyerController {

    private BuyerService buyerService;

    public BuyerController(BuyerService buyerService) {
        this.buyerService = buyerService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createABuyer(@RequestBody CreateBuyerDto buyer) {
        buyerService.createBuyer(buyer);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<?> getAllBuyers() {
        return ResponseEntity.ok(buyerService.findAllBuyers());
    }

    @PostMapping("/follower/{buyerId}/followed/{sellerId}")
    public ResponseEntity<?> followASeller(@PathVariable UUID buyerId, @PathVariable UUID sellerId) {
        buyerService.followerASeller(sellerId, buyerId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/profile/{id}")
    public ResponseEntity<BuyerProfileDto> buyerProfile (@PathVariable UUID id){
        return ResponseEntity.ok(buyerService.buyerProfile(id));
    }

    @PostMapping("/publication/{sellerId}/like/{publicationId}")
    public ResponseEntity<?> likeAPublication(@PathVariable UUID sellerId, @PathVariable Long publicationId){
        buyerService.likeAPublication(sellerId, publicationId);
        return ResponseEntity.status(200).build();
    }
}
