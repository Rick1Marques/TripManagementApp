package org.example.backend.service;

import org.example.backend.exception.TripNotFoundException;
import org.example.backend.exception.UserNotFoundException;
import org.example.backend.model.*;
import org.example.backend.repo.AppUserRepo;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TripServiceTest {

    private final AppUserRepo appUserRepo = mock(AppUserRepo.class);
    private final IdService idServiceMock = mock(IdService.class);
    private final TripService tripService = new TripService(appUserRepo, idServiceMock);


    @Test
    void findAllTrips_whenUserExists_returnsSortedTrips() {
        AppUser user = new AppUser("1", "testUser", "password", List.of(
                new Trip("1", "Trip A", "Desc A", "Reason A", List.of(
                        new Destination("dest1", "Berlin", "Germany", "city", "address", new Coordinates("1", "2"), LocalDateTime.now())
                ), new ArrayList<>()),
                new Trip("2", "Trip B", "Desc B", "Reason B", List.of(
                        new Destination("dest2", "Paris", "France", "city", "address", new Coordinates("3", "4"), LocalDateTime.now().plusDays(1))
                ), new ArrayList<>())
        ));

        when(appUserRepo.findById("1")).thenReturn(Optional.of(user));

        List<Trip> trips = tripService.findAllTrips("1");

        assertEquals(2, trips.size());
        assertEquals("Trip A", trips.get(0).title());  // Ensuring trips are sorted by first destination date
        assertEquals("Trip B", trips.get(1).title());
    }

    @Test
    void findAllTrips_whenUserNotFound_throwsUserNotFoundException() {
        when(appUserRepo.findById("1")).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> tripService.findAllTrips("1"));
    }

    @Test
    void addTrip_whenUserExists_addsNewTrip() {
        AppUser user = new AppUser("1", "testUser", "password", new ArrayList<>());
        TripDto newTripDto = new TripDto(
                "New Trip", "New Description", "New Reason", new ArrayList<>(), new ArrayList<>());

        when(appUserRepo.findById("1")).thenReturn(Optional.of(user));
        when(idServiceMock.randomId()).thenReturn("randomTripId");

        Trip newTrip = tripService.addTrip("1", newTripDto);

        assertNotNull(newTrip);
        assertEquals("randomTripId", newTrip.id());
        verify(appUserRepo).save(user);
    }

    @Test
    void deleteTrip_whenTripExists_removesTrip() {
        Trip trip = new Trip("1", "Test Trip", "Desc", "Reason", new ArrayList<>(), new ArrayList<>());
        List<Trip> trips = new ArrayList<>(List.of(trip));
        AppUser user = new AppUser("1", "testUser", "password", trips);

        when(appUserRepo.findById("1")).thenReturn(Optional.of(user));

        String deletedTripId = tripService.deleteTrip("1", "1");

        assertEquals("1", deletedTripId);
        assertTrue(trips.isEmpty(), "Trip should be removed from user's trips");
        verify(appUserRepo).save(user);
    }
    @Test
    void deleteTrip_whenTripNotFound_throwsTripNotFoundException() {
        AppUser user = new AppUser("1", "testUser", "password", new ArrayList<>());
        when(appUserRepo.findById("1")).thenReturn(Optional.of(user));

        assertThrows(TripNotFoundException.class, () -> tripService.deleteTrip("1", "999"));
    }

    @Test
    void updateTrip_whenTripExists_updatesTripSuccessfully() {
        // Arrange
        Trip oldTrip = new Trip("1", "Old Trip", "Old Desc", "Old Reason", new ArrayList<>(), new ArrayList<>());
        Trip newTrip = new Trip("1", "Updated Trip", "Updated Desc", "Updated Reason", new ArrayList<>(), new ArrayList<>());
        AppUser user = new AppUser("1", "testUser", "password", List.of(oldTrip));

        when(appUserRepo.findById("1")).thenReturn(Optional.of(user));
        when(idServiceMock.randomId()).thenReturn("newRandomId");

        // Act
        Trip updatedTrip = tripService.updateTrip("1", newTrip);

        // Assert
        assertNotNull(updatedTrip);
        assertEquals("Updated Trip", updatedTrip.title());
        verify(appUserRepo).save(any(AppUser.class));
    }

    @Test
    void findTripById_whenTripExists_returnsTrip() {
        // Arrange
        Trip trip = new Trip("1", "Test Trip", "Desc", "Reason", new ArrayList<>(), new ArrayList<>());
        AppUser user = new AppUser("1", "testUser", "password", List.of(trip));

        when(appUserRepo.findById("1")).thenReturn(Optional.of(user));

        // Act
        Trip foundTrip = tripService.findTripById("1", "1");

        // Assert
        assertNotNull(foundTrip);
        assertEquals("Test Trip", foundTrip.title());
    }

    @Test
    void findTripById_whenTripNotFound_throwsTripNotFoundException() {
        AppUser user = new AppUser("1", "testUser", "password", new ArrayList<>());
        when(appUserRepo.findById("1")).thenReturn(Optional.of(user));

        assertThrows(TripNotFoundException.class, () -> tripService.findTripById("1", "999"));
    }


}