package com.socialcommerce.socialcommerce.service;

import com.socialcommerce.socialcommerce.model.Seller;
import com.socialcommerce.socialcommerce.repository.ISellerRepo;
import org.springframework.stereotype.Service;


@Service
public class SellerService {

    private ISellerRepo sellerRepo;

    public SellerService(ISellerRepo sellerRepo) {
        this.sellerRepo = sellerRepo;
    }

    public Seller createSeller(Seller seller) {
        return sellerRepo.save(seller);
    }

}
