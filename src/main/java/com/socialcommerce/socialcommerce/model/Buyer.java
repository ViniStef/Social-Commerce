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
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID buyer_id;

    @Column(name = "first_name")
    private String first_name;

    @Column(name = "last_name")
    private String last_name;

    @Column(name = "password")
    private String password;

    @Column(name = "cpf")
    private Long buyer_cpf;

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

    public Buyer(UUID buyer_id, String first_name, String last_name, String password, Long buyer_cpf, String email) {
        this.buyer_id = buyer_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.password = password;
        this.buyer_cpf = buyer_cpf;
        this.email = email;
    }
}
