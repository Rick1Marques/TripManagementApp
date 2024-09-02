package org.example.backend.controller;

import org.example.backend.model.Destination;
import org.example.backend.model.Trip;
import org.example.backend.repo.TripRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.LocalDateTime;
import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
class TripControllerTest {

    @Autowired
    MockMvc mvc;
    @Autowired
    private TripRepo tripRepo;

    @Test
    void getAllTrips() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                .get( "/api/trips"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("[]"));
    }

    @Test
    void postTrip() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                .post("/api/trips")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
 {
                                    "title": "Business Trip",
                                    "description": "Meeting with clients",
                                    "reason": "Business",
                                    "destinations": [
                                        {
                                            "country": "Germany",
                                            "city": "Berlin",
                                            "region": "Berlin",
                                            "date": "2024-05-20T00:00:00"
                                        },
                                        {
                                            "country": "France",
                                            "city": "Paris",
                                            "region": "Île-de-France",
                                            "date": "2024-05-25T00:00:00"
                                        }
                                    ]
                                }
"""
                ))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
{
                                    "title": "Business Trip",
                                    "description": "Meeting with clients",
                                    "reason": "Business",
                                    "destinations": [
                                         {
                                            "country": "Germany",
                                            "city": "Berlin",
                                            "region": "Berlin",
                                            "date": "2024-05-20T00:00:00"
                                        },
                                        {
                                            "country": "France",
                                            "city": "Paris",
                                            "region": "Île-de-France",
                                            "date": "2024-05-25T00:00:00"
                                        }
                                    ]
                                }
"""
                ))
                .andExpect(jsonPath("$.id").exists());
    }

    @Test
    @DirtiesContext
    void deleteTrip() throws Exception {

        Destination destination1 = new Destination("Germany", "Berlin", "Berlin", LocalDateTime.now());

        Trip trip1 = new Trip("1", "Business Trip", "Meeting with clients", "Business", List.of(destination1));

        tripRepo.save(trip1);

        mvc.perform(MockMvcRequestBuilders
                        .delete("/api/trips/1"))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @DirtiesContext
    void deleteNonExistentTrip() throws Exception {
        String nonExistentTripId = "999";

        mvc.perform(MockMvcRequestBuilders.delete("/api/trips/" + nonExistentTripId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isNotFound())
                .andExpect(MockMvcResultMatchers.content().json("""
                        {
                            "message": "Trip not found with id: 999"
                        }
                        """));
    }


    @Test
    @DirtiesContext
    void getTripById() throws Exception {
        Destination destination1 = new Destination("Germany", "Berlin", "Berlin", LocalDateTime.parse("2024-05-20T00:00:00"));

        Trip trip1 = new Trip("1", "Business Trip", "Meeting with clients", "Business", List.of(destination1));

        tripRepo.save(trip1);

        mvc.perform(MockMvcRequestBuilders
                .get("/api/trips/1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
{


    @Test
    @DirtiesContext
    void putTrip() throws Exception {
        Destination oldDestination = new Destination("Germany", "Berlin", "Berlin", LocalDateTime.now());
        Trip oldTrip = new Trip("1", "Business Trip", "Meeting with clients", "Business", List.of(oldDestination));

        tripRepo.save(oldTrip);

        mvc.perform(MockMvcRequestBuilders
                .put("/api/trips")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
{
                                    "id": "1",
                                    "title": "Business Trip",
                                    "description": "Meeting with clients",
                                    "reason": "Business",
                                    "destinations": [
                                        {
                                            "country": "Germany",
                                            "city": "Berlin",
                                            "region": "Berlin",
                                            "date": "2024-05-20T00:00:00"
                                        },
                                        {
                                            "country": "France",
                                            "city": "Paris",
                                            "region": "Île-de-France",
                                            "date": "2024-05-25T00:00:00"
                                        }
                                    ]
                                }
"""
                ))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
{
                                    "id": "1",

                                    "title": "Business Trip",
                                    "description": "Meeting with clients",
                                    "reason": "Business",
                                    "destinations": [

                                         {

                                        {

                                            "country": "Germany",
                                            "city": "Berlin",
                                            "region": "Berlin",
                                            "date": "2024-05-20T00:00:00"

                                        }
                                    ]
                                }

"""

                ));
    }

    @Test
    @DirtiesContext
    void getNonExistentTripById() throws Exception {
        String nonExistentTripId = "999";

        mvc.perform(MockMvcRequestBuilders.get("/api/trips/" + nonExistentTripId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isNotFound())
                .andExpect(MockMvcResultMatchers.content().json("""
                        {
                            "message": "Trip not found with id: 999"
                        }
                        """));
    }


                                        },
                                        {
                                            "country": "France",
                                            "city": "Paris",
                                            "region": "Île-de-France",
                                            "date": "2024-05-25T00:00:00"
                                        }
                                    ]
                                }
"""

                ));
    }

}