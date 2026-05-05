package com.notesapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Comment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(optional = false)
    private Note note;
    @ManyToOne(optional = false)
    private AppUser author;
    @Lob
    private String message;
    private LocalDateTime createdAt;
    @PrePersist
    void onCreate(){ createdAt = LocalDateTime.now(); }
}
