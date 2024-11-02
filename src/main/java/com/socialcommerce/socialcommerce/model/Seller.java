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
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_seller")
public class Seller{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID seller_id;

    @Column(name = "first_name")
    private String first_name;

    @Column(name = "last_name")
    private String last_name;

    @OneToMany(mappedBy = "seller")
    @Column(name = "publications")
    private List<Publication> publications;

   @ManyToMany(mappedBy = "sellers")
   @Column(name = "buyers_followed")
    private List<Buyer> buyers;

}
