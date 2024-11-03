package com.socialcommerce.socialcommerce.service;


import com.socialcommerce.socialcommerce.dto.CreateBuyerDto;
import com.socialcommerce.socialcommerce.exception.PasswordNotMatchException;
import com.socialcommerce.socialcommerce.model.Buyer;
import com.socialcommerce.socialcommerce.repository.IBuyerRepo;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class BuyerService {

    private IBuyerRepo buyerRepo;

    public BuyerService(IBuyerRepo buyerRepo) {
        this.buyerRepo = buyerRepo;
    }

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



}
