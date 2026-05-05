package com.notesapp.service;

import com.notesapp.dto.NoteRequest;
import com.notesapp.entity.*;
import com.notesapp.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoteService {
    private final NoteRepository noteRepository;
    private final AppUserRepository userRepository;
    private final TagRepository tagRepository;
    private final NoteVersionRepository versionRepository;

    public Note create(NoteRequest request) {
        AppUser owner = userRepository.findById(request.ownerId()).orElseThrow();
        Note note = Note.builder().title(request.title()).content(request.content()).owner(owner).tags(resolveTags(request.tags())).build();
        return noteRepository.save(note);
    }

    public Note update(Long id, NoteRequest request) {
        Note note = noteRepository.findById(id).orElseThrow();
        versionRepository.save(NoteVersion.builder().note(note).title(note.getTitle()).content(note.getContent()).editedBy(note.getOwner()).build());
        note.setTitle(request.title());
        note.setContent(request.content());
        note.setTags(resolveTags(request.tags()));
        return noteRepository.save(note);
    }

    public List<Note> all(){ return noteRepository.findAll(); }
    public List<Note> byOwner(Long ownerId){ return noteRepository.findByOwnerId(ownerId); }
    public List<Note> search(String keyword){ return noteRepository.findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(keyword, keyword); }
    public List<Note> byTag(String tag){ return noteRepository.findByTagName(tag); }
    public void delete(Long id){ noteRepository.deleteById(id); }

    private Set<Tag> resolveTags(Set<String> names) {
        if (names == null) return new HashSet<>();
        return names.stream().filter(s -> s != null && !s.isBlank()).map(name -> tagRepository.findByNameIgnoreCase(name.trim())
                .orElseGet(() -> tagRepository.save(Tag.builder().name(name.trim()).build()))).collect(Collectors.toSet());
    }
}
