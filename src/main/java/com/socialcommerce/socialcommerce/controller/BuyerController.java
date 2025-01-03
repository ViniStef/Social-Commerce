package com.socialcommerce.socialcommerce.controller;

import com.socialcommerce.socialcommerce.dto.BuyerProfileDto;
import com.socialcommerce.socialcommerce.dto.CreateBuyerDto;
import com.socialcommerce.socialcommerce.dto.ImagePathDto;
import com.socialcommerce.socialcommerce.service.buyerService.BuyerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.processing.Generated;


@RestController
@RequestMapping("/buyer")
public class BuyerController {

    private BuyerService buyerService;

    public BuyerController(BuyerService buyerService) {
        this.buyerService = buyerService;
    }

    @Generated("ExcludedFromCoverage")
    @PostMapping("/create")
    public ResponseEntity<?> createABuyer(@RequestBody CreateBuyerDto buyer) {
        buyerService.createBuyer(buyer);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @Generated("ExcludedFromCoverage")
    @PostMapping("/follower/{buyerId}/followed/{sellerId}")
    public ResponseEntity<?> followASeller(@PathVariable Long buyerId, @PathVariable Long sellerId) {
        buyerService.followerASeller(sellerId, buyerId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Generated("ExcludedFromCoverage")
    @GetMapping("/profile/{id}")
    public ResponseEntity<BuyerProfileDto> buyerProfile (@PathVariable Long id){
        return ResponseEntity.ok(buyerService.buyerProfile(id));
    }

    @Generated("ExcludedFromCoverage")
    @PostMapping("/publication/{sellerId}/like/{publicationId}")
    public ResponseEntity<?> likeAPublication(@PathVariable Long sellerId, @PathVariable Long publicationId){
        buyerService.likeAPublication(sellerId, publicationId);
        return ResponseEntity.status(200).build();
    }

    @Generated("ExcludedFromCoverage")
    @PutMapping("/unfollow/{sellerId}/by/{buyerId}")
    public ResponseEntity<?> unfollowASeller(@PathVariable Long sellerId, @PathVariable Long buyerId){
        buyerService.deleteFollower(sellerId, buyerId);
        return ResponseEntity.noContent().build();
    }

    @Generated("ExcludedFromCoverage")
    @PutMapping("{buyerId}/image")
    public ResponseEntity<?> uploadImage(@PathVariable Long buyerId,@RequestBody ImagePathDto imagePath){
        buyerService.uploadImage(buyerId, imagePath);
        return ResponseEntity.status(200).build();
    }
}
