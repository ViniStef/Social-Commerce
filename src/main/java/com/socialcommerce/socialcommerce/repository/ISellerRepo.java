package com.socialcommerce.socialcommerce.repository;

import com.socialcommerce.socialcommerce.model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ISellerRepo extends JpaRepository<Seller, UUID> {
}
