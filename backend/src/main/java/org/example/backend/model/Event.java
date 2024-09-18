package org.example.backend.model;

import lombok.With;

import java.time.LocalDateTime;

@With
public record Event(
        String id,
        String title,
        EventCategory category,
        String description,
        String address,
        String city,
        String country,
        LocalDateTime date
) {
}
