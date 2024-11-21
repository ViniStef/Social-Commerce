package com.socialcommerce.socialcommerce.dto;

import java.util.List;

public record SellerProfileDto(String imagePath, String firstName, String lastName, List<BuyerForSellerProfileDto> buyers) {
}
