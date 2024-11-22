package com.socialcommerce.socialcommerce.utils;

import com.socialcommerce.socialcommerce.model.Seller;

public class SellerUtils {

    public static Seller createAValidSeller(){
        return new Seller(
                "Marcos",
                "Vinicius",
                12312312323L,
                "123456",
                "mail@mail.com"
        );
    }
}
