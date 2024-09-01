package org.example.backend.service;

import org.example.backend.exception.TripNotFoundException;
import org.example.backend.model.Destination;
import org.example.backend.model.Trip;
import org.example.backend.model.TripDto;
import org.example.backend.repo.TripRepo;
import org.junit.jupiter.api.Test;
import org.springframework.test.annotation.DirtiesContext;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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

    @Test
    @DirtiesContext
    void deleteTrip_whenIdExists() {

        Destination destination1 = new Destination("Germany", "Berlin", "Berlin", LocalDateTime.now());

        Trip trip1 = new Trip("1", "Business Trip", "Meeting with clients", "Business", List.of(destination1));

        when(tripRepoMock.existsById(trip1.id())).thenReturn(true);
        doNothing().when(tripRepoMock).deleteById(trip1.id());

        String result = tripService.deleteTrip("1");

        verify(tripRepoMock).existsById(trip1.id());
        verify(tripRepoMock).deleteById(trip1.id());

        assertEquals(trip1.id(), result);

    }

    @Test
    @DirtiesContext
    void deleteTrip_idNotFound() {


        String nonExistentId = "999";

        when(tripRepoMock.existsById(nonExistentId)).thenReturn(false);

        assertThrows(TripNotFoundException.class, () -> {
            tripService.deleteTrip(nonExistentId);
        });

        verify(tripRepoMock).existsById(nonExistentId);
    }


    @Test
    @DirtiesContext
    void updateTrip_whenIdExists() {
        Destination oldDestination = new Destination("Germany", "Berlin", "Berlin", LocalDateTime.now());
        Destination updatedDestination = new Destination("Germany", "Hamburg", "Hamburg", LocalDateTime.now());

        Trip oldTrip = new Trip("1", "Business Trip", "Meeting with clients", "Business", List.of(oldDestination));
        Trip updatedTrip = new Trip("1", "Business Trip", "Meeting with CEO", "Business", List.of(updatedDestination));

        when(tripRepoMock.findById("1")).thenReturn(Optional.of(oldTrip));
        when(tripRepoMock.save(updatedTrip)).thenReturn(updatedTrip);

        Trip result = tripService.updateTrip(updatedTrip);

        assertEquals(updatedTrip, result);

        verify(tripRepoMock).findById("1");
        verify(tripRepoMock).save(updatedTrip);

    }

    @Test
    @DirtiesContext
    void updateTrip_idNotFound() {

        String nonExistentId = "999";

        Destination updatedDestination = new Destination("Germany", "Hamburg", "Hamburg", LocalDateTime.now());

        Trip updatedTrip = new Trip(nonExistentId, "Business Trip", "Meeting with CEO", "Business", List.of(updatedDestination));

        when(tripRepoMock.findById(nonExistentId)).thenThrow(new TripNotFoundException(nonExistentId));

        assertThrows(TripNotFoundException.class, () -> {
            tripService.updateTrip(updatedTrip);
        });

        verify(tripRepoMock).findById(nonExistentId);
    }

}