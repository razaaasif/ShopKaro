package com.aasif.shopkaro.ShopKaroBackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Table
@Entity
@Getter
@Setter
public class Country {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column
    private int id;
    @Column
    private String code;
    @Column
    private String name;
    @OneToMany(mappedBy = "country")
    @JsonIgnore
    private List<State> states;

}
