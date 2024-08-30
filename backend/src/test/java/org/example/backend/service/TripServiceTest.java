package org.example.backend.service;

import org.example.backend.model.Destination;
import org.example.backend.model.Trip;
import org.example.backend.repo.TripRepo;
import org.junit.jupiter.api.Test;
import org.springframework.test.annotation.DirtiesContext;

import java.time.ZonedDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TripServiceTest {

    private final TripRepo tripRepoMock = mock(TripRepo.class);
    private final TripService tripService = new TripService(tripRepoMock);


    @Test
    @DirtiesContext
    void findAllTrips() {
        Destination destination1 = new Destination("Germany", "Berlin", "Berlin", ZonedDateTime.now());
        Destination destination2 = new Destination("France", "Paris", "Île-de-France", ZonedDateTime.now());

        Trip trip1 = new Trip("1", "Business Trip", "Meeting with clients", "Business", new Destination[]{destination1});
        Trip trip2 = new Trip("2", "Vacation", "Family vacation", "Leisure", new Destination[]{destination2});

        List<Trip> listTrips = List.of(trip1, trip2);

        when(tripRepoMock.findAll()).thenReturn(listTrips);

        List<Trip> result = tripService.findAllTrips();

        verify(tripRepoMock).findAll();

        assertEquals(listTrips, result);
    }
}