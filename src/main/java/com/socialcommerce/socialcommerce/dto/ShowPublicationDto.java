package com.socialcommerce.socialcommerce.dto;

import java.time.LocalDate;

public record ShowPublicationDto(Long publicationId, LocalDate publicationDate, String productName, String sellerImg, String sellerName, String imagePath,Long sellerId,String description, Float discount, Double price, Integer likes) {
}
