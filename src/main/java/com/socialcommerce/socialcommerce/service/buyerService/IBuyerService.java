package com.socialcommerce.socialcommerce.service.buyerService;

import com.socialcommerce.socialcommerce.dto.CreateBuyerDto;
import com.socialcommerce.socialcommerce.model.Buyer;

import java.util.List;
import java.util.UUID;

public interface IBuyerService {
    void createBuyer(CreateBuyerDto buyer);
    void followerASeller(UUID sellerId, UUID buyerId);
    List<Buyer> findAllBuyers();

}
