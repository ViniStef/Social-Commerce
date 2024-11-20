package com.socialcommerce.socialcommerce.service.sellerService;

import com.socialcommerce.socialcommerce.dto.*;
import com.socialcommerce.socialcommerce.model.Seller;

import java.util.List;


public interface ISellerService {

    void createSeller(CreateSellerDto seller);
    void deleteAll();
    List<Seller> getAllSellers();
    SellerProfileDto sellerProfile(Long sellerId);
    List<SellerForBuyerProfileDto> getAllByName(String sellerName);
    void uploadImage(Long sellerId, ImagePathDto image);
    SellerMetrics getSellerMetrics(Long sellerId);

}
