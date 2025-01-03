package com.socialcommerce.socialcommerce.service.registerService;

import com.socialcommerce.socialcommerce.exception.AlreadyExistsException;
import com.socialcommerce.socialcommerce.model.Buyer;
import com.socialcommerce.socialcommerce.model.Seller;
import com.socialcommerce.socialcommerce.repository.IBuyerRepo;
import com.socialcommerce.socialcommerce.repository.ISellerRepo;
import org.springframework.stereotype.Service;

@Service
public class RegisterService implements IRegisterService {
    private IBuyerRepo buyerRepo;
    private ISellerRepo sellerRepo;

    public RegisterService(IBuyerRepo buyerRepo, ISellerRepo sellerRepo) {
        this.buyerRepo = buyerRepo;
        this.sellerRepo = sellerRepo;
    }
    @Override
    public Boolean isEmailUsed(String type, String email) {
        Seller sellerEmail = sellerRepo.findByEmail(email);
        Buyer buyerEmail = buyerRepo.findByEmail(email);
        if (sellerEmail != null || buyerEmail != null) {
            throw new AlreadyExistsException("This email already exists");
        }
        return false;
    }
}
