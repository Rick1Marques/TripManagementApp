package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.Trip;
import org.example.backend.model.TripDto;
import org.example.backend.service.TripService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
@RequiredArgsConstructor
public class TripController {

    private final TripService tripService;

    @GetMapping
    public List<Trip> getAllTrips(){
        return tripService.findAllTrips();
    }


    @GetMapping("{id}")
    public Trip getTripById(@PathVariable String id){
        return tripService.findTripById(id);
    }

    @PostMapping
    public Trip postTrip(@RequestBody TripDto newTripEntries){
        return tripService.addTrip(newTripEntries);
    }

    @PutMapping()
    public Trip putTrip(@RequestBody Trip trip){
        return tripService.updateTrip(trip);
    }

    @DeleteMapping("{id}")
    public String deleteTrip(@PathVariable String id){
        return tripService.deleteTrip(id);
    }
}
