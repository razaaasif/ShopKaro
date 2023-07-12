package com.shopkaro.entity;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Data;

@Data
@Entity
@Table(name = "product")
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column
	private String sku;
	@Column
	private String name;
	@Column
	private String description;
	@Column
	private BigDecimal unitPrice;
	@Column
	private String imageUrl;
	@Column
	private boolean active;
	@Column
	private int unitInStock;
	@Column
	@CreationTimestamp
	private Date dateCreated;
	@Column
	@UpdateTimestamp
	private Date lastUpdated;
	@ManyToOne
	@JoinColumn(name = "category_id", nullable = false)
	private ProductCatogory category;

}
