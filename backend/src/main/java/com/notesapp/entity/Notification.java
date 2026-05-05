package com.notesapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Notification {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(optional = false)
    private AppUser recipient;
    private String message;
    private boolean seen;
    private LocalDateTime createdAt;
    @PrePersist
    void onCreate(){ createdAt = LocalDateTime.now(); }
}
