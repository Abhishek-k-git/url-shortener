package com.url.shortener.dtos;

import lombok.*;

import java.time.LocalDate;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClickEventsDTO {
    private Long count;
    private LocalDate clickDate;
}
