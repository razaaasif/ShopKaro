package com.aasif.shopkaro.ShopKaroBackend.service;

import com.aasif.shopkaro.ShopKaroBackend.dao.CustomerRepository;
import com.aasif.shopkaro.ShopKaroBackend.dto.Purchase;
import com.aasif.shopkaro.ShopKaroBackend.dto.PurchaseResponse;
import com.aasif.shopkaro.ShopKaroBackend.entity.Customer;
import com.aasif.shopkaro.ShopKaroBackend.entity.Order;
import com.aasif.shopkaro.ShopKaroBackend.entity.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;
import java.util.UUID;
@Service
public class CheckoutServiceImpl implements  CheckoutService{
    private CustomerRepository customerRepository;
    @Autowired
    public CheckoutServiceImpl(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        //retrieve order info from dto
        Order order = purchase.getOrder();
        //generateTracking number
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);
        //populate order  with order item
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));

        //populate order with billing and shipping address
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        //populate customer with order
        Customer customer = purchase.getCustomer();
        customer.add(order);
        //save to database
        customerRepository.save(customer);
        //return a response
        return new PurchaseResponse(orderTrackingNumber);

    }

    private String generateOrderTrackingNumber() {
        //generate random (UUID-version-4) Universally Unique identifier
        return UUID.randomUUID().toString();

    }
}
