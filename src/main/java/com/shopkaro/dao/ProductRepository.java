package com.shopkaro.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shopkaro.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
