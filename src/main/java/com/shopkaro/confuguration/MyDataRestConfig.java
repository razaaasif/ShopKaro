package com.shopkaro.confuguration;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.shopkaro.entity.Product;
import com.shopkaro.entity.ProductCatogory;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
		// TODO Auto-generated method stub
		HttpMethod[] toDisable = { HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE };
		MyDataRestConfig.disableMethods(config, toDisable, Product.class);
		MyDataRestConfig.disableMethods(config, toDisable, ProductCatogory.class);

	}

	private static <T> void disableMethods(RepositoryRestConfiguration config, HttpMethod[] toDisable,
			Class<T> class1) {
		config.getExposureConfiguration().forDomainType(class1)
				.withItemExposure((metadata, httpMethods) -> httpMethods.disable(toDisable))
				.withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(toDisable));

	}

}
