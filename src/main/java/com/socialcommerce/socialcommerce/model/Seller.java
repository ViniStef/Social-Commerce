package com.socialcommerce.socialcommerce.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seller_id")
    private Long seller_id;

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

    @OneToMany(mappedBy = "seller", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("seller")
    private List<Publication> publications = new ArrayList<Publication>();

   @ManyToMany(mappedBy = "sellers")
   @Column(name = "buyers_followed")
   @JsonIgnoreProperties("sellers")
    private List<Buyer> buyers;

    public Seller( String first_name, String last_name, Long cnpj, String password, String email) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.cnpj = cnpj;
        this.password = password;
        this.email = email;
    }
}
