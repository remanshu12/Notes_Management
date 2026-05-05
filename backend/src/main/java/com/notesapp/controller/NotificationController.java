package com.notesapp.controller;

import com.notesapp.entity.Notification;
import com.notesapp.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationRepository repository;
    @GetMapping public List<Notification> all(){ return repository.findAll(); }
    @PostMapping public Notification create(@RequestBody Notification notification){ return repository.save(notification); }
}
