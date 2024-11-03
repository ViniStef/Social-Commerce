package com.socialcommerce.socialcommerce.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
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

    @Column(name = "cnpj")
    private Long cnpj;
    
    @Column(name = "password")
    private String password;  
    
    @Email
    @Column(name = "email")
    private String email;

    @OneToMany(mappedBy = "seller", cascade=CascadeType.ALL)
    @Column(name = "publications")
    private List<Publication> publications = new ArrayList<Publication>();

   @ManyToMany(mappedBy = "sellers")
   @Column(name = "buyers_followed")
    private List<Buyer> buyers;

    public Seller(UUID seller_id, String first_name, String last_name, Long cnpj, String password, String email) {
        this.seller_id = seller_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.cnpj = cnpj;
        this.password = password;
        this.email = email;
    }
}
