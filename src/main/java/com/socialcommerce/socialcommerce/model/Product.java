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
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long product_id;

    @Column(name = "product_name")
    private String product_name;


    @Column(name = "description")
    private String product_description;


    @Column(name = "brand")
    private String product_brand;

    @Column(name = "color")
    private String product_color;

    @OneToOne(mappedBy = "product")
    @JsonIgnoreProperties("product")
    private Publication publication;

    public Product(String product_name) {
        this.product_name = product_name;
    }
}
