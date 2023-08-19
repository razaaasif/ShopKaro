package com.shopkaro.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Country {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@NotBlank(message = "Name is required")
	@Pattern(regexp = "^[A-Za-z0-9 ]+$", message = "Name can only contain letters, numbers, and spaces")
	private String name;

	@NotBlank(message = "Code is required")
	@Pattern(regexp = "^[A-Za-z0-9 ]+$", message = "Name can only contain letters, numbers, and spaces")
	private String code;

	@OneToMany(mappedBy = "country")
	@JsonIgnore
	private List<State> states;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

}
