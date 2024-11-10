package com.socialcommerce.socialcommerce.repository;

import com.socialcommerce.socialcommerce.dto.ShowPublicationDto;
import com.socialcommerce.socialcommerce.model.Publication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IPublicationRepo extends JpaRepository<Publication, Long> {

    @Query("select p from Publication p order by p.publication_date asc")
    List<Publication> getAllByLocalDateOrderAsc();

    @Query("select p from Publication p order by p.publication_date desc")
    List<Publication> getAllByLocalDateOrderDesc();
}
