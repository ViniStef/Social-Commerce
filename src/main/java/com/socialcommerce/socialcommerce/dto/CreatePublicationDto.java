package com.socialcommerce.socialcommerce.dto;

import com.socialcommerce.socialcommerce.model.Product;
import com.socialcommerce.socialcommerce.model.Seller;

import java.time.LocalDate;
import java.util.UUID;

public record CreatePublicationDto(CreateProductDto product, CategoryDto category, String imagePath, String description ,Float discount_percentage, Boolean has_promotion, Double price) {
}
