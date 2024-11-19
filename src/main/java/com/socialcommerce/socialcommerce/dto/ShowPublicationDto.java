package com.socialcommerce.socialcommerce.dto;

import java.time.LocalDate;

public record ShowPublicationDto(Long publicationId, LocalDate publicationDate, ShowProductDto productDto, String sellerImg, String sellerName, String imagemPath, String description, Float discount, Double price, Integer likes) {
}
