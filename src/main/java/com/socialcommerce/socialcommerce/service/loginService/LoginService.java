package com.socialcommerce.socialcommerce.service.loginService;

import com.socialcommerce.socialcommerce.model.Buyer;
import com.socialcommerce.socialcommerce.model.Seller;
import com.socialcommerce.socialcommerce.repository.IBuyerRepo;
import com.socialcommerce.socialcommerce.repository.ISellerRepo;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class LoginService implements ILoginService {

    private IBuyerRepo buyerRepo;

    private ISellerRepo sellerRepo;

    public LoginService(IBuyerRepo buyerRepo, ISellerRepo sellerRepo) {
        this.buyerRepo = buyerRepo;
        this.sellerRepo = sellerRepo;
    }

    @Override
    public Object login(String email, String password) {
        Seller seller = sellerRepo.findByEmail(email);
        Buyer buyer = buyerRepo.findByEmail(email);
        Map<String, String> loginObject = new HashMap<>();
        if (seller != null) {
            if(seller.getPassword().equals(password)) {
                loginObject.put("accountType", "seller");
                loginObject.put("userId", seller.getSellerId().toString());
                return loginObject;
            }
            return false;
        }
        else if (buyer != null){
            if( buyer.getPassword().equals(password)) {
                loginObject.put("accountType", "buyer");
                loginObject.put("userId", buyer.getBuyerId().toString());
                return loginObject;
            }
            return false;
        }
        return false;
    }
}
