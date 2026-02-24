package com.url.shortener.repositories;

import com.url.shortener.models.UrlMappers;
import com.url.shortener.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UrlMapperRepository extends JpaRepository<UrlMappers, Long> {
    UrlMappers findUrlByShortUrl(String shortUrl);
    List<UrlMappers> findUrlsByUser(Users user);
}
