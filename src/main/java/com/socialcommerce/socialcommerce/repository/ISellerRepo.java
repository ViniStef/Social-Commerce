package com.socialcommerce.socialcommerce.repository;

import com.socialcommerce.socialcommerce.model.Seller;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.stereotype.Repository;

import java.util.UUID;
import java.util.function.Function;

@Repository
public interface ISellerRepo extends JpaRepository<Seller, UUID> {

    Seller findByEmail(String email);
}
