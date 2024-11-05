package com.socialcommerce.socialcommerce.service.sellerService;

import com.socialcommerce.socialcommerce.dto.CreateSellerDto;
import com.socialcommerce.socialcommerce.model.Seller;

import java.util.List;

public interface ISellerService {

    void createSeller(CreateSellerDto seller);
    void deleteAll();
    List<Seller> getAllSellers();
}
