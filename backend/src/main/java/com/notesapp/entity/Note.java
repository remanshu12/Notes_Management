package com.notesapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Note {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String title;
    @Lob @Column(nullable = false)
    private String content;
    @ManyToOne(optional = false)
    private AppUser owner;
    @ManyToMany
    private Set<Tag> tags = new HashSet<>();
    private boolean archived;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    @PrePersist
    void onCreate(){ createdAt = updatedAt = LocalDateTime.now(); }
    @PreUpdate
    void onUpdate(){ updatedAt = LocalDateTime.now(); }
}
