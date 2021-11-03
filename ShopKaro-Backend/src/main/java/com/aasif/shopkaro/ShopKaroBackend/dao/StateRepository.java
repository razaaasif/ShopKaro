package com.aasif.shopkaro.ShopKaroBackend.dao;

import com.aasif.shopkaro.ShopKaroBackend.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface StateRepository extends JpaRepository<State,Integer> {
}
