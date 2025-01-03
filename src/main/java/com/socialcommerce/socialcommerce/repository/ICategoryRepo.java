package com.socialcommerce.socialcommerce.repository;

import com.socialcommerce.socialcommerce.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICategoryRepo extends JpaRepository<Category, Integer> {

    Category findByCategoryName(String name);
    Category findByCategoryId(Integer Id);
}
