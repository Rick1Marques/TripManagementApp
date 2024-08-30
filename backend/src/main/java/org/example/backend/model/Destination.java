package org.example.backend.model;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

public record Destination(
        String country,
        String city,
        String region,
        ZonedDateTime date
) {
}
