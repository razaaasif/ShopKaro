package com.shopkaro.dto;

import java.util.Set;

import com.shopkaro.entity.customer.Address;
import com.shopkaro.entity.customer.Customer;
import com.shopkaro.entity.order.Order;
import com.shopkaro.entity.order.OrderItem;

public class Purchase {
	private Customer customer;
	private Address shippingAddress;
	private Address billingAddres;
	private Order order;
	private Set<OrderItem> orderItem;

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public Address getShippingAddress() {
		return shippingAddress;
	}

	public void setShippingAddress(Address shippingAddress) {
		this.shippingAddress = shippingAddress;
	}

	public Address getBillingAddres() {
		return billingAddres;
	}

	public void setBillingAddres(Address billingAddres) {
		this.billingAddres = billingAddres;
	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public Set<OrderItem> getOrderItem() {
		return orderItem;
	}

	public void setOrderItem(Set<OrderItem> orderItem) {
		this.orderItem = orderItem;
	}

}
