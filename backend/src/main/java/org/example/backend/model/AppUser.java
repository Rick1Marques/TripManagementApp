package org.example.backend.model;

import org.springframework.data.mongodb.core.mapping.MongoId;

public record AppUser(
        @MongoId
        String id,
        String username,
        String password
) {
}
