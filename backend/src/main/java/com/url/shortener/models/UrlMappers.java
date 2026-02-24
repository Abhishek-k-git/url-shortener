package com.url.shortener.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Builder
@Getter
@Setter
@Table(name = "url_mappers")
@NoArgsConstructor
@AllArgsConstructor
public class UrlMappers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "original_url", nullable = false, length = 2048)
    private String originalUrl;

    @Column(name = "short_url", nullable = false, length = 20, unique = true)
    private String shortUrl;

    @Column(name = "click_count", nullable = false)
    @Builder.Default
    private int clickCount = 0;

    @ManyToOne // owning side (user - url)
    @JoinColumn(name = "user_id",
            nullable = false, foreignKey = @ForeignKey(name = "fk_url_user"))
    private Users user;

    @OneToMany(mappedBy = "urlMapper",
            cascade = CascadeType.ALL, orphanRemoval = true) // opposite side (urlMapper - clickEvent)
    private List<ClickEvents> clickEvents;

    @Column(nullable = false, updatable = false,
            columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
            if (this.createdAt == null) {
                    this.createdAt = LocalDateTime.now();
            }
    }

}
