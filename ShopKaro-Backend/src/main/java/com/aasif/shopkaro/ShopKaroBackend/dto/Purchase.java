package com.aasif.shopkaro.ShopKaroBackend.dto;

import com.aasif.shopkaro.ShopKaroBackend.entity.Address;
import com.aasif.shopkaro.ShopKaroBackend.entity.Customer;
import com.aasif.shopkaro.ShopKaroBackend.entity.Order;
import com.aasif.shopkaro.ShopKaroBackend.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
