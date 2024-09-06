package org.example.backend.model;

import java.time.LocalDateTime;

public record Event(
        String title,
        EventCategory category,
        String description,
        String address,
        String city,
        String country,
        LocalDateTime date
) {
}
