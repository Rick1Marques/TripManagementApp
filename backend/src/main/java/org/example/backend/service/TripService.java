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

    public String deleteTrip(String id) throws TripNotFoundException {
        if (!tripRepo.existsById(id)) {
            throw new TripNotFoundException(id);
        }
        tripRepo.deleteById(id);
        return id;
    }

    public Trip updateTrip(Trip trip) {
        Trip oldTrip = tripRepo.findById(trip.id()).orElseThrow(() -> new TripNotFoundException(trip.id()));
        Trip updatedTrip = oldTrip
                .withTitle(trip.title())
                .withDescription(trip.description())
                .withReason(trip.reason())
                .withDestinations(trip.destinations());

        return tripRepo.save(updatedTrip);
    }

    public Trip findTripById(String id) throws TripNotFoundException {
        return tripRepo.findById(id).orElseThrow(() -> new TripNotFoundException(id));
    }
}
