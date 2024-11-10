package com.socialcommerce.socialcommerce.controller;

import com.socialcommerce.socialcommerce.dto.CreateSellerDto;
import com.socialcommerce.socialcommerce.service.sellerService.SellerService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/findall")
    public ResponseEntity<?> findAllSellers() {
        return ResponseEntity.ok(sellerService.getAllSellers());
    }

    @DeleteMapping()
    public ResponseEntity<?> deleteAll() {
        sellerService.deleteAll();
        return ResponseEntity.noContent().build();
    }
}
