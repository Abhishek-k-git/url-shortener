package com.url.shortener.controllers;

import com.url.shortener.models.UrlMappers;
import com.url.shortener.services.UrlMapperService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class RedirectController {
    private UrlMapperService urlMapperService;

    @GetMapping("/api/{shortUrl}")
    public ResponseEntity<Void> redirect(@PathVariable String shortUrl) {
        UrlMappers urlMapper = urlMapperService.findUrlByShortUrl(shortUrl);
        if (urlMapper != null) {
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.LOCATION, urlMapper.getOriginalUrl());
            return ResponseEntity.noContent().headers(headers).build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
