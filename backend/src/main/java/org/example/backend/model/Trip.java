package org.example.backend.model;

import lombok.With;

import java.util.List;

@With
public record Trip(
        String id,
        String title,
        String description,
        String reason,
        List<Destination> destinations,
        List<Event> events
) {
}
