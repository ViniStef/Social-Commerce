package com.socialcommerce.socialcommerce.utils;

import com.socialcommerce.socialcommerce.dto.CreateBuyerDto;
import com.socialcommerce.socialcommerce.model.Buyer;

public class BuyerUtils {

    public static Buyer createAValidBuyer(){
        return new Buyer(
                "Marcos",
                "Goulart",
                "123456",
                12312312323L,
                "buyer@mail.com"
        );
    }

    public static CreateBuyerDto createBuyerDto(){
        return new CreateBuyerDto(
                "Marcos",
                "Goulart",
                12312312323L,
                "123456",
                "123456",
                "mail@mail.com"
        );
    }

    public static CreateBuyerDto createInvalidBuyerDto() {
        return new CreateBuyerDto(
                "Path",
                "Goulart",
                12312312323L,
                "123456",
                "456789",
                "mail@mail.com"
        );


    }
}
