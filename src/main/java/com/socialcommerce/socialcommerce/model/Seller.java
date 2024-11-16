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
    private Long sellerId;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

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

    public Seller( String firstName, String lastName, Long cnpj, String password, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.cnpj = cnpj;
        this.password = password;
        this.email = email;
    }
}
