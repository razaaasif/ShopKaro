package com.aasif.shopkaro.ShopKaroBackend.dao;

import com.aasif.shopkaro.ShopKaroBackend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {
}
