package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.Trip;
import org.example.backend.model.TripDto;
import org.example.backend.service.TripService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/{userId}/trips")
@RequiredArgsConstructor
public class TripController {

    private final TripService tripService;

    @GetMapping
    public List<Trip> getAllTrips(@PathVariable String userId){
        return tripService.findAllTrips(userId);
    }

    @GetMapping("/{id}")
    public Trip getTripById(@PathVariable String userId, @PathVariable String id){
        return tripService.findTripById(userId, id);
    }

    @PostMapping
    public Trip postTrip(@PathVariable String userId, @RequestBody TripDto newTripEntries){
        return tripService.addTrip(userId, newTripEntries);
    }

    @PutMapping()
    public Trip putTrip(@PathVariable String userId, @RequestBody Trip trip){
        return tripService.updateTrip(userId, trip);
    }

    @DeleteMapping("/{id}")
    public String deleteTrip(@PathVariable String userId, @PathVariable String id){
        return tripService.deleteTrip(userId, id);
    }
}
