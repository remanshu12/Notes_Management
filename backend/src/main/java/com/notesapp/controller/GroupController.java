package com.notesapp.controller;

import com.notesapp.entity.TeamGroup;
import com.notesapp.repository.TeamGroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/groups")
@RequiredArgsConstructor
public class GroupController {
    private final TeamGroupRepository repository;
    @PostMapping public TeamGroup create(@RequestBody TeamGroup group){ return repository.save(group); }
    @GetMapping public List<TeamGroup> all(){ return repository.findAll(); }
}
