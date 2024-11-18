package com.socialcommerce.socialcommerce.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "buyer_id")
    private Long buyerId;

    @Column(name = "image_path")
    private String imagePath;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "password")
    private String password;

    @Column(name = "cpf")
    private Long cpf;

    @Email
    @Column(name = "email")
    private String email;

    @ManyToMany
    @JoinTable (
            name = "buyer_seller_relation",
            joinColumns = @JoinColumn(name = "buyer_id"),
            inverseJoinColumns = @JoinColumn(name = "seller_id")
    )
    @Column(name = "sellers_followers")
    @JsonIgnoreProperties("buyers")
    private List<Seller> sellers;

    public Buyer(String firstName, String lastName, String password, Long cpf, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.cpf = cpf;
        this.email = email;
    }
}
