package com.url.shortener.repositories;

import com.url.shortener.models.ClickEvents;
import com.url.shortener.models.UrlMappers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ClickEventRepository extends JpaRepository<ClickEvents, Long> {
    List<ClickEvents> findByUrlMapperAndClickDateBetween(UrlMappers mapping, LocalDateTime startDate, LocalDateTime endDate);
    List<ClickEvents> findByUrlMapperInAndClickDateBetween(List<UrlMappers> urlMappings, LocalDateTime startDate, LocalDateTime endDate);
}
