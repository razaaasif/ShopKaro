package com.aasif.shopkaro.ShopKaroBackend.dao;

import com.aasif.shopkaro.ShopKaroBackend.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CustomerRepository extends JpaRepository<Customer,Long> {
    Customer findByEmail(String theEmail);
}
