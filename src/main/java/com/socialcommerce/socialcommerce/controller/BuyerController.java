package com.socialcommerce.socialcommerce.controller;

import com.socialcommerce.socialcommerce.dto.CreateBuyerDto;
import com.socialcommerce.socialcommerce.model.Buyer;
import com.socialcommerce.socialcommerce.service.BuyerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
