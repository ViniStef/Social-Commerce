package com.socialcommerce.socialcommerce.dto;

import java.util.List;

public record SellerProfileDto(String name, List<BuyerForSellerProfileDto> sellers) {
}
