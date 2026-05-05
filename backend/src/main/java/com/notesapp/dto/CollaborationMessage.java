package com.notesapp.dto;
public record CollaborationMessage(Long noteId, Long userId, String title, String content, String eventType) {}
