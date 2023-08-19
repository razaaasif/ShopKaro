package com.shopkaro.configuration;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.shopkaro.entity.Country;
import com.shopkaro.entity.Product;
import com.shopkaro.entity.ProductCatogory;
import com.shopkaro.entity.State;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

	private final EntityManager entityManager;

	public MyDataRestConfig(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
		// TODO Auto-generated method stub
		HttpMethod[] toDisable = { HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE };
		List<Class<?>> s = Arrays.asList(Product.class, ProductCatogory.class, Country.class, State.class);
		for (Class<?> cls : s) {
			this.disableMethods(config, toDisable, cls);
		}

	}

	private <T> void disableMethods(RepositoryRestConfiguration config, HttpMethod[] toDisable, Class<T> class1) {
		config.getExposureConfiguration().forDomainType(class1)
				.withItemExposure((metadata, httpMethods) -> httpMethods.disable(toDisable))
				.withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(toDisable));

		if (class1.equals(ProductCatogory.class)) {
			System.out.println("Entity -> " + class1.getSimpleName());
			exposeId(config);
		}

	}

	@SuppressWarnings("rawtypes")
	private void exposeId(RepositoryRestConfiguration config) {

		Set<EntityType<?>> entities = this.entityManager.getMetamodel().getEntities();
		List<Class> entityClass = new ArrayList<>();

		entities.forEach(t -> entityClass.add(t.getJavaType()));

		Class[] domainTypes = entityClass.toArray(new Class[0]);
		config.exposeIdsFor(domainTypes);
	}

}
