package com.socialcommerce.socialcommerce.dto;

import java.util.List;

public record BuyerProfileDto(String name, List<SellerForBuyerProfileDto> sellers) {
}
