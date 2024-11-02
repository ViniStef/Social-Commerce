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
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long product_id;

    @Column(name = "product_name")
    private String product_name;

    @Column(name = "description")
    private String product_description;

    @Column(name = "image")
    private String product_image;

    @Column(name = "brand")
    private String product_brand;

    @Column(name = "color")
    private String product_color;

    @OneToOne
    private Publication publication;

    @ManyToMany(mappedBy = "products")
    @Column(name = "category")
    private List<Category> category;

}
