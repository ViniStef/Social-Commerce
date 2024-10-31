package com.socialcommerce.socialcommerce.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_seller")
public class Seller extends User{

    @OneToMany(mappedBy = "sellers")
    @Column(name = "publications")
    private List<Publication> publications;

   @ManyToMany(mappedBy = "sellers")
   @Column(name = "buyers_followed")
    private List<Buyer> buyers;

}
