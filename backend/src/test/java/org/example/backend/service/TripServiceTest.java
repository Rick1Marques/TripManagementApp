package org.example.backend.service;

import org.example.backend.model.Destination;
import org.example.backend.model.Trip;
import org.example.backend.model.TripDto;
import org.example.backend.repo.TripRepo;
import org.junit.jupiter.api.Test;
import org.springframework.test.annotation.DirtiesContext;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TripServiceTest {

    private final TripRepo tripRepoMock = mock(TripRepo.class);
    private final TripService tripService = new TripService(tripRepoMock);


    @Test
    @DirtiesContext
    void findAllTrips() {
        Destination destination1 = new Destination("Germany", "Berlin", "Berlin", LocalDateTime.now());
        Destination destination2 = new Destination("France", "Paris", "Île-de-France", LocalDateTime.now());

        Trip trip1 = new Trip("1", "Business Trip", "Meeting with clients", "Business", List.of(destination1));
        Trip trip2 = new Trip("2", "Vacation", "Family vacation", "Leisure", List.of(destination2));

        List<Trip> listTrips = List.of(trip1, trip2);

        when(tripRepoMock.findAll()).thenReturn(listTrips);

        List<Trip> result = tripService.findAllTrips();

        verify(tripRepoMock).findAll();

        assertEquals(listTrips, result);
    }

    @Test
    @DirtiesContext
    void addTrip() {
        Destination destination1 = new Destination("Germany", "Berlin", "Berlin", LocalDateTime.now());
        Destination destination2 = new Destination("France", "Paris", "Île-de-France", LocalDateTime.now());

        List<Destination> listDestinations = List.of(destination1, destination2);

        Trip trip1 = new Trip(null, "Business Trip", "Meeting with clients", "Business", listDestinations);
        TripDto trip1Dto = new TripDto( "Business Trip", "Meeting with clients", "Business", listDestinations);

        when(tripRepoMock.save(trip1)).thenReturn(trip1);

        Trip result = tripService.addTrip(trip1Dto);

        verify(tripRepoMock).save(trip1);

        assertEquals(trip1, result);


    }
}