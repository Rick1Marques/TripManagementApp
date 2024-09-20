package org.example.backend.model;

import java.util.List;

public record AppUser(
        String id,
        String username,
        String password,
        List<Trip> trips
) {
}
