package com.url.shortener.dtos;

import lombok.Getter;

@Getter
public class LoginRequest {
    private String email;
    private String password;
}
