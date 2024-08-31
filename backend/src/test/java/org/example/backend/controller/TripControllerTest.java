package org.example.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
class TripControllerTest {

    @Autowired
    MockMvc mvc;

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
}