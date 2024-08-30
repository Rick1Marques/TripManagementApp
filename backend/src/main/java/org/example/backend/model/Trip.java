package org.example.backend.model;

import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.List;

public record Trip(
        @MongoId
        String id,
        String title,
        String description,
        String reason,
        List<Destination> destinations
) {
}
