package com.socialcommerce.socialcommerce.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer category_id;

    @Column(name = "category_name")
    private String categoryName;

    @OneToOne(mappedBy = "category")
    private Publication publication;

   public Category(String categoryName) {
        this.categoryName = categoryName;
    }
}
