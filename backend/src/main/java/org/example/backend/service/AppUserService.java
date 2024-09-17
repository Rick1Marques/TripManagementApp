package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.AppUser;
import org.example.backend.model.AppUserRegisterDto;
import org.example.backend.model.AppUserResponse;
import org.example.backend.repo.AppUserRepo;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AppUserService {
    private final AppUserRepo appUserRepo;
    private final PasswordEncoder passwordEncoder;

    public AppUser findByUserName(String username){
        return appUserRepo
                .findAppUserByUsername(username)
                .orElseThrow(()-> new UsernameNotFoundException("User nor found"));
    }

    public AppUserResponse getLoggedInUser(){
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        AppUser appUser = findByUserName(principal.getUsername());
        return new AppUserResponse(appUser.id(), appUser.username());
    }

    public AppUserResponse register(AppUserRegisterDto appUserRegisterDto){
        AppUser appUser = new AppUser(null, appUserRegisterDto.username(), passwordEncoder.encode(appUserRegisterDto.password()));
        appUser = appUserRepo.save(appUser);
        return new AppUserResponse(appUser.id(), appUser.username());
    }
}
