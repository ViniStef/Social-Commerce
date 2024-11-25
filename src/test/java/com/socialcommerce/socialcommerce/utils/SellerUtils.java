package com.socialcommerce.socialcommerce.utils;

import com.socialcommerce.socialcommerce.dto.CreateSellerDto;
import com.socialcommerce.socialcommerce.model.Seller;

public class SellerUtils {

    public static Seller createAValidSeller(){
        return new Seller(
                "Marcos",
                "Vinicius",
                12312312323L,
                "123456",
                "seller@mail.com"
        );
    }

    public static CreateSellerDto createSellerDto(){
        return new CreateSellerDto(
                "Marcos",
                "Vinicius",
                12312312323L,
                "123456",
                "123456",
                "mail@mail.com"
        );
    }

    public static CreateSellerDto createInvalidSellerDto(){
        return new CreateSellerDto(
                "Marcos",
                "Vinicius",
                12312312323L,
                "123456",
                "5678",
                "mail@mail.com"
        );
    }
}
