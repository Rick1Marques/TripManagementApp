package org.example.backend.model;

import java.time.LocalDateTime;

public record Destination(
        String country,
        String city,
        Coordinates coordinates,
        LocalDateTime date
) {
}


