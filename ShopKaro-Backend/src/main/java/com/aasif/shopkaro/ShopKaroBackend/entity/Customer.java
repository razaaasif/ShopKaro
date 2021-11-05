package com.aasif.shopkaro.ShopKaroBackend.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table
@Getter
@Setter
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private String firstName;
    @Column
    private String lastName;
    @Column
    private String email;

    @OneToMany(mappedBy = "customer" , cascade = CascadeType.ALL)
    private Set<Order> orders;

    public void add(Order order){
        if(order != null ){
            if(orders == null ){
                orders = new HashSet<>();
            }
            orders.add(order);
            order.setCustomer(this);
        }
    }
}
