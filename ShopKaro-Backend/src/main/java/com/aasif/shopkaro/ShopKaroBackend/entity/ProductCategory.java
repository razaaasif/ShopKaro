package com.aasif.shopkaro.ShopKaroBackend.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table
@Getter
@Setter
public class ProductCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    private String categoryName;
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "category")
    private Set<Product>products;

}
