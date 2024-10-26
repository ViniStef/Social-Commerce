package com.socialcommerce.socialcommerce.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Publication {

    private Long publication_id;
    private LocalDate publication_date;
    private Product product;
    private Integer category_id;
    private Float discount_percentage;
    private Boolean has_promotion;
    private Double price;

}
