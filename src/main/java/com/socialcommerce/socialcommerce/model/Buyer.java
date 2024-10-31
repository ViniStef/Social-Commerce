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
@Table(name = "tb_buyer")
public class Buyer extends User {

    @ManyToMany
    @JoinTable (
            name = "buyer_seller_relation",
            joinColumns = @JoinColumn(name = "buyer_id"),
            inverseJoinColumns = @JoinColumn(name = "seller_id")
    )
    @Column(name = "sellers_followers")
    private List<Seller> sellers;
}
