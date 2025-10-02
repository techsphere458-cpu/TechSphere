package com.example.backend.DTOs;

public class OrderDTO {
    private String type;
    private String model;
    private Double price;
    private Boolean isNew;
    private String phone;
    private String name;

    public void setModel(String model) {
        this.model = model;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setNew(Boolean aNew) {
        isNew = aNew;
    }

    public String getModel() {
        return model;
    }

    public Boolean getIsNew() {
        return isNew;
    }

    public String getType() {
        return type;
    }

    public String getName() {
        return name;
    }

    public String getPhone() {
        return phone;
    }

    public Double getPrice() {
        return price;
    }
}
