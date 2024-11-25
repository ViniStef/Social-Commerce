package com.socialcommerce.socialcommerce.utils;

import com.socialcommerce.socialcommerce.dto.CategoryDto;
import com.socialcommerce.socialcommerce.dto.CreateProductDto;
import com.socialcommerce.socialcommerce.dto.CreatePublicationDto;
import com.socialcommerce.socialcommerce.model.Category;
import com.socialcommerce.socialcommerce.model.Product;
import com.socialcommerce.socialcommerce.model.Publication;
import com.socialcommerce.socialcommerce.model.Seller;

import java.time.LocalDate;


public class PublicationUtils {

    public static Publication createPublication(){
        return new Publication(
                LocalDate.of(2024, 1, 1),
                new Product(),
                "path",
                "Description",
                new Category(),
                10F,
                true,
                100D
        );
    }

    public static CreatePublicationDto createCreatePublicationDto(){
        return new CreatePublicationDto(
                new CreateProductDto("ProductName"),
                new CategoryDto(1),
                "path",
                "Description",
                10F,
                true,
                100D
        );
    }


}
