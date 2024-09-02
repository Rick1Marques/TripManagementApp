package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.exception.TripNotFoundException;
import org.example.backend.model.Trip;
import org.example.backend.model.TripDto;
import org.example.backend.repo.TripRepo;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TripService {

    private final TripRepo tripRepo;

    public List<Trip> findAllTrips() {
        return tripRepo.findAll().stream()
                .sorted(Comparator.comparing(trip ->
                        trip.destinations().getFirst().date()))
                .toList();
    }

    public Trip addTrip(TripDto newTripEntries) {
        Trip newTrip = new Trip(
                null,
                newTripEntries.title(),
                newTripEntries.description(),
                newTripEntries.reason(),
                newTripEntries.destinations()
        );

          return tripRepo.save(newTrip);
    }

    public String deleteTrip(String id) {
        if(!tripRepo.existsById(id)){
            throw new TripNotFoundException(id);
        }
        tripRepo.deleteById(id);
        return id;
    }
}
