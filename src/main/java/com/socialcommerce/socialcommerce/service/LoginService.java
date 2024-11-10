package com.socialcommerce.socialcommerce.service;

import com.socialcommerce.socialcommerce.exception.AlreadyExistsException;
import com.socialcommerce.socialcommerce.model.Buyer;
import com.socialcommerce.socialcommerce.model.Seller;
import com.socialcommerce.socialcommerce.repository.IBuyerRepo;
import com.socialcommerce.socialcommerce.repository.ISellerRepo;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    private IBuyerRepo buyerRepo;

    private ISellerRepo sellerRepo;

    public LoginService(IBuyerRepo buyerRepo, ISellerRepo sellerRepo) {
        this.buyerRepo = buyerRepo;
        this.sellerRepo = sellerRepo;
    }

    public Object login(String email, String password) {
        Seller seller = sellerRepo.findByEmail(email);
        Buyer buyer = buyerRepo.findByEmail(email);
        if (seller != null) {
            if(seller.getPassword().equals(password)) {
                return seller;
            }
            return false;
        }
        else if (buyer != null){
            if( buyer.getPassword().equals(password)) {
                return buyer;
            }
            return false;
        }
        return false;
    }
}
