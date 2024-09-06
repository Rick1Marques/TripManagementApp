package org.example.backend.model;

import lombok.With;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.List;

@With
public record Trip(
        @MongoId
        String id,
        String title,
        String description,
        String reason,
        List<Destination> destinations,
        List<Event> events
) {
}
