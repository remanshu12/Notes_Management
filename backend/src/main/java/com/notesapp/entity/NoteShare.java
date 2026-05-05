package com.notesapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class NoteShare {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(optional = false)
    private Note note;
    @ManyToOne
    private AppUser sharedWithUser;
    @ManyToOne
    private TeamGroup sharedWithGroup;
    @Enumerated(EnumType.STRING)
    private SharePermission permission;
    private LocalDateTime createdAt;
    @PrePersist
    void onCreate(){ createdAt = LocalDateTime.now(); }
}
