package com.socialcommerce.socialcommerce.service.sellerService;

import com.socialcommerce.socialcommerce.dto.BuyerForSellerProfileDto;
import com.socialcommerce.socialcommerce.dto.CreateSellerDto;
import com.socialcommerce.socialcommerce.dto.SellerForBuyerProfileDto;
import com.socialcommerce.socialcommerce.dto.SellerProfileDto;
import com.socialcommerce.socialcommerce.exception.NotFoundException;
import com.socialcommerce.socialcommerce.exception.PasswordNotMatchException;
import com.socialcommerce.socialcommerce.model.Buyer;
import com.socialcommerce.socialcommerce.model.Seller;
import com.socialcommerce.socialcommerce.repository.ISellerRepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Service
public class SellerService implements ISellerService {

    private ISellerRepo sellerRepo;

    public SellerService(ISellerRepo sellerRepo) {
        this.sellerRepo = sellerRepo;
    }

    @Override
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

    @Override
    public void deleteAll(){
        sellerRepo.deleteAll();
    }


    @Override
    public List<Seller> getAllSellers() {
        return sellerRepo.findAll();
    }

    @Override
    public SellerProfileDto sellerProfile(UUID sellerId) {
        Seller seller = sellerRepo.findById(sellerId).orElseThrow(() -> new NotFoundException("Seller not found"));

        return new SellerProfileDto(
                seller.getFirst_name(),
                fromBuyerToBuyerForSeller(seller.getBuyers()));

    }

    private List<BuyerForSellerProfileDto> fromBuyerToBuyerForSeller(List<Buyer> sellerList) {
        List<BuyerForSellerProfileDto> buyerList = new ArrayList<>();

        for (Buyer buyer : sellerList) {
            BuyerForSellerProfileDto dto = new BuyerForSellerProfileDto(buyer.getFirst_name());
            buyerList.add(dto);
        }

        return buyerList;
    }
}
