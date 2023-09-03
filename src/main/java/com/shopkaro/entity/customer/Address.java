package com.shopkaro.entity.customer;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Pattern;

@Entity
public class Address {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Pattern(regexp = "^[A-Za-z0-9]*$", message = "Invalid charcters are allowed")
	private String street;

	@Pattern(regexp = "^[A-Za-z]*$", message = "Only alphabate charcters are allowed")
	private String city;

	@Pattern(regexp = "^[A-Za-z]*$", message = "Only alphabate charcters are allowed")
	private String state;
	@Pattern(regexp = "^[A-Za-z]*$", message = "Only alphabate charcters are allowed")
	private String country;
	@Pattern(regexp = "^[0-9]{5}$", message = "Only 5 numeric digits are allowed")
	private Integer zipCode;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public Integer getZipCode() {
		return zipCode;
	}

	public void setZipCode(Integer zipCode) {
		this.zipCode = zipCode;
	}

}
