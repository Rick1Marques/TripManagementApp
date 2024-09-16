package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.AppUser;
import org.example.backend.repo.AppUserRepo;
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
}
