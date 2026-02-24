package com.url.shortener.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@Table(name = "click_events")
@NoArgsConstructor
@AllArgsConstructor
public class ClickEvents {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, updatable = false,
            columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime clickDate;

    @ManyToOne
    @JoinColumn(name = "url_mapping_id",
            nullable = false, foreignKey = @ForeignKey(name = "fk_click_url_mapper"))
    private UrlMappers urlMapper;

    @PrePersist
    public void prePersist() {
        if (this.clickDate == null) {
            this.clickDate = LocalDateTime.now();
        }
    }
}