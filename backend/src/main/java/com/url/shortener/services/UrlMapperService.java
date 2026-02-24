package com.url.shortener.services;

import com.url.shortener.dtos.ClickEventsDTO;
import com.url.shortener.dtos.UrlMapperDTO;
import com.url.shortener.models.ClickEvents;
import com.url.shortener.models.UrlMappers;
import com.url.shortener.models.Users;
import com.url.shortener.repositories.ClickEventRepository;
import com.url.shortener.repositories.UrlMapperRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UrlMapperService {
    private UrlMapperRepository urlMapperRepository;
    private ClickEventRepository clickEventRepository;

    public UrlMapperDTO createShortUrl(String originalUrl, Users user) {
        String shortUrl = generateShortUrl();
        UrlMappers urlMapper = UrlMappers.builder()
                .originalUrl(originalUrl)
                .shortUrl(shortUrl)
                .user(user)
                .build();

        UrlMappers savedUrlMapper = urlMapperRepository.save(urlMapper);
        return toUrlMapperDto(savedUrlMapper);
    }

    private String generateShortUrl() {
        String charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        StringBuilder stringBuilder = new StringBuilder(8);
        for (int i = 0; i < 8; i++) {
            stringBuilder.append(charset.charAt(random.nextInt(charset.length())));
        }
        return stringBuilder.toString();
    }

    private UrlMapperDTO toUrlMapperDto(UrlMappers urlMapper) {
        return UrlMapperDTO.builder()
                .id(urlMapper.getId())
                .name(urlMapper.getUser().getName())
                .email(urlMapper.getUser().getEmail())
                .originalUrl(urlMapper.getOriginalUrl())
                .shortUrl(urlMapper.getShortUrl())
                .clickCount(urlMapper.getClickCount())
                .createdAt(urlMapper.getCreatedAt())
                .build();
    }

    public UrlMappers findUrlByShortUrl(String shortUrl) {
        UrlMappers urlMapper = urlMapperRepository.findUrlByShortUrl(shortUrl);
        if (urlMapper != null) {
            urlMapper.setClickCount(urlMapper.getClickCount() + 1);
            urlMapperRepository.save(urlMapper);

            ClickEvents clickEvent = ClickEvents.builder()
                    .clickDate(LocalDateTime.now())
                    .urlMapper(urlMapper)
                    .build();
            clickEventRepository.save(clickEvent);
        }

        return urlMapper;
    }

    public List<UrlMapperDTO> findUrlsByUser(Users user) {
        return urlMapperRepository.findUrlsByUser(user)
                .stream()
                .map((url) -> toUrlMapperDto(url))
                .toList();
    }

    public List<ClickEventsDTO> findClickEventsByDate(String shortUrl, LocalDateTime startDate, LocalDateTime endDate) {
        UrlMappers urlMapper = urlMapperRepository.findUrlByShortUrl(shortUrl);
        if (urlMapper != null) {
            return clickEventRepository.findByUrlMapperAndClickDateBetween(urlMapper, startDate, endDate)
                    .stream()
                    .collect(Collectors.groupingBy((click) -> click.getClickDate().toLocalDate(), Collectors.counting()))
                    .entrySet()
                    .stream()
                    .map((entry) -> {
                        return ClickEventsDTO.builder()
                                .clickDate(entry.getKey())
                                .count(entry.getValue())
                                .build();
                    })
                    .collect(Collectors.toList());
        }

        return null;
    }

    public Map<LocalDate, Long> findTotalClicksByUserAndDate(Users user, LocalDate startDate, LocalDate endDate) {
        List<UrlMappers> urlMappers = urlMapperRepository.findUrlsByUser(user);
        List<ClickEvents> clickEvents = clickEventRepository.findByUrlMapperInAndClickDateBetween(urlMappers, startDate.atStartOfDay(), endDate.plusDays(1).atStartOfDay());
        return clickEvents
                .stream()
                .collect(Collectors.groupingBy((click) -> click.getClickDate().toLocalDate(), Collectors.counting()));
    }
}
