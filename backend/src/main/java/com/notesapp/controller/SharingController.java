package com.notesapp.controller;

import com.notesapp.dto.ShareRequest;
import com.notesapp.entity.*;
import com.notesapp.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/shares")
@RequiredArgsConstructor
public class SharingController {
    private final NoteShareRepository shareRepository;
    private final NoteRepository noteRepository;
    private final AppUserRepository userRepository;
    private final TeamGroupRepository groupRepository;

    @PostMapping
    public NoteShare share(@RequestBody ShareRequest request) {
        Note note = noteRepository.findById(request.noteId()).orElseThrow();
        AppUser user = request.userId() == null ? null : userRepository.findById(request.userId()).orElseThrow();
        TeamGroup group = request.groupId() == null ? null : groupRepository.findById(request.groupId()).orElseThrow();
        return shareRepository.save(NoteShare.builder().note(note).sharedWithUser(user).sharedWithGroup(group).permission(request.permission()).build());
    }
    @GetMapping public List<NoteShare> all(){ return shareRepository.findAll(); }
}
