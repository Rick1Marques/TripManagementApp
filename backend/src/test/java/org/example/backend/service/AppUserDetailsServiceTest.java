package org.example.backend.service;

import org.example.backend.model.AppUser;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AppUserDetailsServiceTest {

    private final AppUserService appUserService = mock(AppUserService.class);
    private final AppUserDetailsService appUserDetailsService = new AppUserDetailsService(appUserService);


    @Test
    void loadUserByUsername() {
        AppUser appUser = new AppUser("1", "test", "test", List.of());

        when(appUserService.findByUserName("test")).thenReturn(appUser);

        UserDetails result = appUserDetailsService.loadUserByUsername("test");

        UserDetails expected = new User("test", "test", List.of());

        verify(appUserService).findByUserName("test");

        assertEquals(expected, result);
    }

    @Test
    void loadUserByUsername_whenUserNotFound_throwsUsernameNotFoundException() {
        when(appUserService.findByUserName("nonexistentUser")).thenReturn(null);

        assertThrows(UsernameNotFoundException.class, () -> {
            appUserDetailsService.loadUserByUsername("nonexistentUser");
        });

        verify(appUserService).findByUserName("nonexistentUser");
    }
}