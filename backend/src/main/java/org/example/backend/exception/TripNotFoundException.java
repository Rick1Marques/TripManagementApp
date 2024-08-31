package org.example.backend.exception;

public class TripNotFoundException extends RuntimeException{
    public TripNotFoundException(String id){
        super("Trip not found with id: " + id);
    }
}
