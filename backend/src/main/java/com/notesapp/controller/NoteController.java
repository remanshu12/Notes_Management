package com.notesapp.controller;

import com.notesapp.dto.NoteRequest;
import com.notesapp.entity.Note;
import com.notesapp.repository.NoteVersionRepository;
import com.notesapp.service.NoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notes")
@RequiredArgsConstructor
public class NoteController {
    private final NoteService noteService;
    private final NoteVersionRepository versionRepository;

    @PostMapping public Note create(@RequestBody NoteRequest request){ return noteService.create(request); }
    @GetMapping public List<Note> all(){ return noteService.all(); }
    @GetMapping("/owner/{ownerId}") public List<Note> byOwner(@PathVariable Long ownerId){ return noteService.byOwner(ownerId); }
    @GetMapping("/search") public List<Note> search(@RequestParam String keyword){ return noteService.search(keyword); }
    @GetMapping("/tag/{tag}") public List<Note> byTag(@PathVariable String tag){ return noteService.byTag(tag); }
    @PutMapping("/{id}") public Note update(@PathVariable Long id, @RequestBody NoteRequest request){ return noteService.update(id, request); }
    @DeleteMapping("/{id}") public void delete(@PathVariable Long id){ noteService.delete(id); }
    @GetMapping("/{id}/versions") public Object versions(@PathVariable Long id){ return versionRepository.findByNoteIdOrderBySavedAtDesc(id); }
}
