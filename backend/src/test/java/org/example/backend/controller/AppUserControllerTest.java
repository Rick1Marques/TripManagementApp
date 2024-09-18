package org.example.backend.controller;

import org.example.backend.model.AppUser;
import org.example.backend.repo.AppUserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;


@SpringBootTest
@AutoConfigureMockMvc
class AppUserControllerTest {
    @Autowired
    MockMvc mvc;

    @Autowired
    AppUserRepo appUserRepo;


    @Test
    @DirtiesContext
    @WithMockUser(username = "test")
    void getLoggedInUser() throws Exception {
        AppUser appUserTest = new AppUser("1", "test", "test");
        appUserRepo.save(appUserTest);

        mvc.perform(MockMvcRequestBuilders.get("/api/users/me"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                                                {
                                                        "tripId": "1",
                                                        "username":"test"
                                                }
                        """
                ));
    }


    @Test
    @DirtiesContext
    void register() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                        .post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "username":"test",
                                "password": "test"
                                }
                                """)
                )
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.content().json("""

                                                        {
                                                        "username": "test"
                                                        }
                        """

                ))
                .andExpect(MockMvcResultMatchers.jsonPath("$.tripId").exists());
    }

}

