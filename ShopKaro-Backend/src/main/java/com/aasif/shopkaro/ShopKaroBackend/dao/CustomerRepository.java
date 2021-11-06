package com.aasif.shopkaro.ShopKaroBackend.dao;

import com.aasif.shopkaro.ShopKaroBackend.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface CustomerRepository extends JpaRepository<Customer,Long> {
}
