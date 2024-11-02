package com.socialcommerce.socialcommerce.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tb_buyer")
public class Buyer {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID buyer_id;

    @Column(name = "first_name")
    private String first_name;

    @Column(name = "last_name")
    private String last_name;

    @Column(name = "cpf")
    private Long buyer_cpf;

    @ManyToMany
    @JoinTable (
            name = "buyer_seller_relation",
            joinColumns = @JoinColumn(name = "buyer_id"),
            inverseJoinColumns = @JoinColumn(name = "seller_id")
    )
    @Column(name = "sellers_followers")
    private List<Seller> sellers;
}
