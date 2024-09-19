package org.example.backend.model;

import lombok.With;

import java.time.LocalDateTime;

@With
public record Destination(
        String id,
        String country,
        String countryIso,
        String countryFlag,
        String city,
        Coordinates coordinates,
        LocalDateTime date
) {
}


