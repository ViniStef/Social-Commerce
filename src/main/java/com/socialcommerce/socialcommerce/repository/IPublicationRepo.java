package com.socialcommerce.socialcommerce.repository;

import com.socialcommerce.socialcommerce.model.Publication;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPublicationRepo extends JpaRepository<Publication, Long> {
}
