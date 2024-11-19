package com.socialcommerce.socialcommerce.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.socialcommerce.socialcommerce.dto.CategoryDto;
import jakarta.persistence.*;
import jdk.jfr.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Publication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long publication_id;

    @Timestamp
    @Column(name = "date")
    private LocalDate publication_date;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id")
    @JsonIgnoreProperties("publication")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    @JsonIgnoreProperties("publications")
    private Seller seller;

    @Column(name = "description")
    private String description;

    @Column(name = "discount")
    private Float discount_percentage;

    @Column(name = "image_path")
    private String imagePath;

    @Column(name = "promotion")
    private Boolean has_promotion;

    @Column(name = "price")
    private Double price;

    @Column(name = "likes")
    private Integer likes;

    @ManyToOne
    @JoinColumn(name = "categoryId")
    @JsonIgnoreProperties("publications")
    private Category category;


    public Publication(LocalDate publication_date, Product product, String imagePath, String description, Category category, Float discount_percentage, Boolean has_promotion, Double price) {
        this.publication_date = publication_date;
        this.product = product;
        this.category = category;
        this.discount_percentage = discount_percentage;
        this.has_promotion = has_promotion;
        this.price = price;
        this.imagePath = imagePath;
        this.description = description;
    }


}
