package com.notesapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class NoteVersion {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(optional = false)
    private Note note;
    private String title;
    @Lob
    private String content;
    @ManyToOne
    private AppUser editedBy;
    private LocalDateTime savedAt;
    @PrePersist
    void onCreate(){ savedAt = LocalDateTime.now(); }
}
