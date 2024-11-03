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

    @ManyToMany(mappedBy = "products",
            cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    private List<Category> category;


    public Product(String product_name, String product_description, String product_image, String product_brand, String product_color, List<Category> category) {
        this.product_name = product_name;
        this.product_description = product_description;
        this.product_image = product_image;
        this.product_brand = product_brand;
        this.product_color = product_color;
        this.category = category;
    }
}
