package com.notesapp.repository;

import com.notesapp.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NoteSearchRepository extends JpaRepository<Note, Long> {
    List<Note> findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(String title, String content);
}
