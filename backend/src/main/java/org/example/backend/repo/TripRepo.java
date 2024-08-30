package org.example.backend.repo;

import org.example.backend.model.Trip;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TripRepo extends MongoRepository<Trip, String> {
}
