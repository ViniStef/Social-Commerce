package com.socialcommerce.socialcommerce.service.buyerService;


import com.socialcommerce.socialcommerce.dto.CreateBuyerDto;
import com.socialcommerce.socialcommerce.exception.NotFoundException;
import com.socialcommerce.socialcommerce.exception.PasswordNotMatchException;
import com.socialcommerce.socialcommerce.model.Buyer;
import com.socialcommerce.socialcommerce.model.Seller;
import com.socialcommerce.socialcommerce.repository.IBuyerRepo;
import com.socialcommerce.socialcommerce.repository.ISellerRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class BuyerService implements IBuyerService {

    private IBuyerRepo buyerRepo;
    private ISellerRepo sellerRepo;

    public BuyerService(IBuyerRepo buyerRepo, ISellerRepo sellerRepo) {
        this.buyerRepo = buyerRepo;
        this.sellerRepo = sellerRepo;
    }

    @Override
    public void createBuyer(CreateBuyerDto buyerDto) {
        if (buyerDto.password().equals(buyerDto.confirmPassword())) {
            Buyer buyer = new Buyer(
                    UUID.randomUUID(),
                    buyerDto.first_name(),
                    buyerDto.last_name(),
                    buyerDto.password(),
                    buyerDto.cpf(),
                    buyerDto.email()
            );
            buyerRepo.save(buyer);
        } else {
            throw new PasswordNotMatchException("Password not match");
        }
    }

    @Override
    public void followerASeller(UUID sellerId, UUID buyerId) {
        Seller seller = sellerRepo.findById(sellerId).orElseThrow(() -> new NotFoundException("Seller not found"));
        Buyer buyer = buyerRepo.findById(buyerId).orElseThrow(() -> new NotFoundException("Buyer not found"));
        buyer.getSellers().add(seller);
        seller.getBuyers().add(buyer);
        buyerRepo.save(buyer);
        sellerRepo.save(seller);
    }

    @Override
    public List<Buyer> findAllBuyers() {
        return buyerRepo.findAll();
    }
}
