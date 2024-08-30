package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.Trip;
import org.example.backend.service.TripService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
