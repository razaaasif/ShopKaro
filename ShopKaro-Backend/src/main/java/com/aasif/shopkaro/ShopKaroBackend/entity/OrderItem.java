package com.aasif.shopkaro.ShopKaroBackend.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table
@Getter
@Setter
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private String imageUrl;
    @Column
    private BigDecimal unitPrice;
    @Column
    private int quantity;
    @Column
    private Long productId;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;
}
