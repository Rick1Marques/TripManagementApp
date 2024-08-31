package org.example.backend.model;

import java.time.LocalDateTime;

public record Destination(
        String country,
        String city,
        String region,
        LocalDateTime date
) {
}
