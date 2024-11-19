package com.socialcommerce.socialcommerce.dto;

import java.util.List;

public record BuyerProfileDto(String imagePath, String name, List<SellerForBuyerProfileDto> sellers) {
}
