package com.logicode.backend.chatbot.controller;

import com.logicode.backend.chatbot.entity.ChatPreguntaFrecuente;
import com.logicode.backend.chatbot.service.ChatPreguntaFrecuenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@RequestMapping("/api/chatbot/preguntas-frecuentes")
@CrossOrigin(origins = "*")
public class ChatPreguntaFrecuenteController {

    @Autowired
    private ChatPreguntaFrecuenteService service;

    @GetMapping
    public ResponseEntity<List<ChatPreguntaFrecuente>> listarPreguntasActivas() {
        return ResponseEntity.ok(service.obtenerPreguntasActivas());
    }
}
