package com.aasif.shopkaro.ShopKaroBackend.config;

import com.aasif.shopkaro.ShopKaroBackend.entity.Country;
import com.aasif.shopkaro.ShopKaroBackend.entity.Product;
import com.aasif.shopkaro.ShopKaroBackend.entity.ProductCategory;
import com.aasif.shopkaro.ShopKaroBackend.entity.State;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {


    private EntityManager entityManager;
    @Autowired
    public MyDataRestConfig(EntityManager theEntityManager){
        this.entityManager=theEntityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] theUnsupportedActions = {HttpMethod.PUT,HttpMethod.POST,HttpMethod.DELETE};

        //disable HTTP methods for Products PUT,POST and DELETE
        disableHttpMethods(Product.class ,config, theUnsupportedActions);
        disableHttpMethods(ProductCategory.class ,config, theUnsupportedActions);
        disableHttpMethods(Country.class,config, theUnsupportedActions);
        disableHttpMethods(State.class,config, theUnsupportedActions);


        //call an internal method
        exposeIds(config);
    }

    private void disableHttpMethods(Class theClass ,RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)));
    }

    private void exposeIds(RepositoryRestConfiguration config ){
        //expose entity ids

        //get a list of all entity classses from entity manager
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        //create an array of entity types
        List<Class> entityClasses = new ArrayList<>();
        //get the entity types for the entitties
        for(EntityType tempEntityType:entities){
            entityClasses.add(tempEntityType.getJavaType());
        }

        //expose the entity id for the array of entity/domain types
        Class[] domainTypes  = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);

    }




}
