package com.url.shortener.controllers;

import com.url.shortener.dtos.ClickEventsDTO;
import com.url.shortener.dtos.UrlMapperDTO;
import com.url.shortener.models.Users;
import com.url.shortener.services.UrlMapperService;
import com.url.shortener.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/urls")
@AllArgsConstructor
public class UrlMapperController {
    private UrlMapperService urlMapperService;
    private UserService userService;

    @PostMapping("/short")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<UrlMapperDTO> doShortenUrl(@RequestBody Map<String, String> request, Principal principal) {
        String originalUrl = request.get("originalUrl");
        Users user = userService.findUserByUsername(principal.getName()); // email
        UrlMapperDTO urlMapperDTO = urlMapperService.createShortUrl(originalUrl, user);
        return ResponseEntity.status(201).body(urlMapperDTO);
    }

    @GetMapping("/getall")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<UrlMapperDTO>> getAllUrls(Principal principal) {
        Users user = userService.findUserByUsername(principal.getName());
        List<UrlMapperDTO> urls = urlMapperService.findUrlsByUser(user);
        return ResponseEntity.status(200).body(urls);
    }

    @GetMapping("/clicks")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Map<LocalDate, Long>> getAllClicks(Principal principal,
                                                             @RequestParam("startDate") String startDate,
                                                             @RequestParam("endDate") String endDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE;
        Users user = userService.findUserByUsername(principal.getName());
        LocalDate formatedStartDate = LocalDate.parse(startDate, formatter);
        LocalDate formatedEndDate = LocalDate.parse(endDate, formatter);
        Map<LocalDate, Long> clicks = urlMapperService.findTotalClicksByUserAndDate(user, formatedStartDate, formatedEndDate);
        return ResponseEntity.status(200).body(clicks);
    }

    @GetMapping("/analytics/{shortUrl}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<ClickEventsDTO>> getUrlAnalytics(@PathVariable String shortUrl,
                                                                @RequestParam("startDate") String startDate,
                                                                @RequestParam("endDate") String endDate){
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        LocalDateTime formatedStartDate = LocalDateTime.parse(startDate, formatter);
        LocalDateTime formatedEndDate = LocalDateTime.parse(endDate, formatter);
        List<ClickEventsDTO> clickEventDTOS = urlMapperService.findClickEventsByDate(shortUrl, formatedStartDate, formatedEndDate);
        return ResponseEntity.status(200).body(clickEventDTOS);
    }
}
