package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.exception.TripNotFoundException;
import org.example.backend.exception.UserNotFoundException;
import org.example.backend.model.*;
import org.example.backend.repo.AppUserRepo;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TripService {

    private final AppUserRepo appUserRepo;
    private final IdService idService;

    public List<Trip> findAllTrips(String userId) {
        AppUser user = appUserRepo.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
        return user.trips().stream()
                .sorted(Comparator.comparing(trip ->
                        trip.destinations().getFirst().date()))
                .toList();
    }

    public Trip addTrip(String userId, TripDto newTripEntries) {
        AppUser user = appUserRepo.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
        Trip newTrip = new Trip(
                idService.randomId(),
                newTripEntries.title(),
                newTripEntries.description(),
                newTripEntries.reason(),
                newTripEntries.destinations(),
                newTripEntries.events()
        );
        user.trips().add(newTrip);
        appUserRepo.save(user);
        return newTrip;
    }

    public String deleteTrip(String userId, String id) throws TripNotFoundException {
        AppUser user = appUserRepo.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));

        Trip trip = user.trips().stream()
                .filter(t -> t.id().equals(id))
                .findFirst()
                .orElseThrow(() -> new TripNotFoundException(id));

        user.trips().remove(trip);
        appUserRepo.save(user);
        return id;
    }

    public Trip updateTrip(String userId, Trip trip) {
        AppUser user = appUserRepo.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));

        Trip oldTrip = user.trips().stream()
                .filter(t -> t.id().equals(trip.id()))
                .findFirst()
                .orElseThrow(() -> new TripNotFoundException(trip.id()));


        List<Destination> tripDestinations = trip.destinations().stream()
                .map(destination -> destination.withId(idService.randomId())).toList();

        List<Event> tripEvents = trip.events().stream()
                .map(event -> event.withId(idService.randomId())).toList();

        Trip updatedTrip = oldTrip
                .withTitle(trip.title())
                .withDescription(trip.description())
                .withReason(trip.reason())
                .withDestinations(tripDestinations)
                .withEvents(tripEvents);

        List<Trip> updatedTrips = user.trips().stream()
                .map(t -> t.id().equals(trip.id()) ? updatedTrip : t)
                .collect(Collectors.toList());

        AppUser updatedUser = new AppUser(user.id(), user.username(), user.password(), updatedTrips);

        appUserRepo.save(updatedUser);

        return updatedTrip;
    }

    public Trip findTripById(String userId, String id) throws TripNotFoundException {
        AppUser user = appUserRepo.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));

        return user.trips().stream()
                .filter(t -> t.id().equals(id))
                .findFirst()
                .orElseThrow(() -> new TripNotFoundException(id));
    }
}
