package com.aasif.shopkaro.ShopKaroBackend.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Table
@Entity
@Data
public class Product {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private String sku;
    @Column
    private String name;
    @Column
    private String description;
    @Column
    private BigDecimal unitPrice;
    @Column
    private String imageUrl;
    @Column
    private boolean active;
    @Column
    @CreationTimestamp
    private Date dateCreated;
    @Column
    @UpdateTimestamp
    private Date lastUpdated;
    @ManyToOne
    @JoinColumn(name="category_id",nullable = false)
    private ProductCategory category;



}
