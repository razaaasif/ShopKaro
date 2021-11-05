package com.aasif.shopkaro.ShopKaroBackend.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table
@Getter
@Setter
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private String street;
    @Column
    private String city;
    @Column
    private String state;

    @Column
    private String country;
    @Column
    private String zipCode;

    @OneToOne
    @PrimaryKeyJoinColumn
    private Order order;
}
