package com.url.shortener.dtos;

import java.util.Set;

import lombok.Getter;

@Getter
public class RegisterRequest {
    private String name;
    private String email;
    private Set<String> role;
    private String password;
}
