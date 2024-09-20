package org.example.backend.controller;

import org.example.backend.model.AppUser;
import org.example.backend.model.Coordinates;
import org.example.backend.model.Destination;
import org.example.backend.model.Trip;
import org.example.backend.repo.AppUserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.security.test.context.support.WithMockUser;

import java.time.LocalDateTime;
import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
class TripControllerTest {

    @Autowired
    MockMvc mvc;

    @Autowired
    private AppUserRepo appUserRepo;

    @Test
    @WithMockUser
    void getAllTrips() throws Exception {
        String userId = "1";

        AppUser mockUser = new AppUser(userId, "testUser", "password", List.of());
        appUserRepo.save(mockUser);

        mvc.perform(MockMvcRequestBuilders
                        .get("/api/user/" + userId + "/trips"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("[]"));
    }

    @Test
    @WithMockUser
    void postTrip() throws Exception {
        String userId = "1";

        AppUser mockUser = new AppUser(userId, "testUser", "password", List.of());
        appUserRepo.save(mockUser);


        mvc.perform(MockMvcRequestBuilders
                        .post("/api/user/" + userId + "/trips")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                        {
                            "title": "Business Trip",
                            "description": "Meeting with clients",
                            "reason": "Business",
                            "destinations": [
                                {
                                    "id": "1",
                                    "country": "Germany",
                                    "countryIso": "DE",
                                    "countryFlag": "🇩🇪",
                                    "city": "Berlin",
                                    "coordinates": {
                                        "latitude": "1",
                                        "longitude": "2"
                                    },
                                    "date": "2024-05-20T00:00:00"
                                },
                                {
                                    "id": "2",
                                    "country": "France",
                                    "countryIso": "FR",
                                    "countryFlag": "🇫🇷",
                                    "city": "Paris",
                                    "coordinates": {
                                        "latitude": "1",
                                        "longitude": "2"
                                    },
                                    "date": "2024-05-25T00:00:00"
                                }
                            ],
                            "events": []
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
                                    "id": "1",
                                    "country": "Germany",
                                    "countryIso": "DE",
                                    "countryFlag": "🇩🇪",
                                    "city": "Berlin",
                                    "coordinates": {
                                        "latitude": "1",
                                        "longitude": "2"
                                    },
                                    "date": "2024-05-20T00:00:00"
                                },
                                {
                                    "id": "2",
                                    "country": "France",
                                    "countryIso": "FR",
                                    "countryFlag": "🇫🇷",
                                    "city": "Paris",
                                    "coordinates": {
                                        "latitude": "1",
                                        "longitude": "2"
                                    },
                                    "date": "2024-05-25T00:00:00"
                                }
                            ],
                            "events": []
                        }

"""
                ))
                .andExpect(jsonPath("$.id").exists());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void deleteTrip() throws Exception {
        String userId = "1";
        Destination destination1 = new Destination("1", "Germany", "DE", "🇩🇪", "Berlin", new Coordinates("1", "2"), LocalDateTime.now());
        Trip trip1 = new Trip("1", "Business Trip", "Meeting with clients", "Business", List.of(destination1), List.of());

        appUserRepo.save(new AppUser(userId, "testUser", "password", List.of(trip1)));

        mvc.perform(MockMvcRequestBuilders
                        .delete("/api/user/" + userId + "/trips/1"))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void deleteNonExistentTrip() throws Exception {
        String userId = "1";

        String nonExistentTripId = "999";

        AppUser mockUser = new AppUser(userId, "testUser", "password", List.of());
        appUserRepo.save(mockUser);

        mvc.perform(MockMvcRequestBuilders.delete("/api/user/" + userId + "/trips/" + nonExistentTripId))
                .andExpect(MockMvcResultMatchers.status().isNotFound())
                .andExpect(MockMvcResultMatchers.content().json("""
                        {
                            "message": "Trip not found with id: 999"
                        }
                        """));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void getTripById() throws Exception {
        String userId = "1";

        AppUser mockUser = new AppUser(userId, "testUser", "password", List.of());
        appUserRepo.save(mockUser);

        Destination destination1 = new Destination("1", "Germany", "DE", "🇩🇪", "Berlin", new Coordinates("1", "2"), LocalDateTime.parse("2024-05-20T00:00:00"));
        Trip trip1 = new Trip("1", "Business Trip", "Meeting with clients", "Business", List.of(destination1), List.of());

        appUserRepo.save(new AppUser(userId, "testUser", "password", List.of(trip1)));

        mvc.perform(MockMvcRequestBuilders
                        .get("/api/user/" + userId + "/trips/1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                        {
                            "title": "Business Trip",
                            "description": "Meeting with clients",
                            "reason": "Business",
                            "destinations": [
                                {
                                    "country": "Germany",
                                    "countryIso": "DE",
                                    "countryFlag": "🇩🇪",
                                    "city": "Berlin",
                                    "coordinates": {
                                        "latitude": "1",
                                        "longitude": "2"
                                    },
                                    "date": "2024-05-20T00:00:00"
                                }
                            ],
                            "events": []
                        }
                        """));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void putTrip() throws Exception {
        String userId = "1";
        Destination oldDestination = new Destination("1", "Germany", "DE", "🇩🇪", "Berlin", new Coordinates("1", "2"), LocalDateTime.now());
        Trip oldTrip = new Trip("1", "Business Trip", "Meeting with clients", "Business", List.of(oldDestination), List.of());

        appUserRepo.save(new AppUser(userId, "testUser", "password", List.of(oldTrip)));

        mvc.perform(MockMvcRequestBuilders
                        .put("/api/user/" + userId + "/trips")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                        {
                            "id": "1",
                            "title": "Business Trip Updated",
                            "description": "Updated meeting with clients",
                            "reason": "Business",
                            "destinations": [
                                {
                                    "id": "1",
                                    "country": "Germany",
                                    "countryIso": "DE",
                                    "countryFlag": "🇩🇪",
                                    "city": "Berlin",
                                    "coordinates": {
                                        "latitude": "1",
                                        "longitude": "2"
                                    },
                                    "date": "2024-05-20T00:00:00"
                                },
                                {
                                    "id": "2",
                                    "country": "France",
                                    "countryIso": "FR",
                                    "countryFlag": "🇫🇷",
                                    "city": "Paris",
                                    "coordinates": {
                                        "latitude": "1",
                                        "longitude": "2"
                                    },
                                    "date": "2024-05-25T00:00:00"
                                }
                            ],
                            "events": []
                        }
                        """))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                        {
                            "id": "1",
                            "title": "Business Trip Updated",
                            "description": "Updated meeting with clients",
                            "reason": "Business",
                            "destinations": [
                                {
                                    "country": "Germany",
                                    "countryIso": "DE",
                                    "countryFlag": "🇩🇪",
                                    "city": "Berlin",
                                    "coordinates": {
                                        "latitude": "1",
                                        "longitude": "2"
                                    },
                                    "date": "2024-05-20T00:00:00"
                                },
                                {
                                    "country": "France",
                                    "countryIso": "FR",
                                    "countryFlag": "🇫🇷",
                                    "city": "Paris",
                                    "coordinates": {
                                        "latitude": "1",
                                        "longitude": "2"
                                    },
                                    "date": "2024-05-25T00:00:00"
                                }
                            ],
                            "events": []
                        }
                        """));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void getNonExistentTripById() throws Exception {
        String userId = "1";
        String nonExistentTripId = "999";

        AppUser mockUser = new AppUser(userId, "testUser", "password", List.of());
        appUserRepo.save(mockUser);

        mvc.perform(MockMvcRequestBuilders.get("/api/user/" + userId + "/trips/" + nonExistentTripId))
                .andExpect(MockMvcResultMatchers.status().isNotFound())
                .andExpect(MockMvcResultMatchers.content().json("""
                        {
                            "message": "Trip not found with id: 999"
                        }
                        """));
    }
}
