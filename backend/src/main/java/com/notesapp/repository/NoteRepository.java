package com.notesapp.repository;

import com.notesapp.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByOwnerId(Long ownerId);
    List<Note> findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(String title, String content);
    @Query("select distinct n from Note n join n.tags t where lower(t.name) = lower(?1)")
    List<Note> findByTagName(String tagName);
}
