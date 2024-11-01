package com.socialcommerce.socialcommerce.controller;

import com.socialcommerce.socialcommerce.model.Seller;
import com.socialcommerce.socialcommerce.service.SellerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SellerController {

    private SellerService sellerService;

    @PostMapping("/create")
    public ResponseEntity<?> createSeller(@RequestBody Seller seller) {
        return ResponseEntity.ok(sellerService.createSeller(seller));
    }

    @GetMapping("/findall")
    public ResponseEntity<?> findAllSellers() {
        return ResponseEntity.ok(sellerService.getAllSellers());
    }
}
