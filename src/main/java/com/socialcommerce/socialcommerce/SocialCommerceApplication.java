package com.socialcommerce.socialcommerce;

import com.socialcommerce.socialcommerce.model.Buyer;
import com.socialcommerce.socialcommerce.model.Publication;
import com.socialcommerce.socialcommerce.model.Seller;
import com.socialcommerce.socialcommerce.repository.ISellerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.UUID;

@SpringBootApplication
public class SocialCommerceApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(SocialCommerceApplication.class, args);
    }


    @Autowired
    ISellerRepo sellerRepo;

    @Override
    public void run(String... args) throws Exception {
        sellerRepo.save(new Seller(UUID.randomUUID(), "Marcos", new ArrayList<>(){{
            add(new Publication());
        }}, new ArrayList<>(){{
            add(new Buyer());
        }} ));
    }
}
