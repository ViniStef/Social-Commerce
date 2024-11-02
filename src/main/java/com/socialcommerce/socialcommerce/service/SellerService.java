package com.socialcommerce.socialcommerce.service;

import com.socialcommerce.socialcommerce.dto.CreateSellerDto;
import com.socialcommerce.socialcommerce.exception.PasswordNotMatchException;
import com.socialcommerce.socialcommerce.model.Seller;
import com.socialcommerce.socialcommerce.repository.ISellerRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;


@Service
public class SellerService {

    private ISellerRepo sellerRepo;

    public SellerService(ISellerRepo sellerRepo) {
        this.sellerRepo = sellerRepo;
    }

    public void createSeller(CreateSellerDto sellerDto) {
        if(sellerDto.password().equals(sellerDto.confirmPassword())){
           Seller seller = new Seller(
                    UUID.randomUUID(),
                    sellerDto.first_name(),
                    sellerDto.last_name(),
                    sellerDto.cnpj(),
                    sellerDto.password(),
                    sellerDto.email()
            );
           sellerRepo.save(seller);
        } else {
           throw new PasswordNotMatchException("Password not match");
        }
    }

    public void deleteAll(){
        sellerRepo.deleteAll();
    }


    public List<Seller> getAllSellers() {
        return sellerRepo.findAll();
    }

}
