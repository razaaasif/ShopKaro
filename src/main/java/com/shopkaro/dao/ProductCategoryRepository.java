package com.shopkaro.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.shopkaro.entity.ProductCatogory;

@RepositoryRestResource(collectionResourceRel = "productCategory" , path="product-category")
public interface ProductCategoryRepository extends JpaRepository<ProductCatogory, Long> {

}
