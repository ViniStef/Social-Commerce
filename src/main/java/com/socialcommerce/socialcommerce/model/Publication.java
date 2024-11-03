package com.socialcommerce.socialcommerce.model;

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

    @OneToOne
    @JoinColumn(name = "product")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private Seller seller;

    @Column(name = "discount")
    private Float discount_percentage;

    @Column(name = "promotion")
    private Boolean has_promotion;

    @Column(name = "price")
    private Double price;

    @Column(name = "likes")
    private Integer likes;


    public Publication(LocalDate publication_date, Product product, Float discount_percentage, Boolean has_promotion, Double price) {
        this.publication_date = publication_date;
        this.product = product;
        this.discount_percentage = discount_percentage;
        this.has_promotion = has_promotion;
        this.price = price;
    }
}
