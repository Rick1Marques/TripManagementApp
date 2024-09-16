package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.AppUser;
import org.example.backend.model.AppUserRegisterDto;
import org.example.backend.repo.AppUserRepo;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AppUserService {
    private final AppUserRepo appUserRepo;

    public AppUser findByUserName(String username){
        return appUserRepo
                .findAppUserByUsername(username)
                .orElseThrow(()-> new UsernameNotFoundException("User nor found"));
    }

    public AppUser getLoggedInUser(){
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return findByUserName(principal.getUsername());
    }

    public AppUser register(AppUserRegisterDto appUserRegisterDto){
        AppUser appUser = new AppUser(null, appUserRegisterDto.username(), appUserRegisterDto.password());
        return appUserRepo.save(appUser);
    }
}
