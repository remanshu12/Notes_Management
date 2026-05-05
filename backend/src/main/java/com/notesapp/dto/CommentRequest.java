package com.notesapp.dto;
public record CommentRequest(Long noteId, Long authorId, String message) {}
