package com.notesapp.dto;
import com.notesapp.entity.SharePermission;
public record ShareRequest(Long noteId, Long userId, Long groupId, SharePermission permission) {}
