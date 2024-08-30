package org.example.backend.model;

import org.springframework.data.mongodb.core.mapping.MongoId;

public record Trip(
        @MongoId
        String id,
        String title,
        String description,
        String reason,
        Destination[] destinations
) {
}
