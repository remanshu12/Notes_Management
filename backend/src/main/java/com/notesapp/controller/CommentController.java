package com.notesapp.controller;

import com.notesapp.dto.CommentRequest;
import com.notesapp.entity.Comment;
import com.notesapp.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {
    private final CommentRepository commentRepository;
    private final NoteRepository noteRepository;
    private final AppUserRepository userRepository;

    @PostMapping
    public Comment create(@RequestBody CommentRequest request) {
        return commentRepository.save(Comment.builder()
                .note(noteRepository.findById(request.noteId()).orElseThrow())
                .author(userRepository.findById(request.authorId()).orElseThrow())
                .message(request.message()).build());
    }
    @GetMapping("/note/{noteId}") public List<Comment> byNote(@PathVariable Long noteId){ return commentRepository.findAll().stream().filter(c -> c.getNote().getId().equals(noteId)).toList(); }
}
