package com.notesapp.controller;

import com.notesapp.entity.AppUser;
import com.notesapp.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final AppUserRepository userRepository;
    @PostMapping public AppUser create(@RequestBody AppUser user){ return userRepository.save(user); }
    @GetMapping public List<AppUser> all(){ return userRepository.findAll(); }
}
