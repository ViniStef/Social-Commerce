package com.socialcommerce.socialcommerce.dto;

import java.time.LocalDate;

public record ShowPublicationDto(LocalDate publicationDate, ShowProductDto productDto,String imagemPath, Float discount, Double price, Integer likes) {
}
