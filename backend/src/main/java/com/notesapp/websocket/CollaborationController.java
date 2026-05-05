package com.notesapp.websocket;

import com.notesapp.dto.CollaborationMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class CollaborationController {
    @MessageMapping("/note.edit")
    @SendTo("/topic/notes")
    public CollaborationMessage broadcastEdit(CollaborationMessage message) {
        return message;
    }
}
