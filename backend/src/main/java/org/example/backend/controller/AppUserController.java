package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.AppUserRegisterDto;
import org.example.backend.model.AppUserResponse;
import org.example.backend.service.AppUserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class AppUserController {

    private final AppUserService appUserService;

    @GetMapping("/me")
    public AppUserResponse getLoggedInUser(){
        return appUserService.getLoggedInUser();
    }

    @PostMapping("/login")
    public void login(){
        // Trigger login process
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AppUserResponse register(@RequestBody AppUserRegisterDto appUserRegisterDto){
        return appUserService.register(appUserRegisterDto);
    }

}
