package com.socialcommerce.socialcommerce.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Seller extends User{

    private List<Publication> publications;
    private List<Buyer> buyers;

    public Seller(int user_id, String user_name) {
        super(user_id, user_name);
    }
}
