package com.aasif.shopkaro.ShopKaroBackend.service;

import com.aasif.shopkaro.ShopKaroBackend.dto.Purchase;
import com.aasif.shopkaro.ShopKaroBackend.dto.PurchaseResponse;
import org.springframework.stereotype.Service;


public interface CheckoutService {
    PurchaseResponse placeOrder (Purchase purchase);
}
