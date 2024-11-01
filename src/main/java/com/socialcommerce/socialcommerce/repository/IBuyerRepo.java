package com.socialcommerce.socialcommerce.repository;

import com.socialcommerce.socialcommerce.model.Buyer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface IBuyerRepo extends JpaRepository<Buyer, UUID> {
}
