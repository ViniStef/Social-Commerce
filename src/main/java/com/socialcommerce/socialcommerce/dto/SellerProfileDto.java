package com.socialcommerce.socialcommerce.dto;

import java.util.List;

public record SellerProfileDto(String imagePath, String name, List<BuyerForSellerProfileDto> buyers) {
}
