package com.socialcommerce.socialcommerce.repository;

import com.socialcommerce.socialcommerce.model.Publication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPublicationRepo extends JpaRepository<Publication, Long> {
}
