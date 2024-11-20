package com.socialcommerce.socialcommerce.service.sellerService;

import com.socialcommerce.socialcommerce.dto.*;
import com.socialcommerce.socialcommerce.exception.NotFoundException;
import com.socialcommerce.socialcommerce.exception.PasswordNotMatchException;
import com.socialcommerce.socialcommerce.model.Buyer;
import com.socialcommerce.socialcommerce.model.Publication;
import com.socialcommerce.socialcommerce.model.Seller;
import com.socialcommerce.socialcommerce.repository.ISellerRepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
public class SellerService implements ISellerService {

    private ISellerRepo sellerRepo;

    public SellerService(ISellerRepo sellerRepo) {
        this.sellerRepo = sellerRepo;
    }

    @Override
    public void createSeller(CreateSellerDto sellerDto) {
        if(sellerDto.password().equals(sellerDto.confirm_password())){
           Seller seller = new Seller(
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
    public SellerProfileDto sellerProfile(Long sellerId) {
        Seller seller = sellerRepo.findById(sellerId).orElseThrow(() -> new NotFoundException("Seller not found"));

        return new SellerProfileDto(
                seller.getImagePath(),
                seller.getFirstName(),
                seller.getLastName(),
                fromBuyerToBuyerForSeller(seller.getBuyers()));

    }

    @Override
    public List<SellerForBuyerProfileDto> getAllByName(String sellerName) {
        List<Seller> sellersFounded = sellerRepo.findAllByFirstNameContainingIgnoreCase(sellerName);

        if (sellersFounded != null) {
            return sellersFounded.stream()
                    .map(seller -> new SellerForBuyerProfileDto(seller.getSellerId(), seller.getImagePath(), seller.getFirstName(), seller.getLastName()))
                    .collect(Collectors.toList());
        } else {
            throw new NotFoundException("Seller not found");
        }
    }

    private List<BuyerForSellerProfileDto> fromBuyerToBuyerForSeller(List<Buyer> sellerList) {
        List<BuyerForSellerProfileDto> buyerList = new ArrayList<>();

        for (Buyer buyer : sellerList) {
            BuyerForSellerProfileDto dto = new BuyerForSellerProfileDto(buyer.getImagePath(),buyer.getFirstName(), buyer.getLastName());
            buyerList.add(dto);
        }

        return buyerList;
    }

    @Override
    public void uploadImage(Long sellerId, ImagePathDto image) {
        Seller seller = sellerRepo.findById(sellerId).orElseThrow(() -> new NotFoundException("Seller not found"));
        seller.setImagePath(image.imagePath());
        sellerRepo.save(seller);
    }

    @Override
    public SellerMetrics getSellerMetrics(Long sellerId) {
        Seller seller = sellerRepo.findById(sellerId).orElseThrow(() -> new NotFoundException("Seller not found"));
        long publications = seller.getPublications().stream().count();
        int totalLikes = seller.getPublications()
                .stream()
                .mapToInt(Publication::getLikes)
                .sum();
        long followes = seller.getPublications().stream().count();

        return new SellerMetrics(
                Integer.parseInt(String.valueOf(publications)),
                Integer.parseInt(String.valueOf(followes)),
                Integer.parseInt(String.valueOf(totalLikes))
        );

    }
}
