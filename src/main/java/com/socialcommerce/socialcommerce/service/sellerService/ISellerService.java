package com.socialcommerce.socialcommerce.service.sellerService;

import com.socialcommerce.socialcommerce.dto.CreateSellerDto;
import com.socialcommerce.socialcommerce.dto.SellerForBuyerProfileDto;
import com.socialcommerce.socialcommerce.dto.SellerProfileDto;
import com.socialcommerce.socialcommerce.dto.ShowPublicationDto;
import com.socialcommerce.socialcommerce.model.Seller;

import java.util.List;


public interface ISellerService {

    void createSeller(CreateSellerDto seller);
    void deleteAll();
    List<Seller> getAllSellers();
    SellerProfileDto sellerProfile(Long sellerId);
    List<SellerForBuyerProfileDto> getAllByName(String sellerName);
    void uploadImage(Long sellerId, String image);
}
