package com.aasif.shopkaro.ShopKaroBackend.controller;

import com.aasif.shopkaro.ShopKaroBackend.dto.Purchase;
import com.aasif.shopkaro.ShopKaroBackend.dto.PurchaseResponse;
import com.aasif.shopkaro.ShopKaroBackend.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("api/checkout")
public class CheckoutController {
    private CheckoutService  checkoutService;

    @Autowired
    public CheckoutController(CheckoutService checkoutService){
        this.checkoutService = checkoutService;
    }
    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){
        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);
        return purchaseResponse;
    }

}
