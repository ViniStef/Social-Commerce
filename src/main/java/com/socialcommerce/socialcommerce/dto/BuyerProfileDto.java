package com.socialcommerce.socialcommerce.dto;

import java.util.List;

public record BuyerProfileDto(String imagePath, String firstName, String lastName, List<SellerForBuyerProfileDto> sellers) {
}
