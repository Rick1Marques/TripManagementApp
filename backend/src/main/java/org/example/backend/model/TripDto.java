package org.example.backend.model;

import java.util.List;

public record TripDto(
        String title,
        String description,
        String reason,
        List<Destination> destinations,
        List<Event> events
) {
}
