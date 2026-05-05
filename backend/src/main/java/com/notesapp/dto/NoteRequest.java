package com.notesapp.dto;
import java.util.Set;
public record NoteRequest(String title, String content, Long ownerId, Set<String> tags) {}
