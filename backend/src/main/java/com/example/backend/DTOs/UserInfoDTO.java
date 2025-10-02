package com.example.backend.DTOs;

public class UserInfoDTO {
    private Boolean isAuthenticated;
    private String email;
    private String name;
    private Boolean isAdmin;


    public UserInfoDTO(Boolean isAuthenticated, String email, String name, Boolean isAdmin) {
        this.isAuthenticated = isAuthenticated;
        this.email = email;
        this.name = name;
        this.isAdmin = isAdmin;
    }

    public void setIsAdmin(Boolean admin) {
        isAdmin = admin;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAuthenticated(Boolean authenticated) {
        isAuthenticated = authenticated;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public Boolean getAuthenticated() {
        return isAuthenticated;
    }
    public Boolean getIsAdmin() {
        return isAdmin;
    }
}
