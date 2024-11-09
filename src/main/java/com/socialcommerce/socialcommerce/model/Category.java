package com.socialcommerce.socialcommerce.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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


    @Column(name = "category_name", nullable = false)
    private String categoryName;

    @OneToOne(mappedBy = "category")
    @JsonIgnoreProperties("category")
    private Publication publication;

   public Category(String categoryName) {
        this.categoryName = categoryName;
    }
}
