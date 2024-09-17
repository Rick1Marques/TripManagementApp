package org.example.backend.controller;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.example.backend.model.AppUserRegisterDto;
import org.example.backend.model.AppUserResponse;
import org.example.backend.service.AppUserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class AppUserController {

    private final AppUserService appUserService;

    @GetMapping("/me")
    public AppUserResponse getLoggedInUser() {
        return appUserService.getLoggedInUser();
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AppUserResponse register(@RequestBody AppUserRegisterDto appUserRegisterDto) {
        return appUserService.register(appUserRegisterDto);
    }
    
    @PostMapping("/login")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void login() {
        // Trigger login process
    }

    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void logout(HttpSession session) {
        session.invalidate();
        SecurityContextHolder.clearContext();
    }


}
