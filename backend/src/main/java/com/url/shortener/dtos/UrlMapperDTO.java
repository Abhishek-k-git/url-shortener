package com.url.shortener.dtos;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class UrlMapperDTO {
    private Long id;
    private String name;
    private String email;
    private String originalUrl;
    private String shortUrl;
    private int clickCount;
    private LocalDateTime createdAt;
}
