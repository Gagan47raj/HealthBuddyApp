package com.healthbuddy.services.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.healthbuddy.model.User;
import com.healthbuddy.repository.UserRepo;

@Service
public class CustomUserServiceImpl implements UserDetailsService {

    private UserRepo userRepo;

    public CustomUserServiceImpl(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByEmail(username);

        if (user == null) {
            throw new UsernameNotFoundException("User not found: " + username);
        }

        List<GrantedAuthority> auths = new ArrayList<>();
        // Assuming you will add user roles/authorities here if applicable
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), auths);
    }
}
