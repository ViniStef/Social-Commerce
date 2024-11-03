package com.socialcommerce.socialcommerce.dto;

import java.util.List;

public record CreateProductDto (String product_name, String product_description, String product_image, String product_brand, String product_color, List<CategoryDto> categories) {

}
