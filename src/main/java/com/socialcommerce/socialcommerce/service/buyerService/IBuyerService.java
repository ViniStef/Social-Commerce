package com.socialcommerce.socialcommerce.service.buyerService;

import com.socialcommerce.socialcommerce.dto.BuyerProfileDto;
import com.socialcommerce.socialcommerce.dto.CreateBuyerDto;
import com.socialcommerce.socialcommerce.model.Buyer;

import java.util.List;

public interface IBuyerService {
    void createBuyer(CreateBuyerDto buyer);
    void followerASeller(Long sellerId, Long buyerId);
    List<Buyer> findAllBuyers();
    BuyerProfileDto buyerProfile (Long buyerId);
    void likeAPublication(Long sellerId, Long publicationId);
    void deleteFollower(Long sellerId, Long buyerId);
    void uploadImage(Long buyerId, String image);

}
