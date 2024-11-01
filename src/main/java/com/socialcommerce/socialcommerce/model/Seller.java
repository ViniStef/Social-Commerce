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
@Entity
@Table(name = "tb_seller")
public class Seller extends User{

    @OneToMany(mappedBy = "seller")
    @Column(name = "publications")
    private List<Publication> publications;

   @ManyToMany(mappedBy = "sellers")
   @Column(name = "buyers_followed")
    private List<Buyer> buyers;


    public Seller(UUID user_id, String user_name, List<Publication> publications, List<Buyer> buyers) {
        super(user_id, user_name);
        this.publications = publications;
        this.buyers = buyers;
    }
}
