package com.socialcommerce.socialcommerce.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
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

    @Column(unique = true, name = "publications")
    private List<Publication> publications;

    @Column(unique = true, name = "buyers-followers")
    private List<Buyer> buyers;

}
