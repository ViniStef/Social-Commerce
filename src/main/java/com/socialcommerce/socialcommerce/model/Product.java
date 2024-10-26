package com.socialcommerce.socialcommerce.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    private Long product_id;
    private String product_name;
    private String product_description;
    private String product_image;
    private String product_brand;
    private String product_color;

}
