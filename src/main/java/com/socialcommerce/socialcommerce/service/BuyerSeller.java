package com.socialcommerce.socialcommerce.service;


import com.socialcommerce.socialcommerce.repository.IBuyerRepo;
import org.springframework.stereotype.Service;

@Service
public class BuyerSeller {

    private IBuyerRepo buyerRepo;

    public BuyerSeller(IBuyerRepo buyerRepo) {
        this.buyerRepo = buyerRepo;
    }



}
