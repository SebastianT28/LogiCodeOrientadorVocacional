package com.logicode.backend.chatbot.controller;

import com.logicode.backend.chatbot.entity.ChatPreguntaRapida;
import com.logicode.backend.chatbot.service.ChatPreguntaRapidaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chatbot/preguntas-rapidas")
public class ChatPreguntaRapidaController {

    @Autowired
    private ChatPreguntaRapidaService service;

    /** GET /api/chatbot/preguntas-rapidas → Lista solo las preguntas activas (para el frontend del chatbot) */
    @GetMapping
    public ResponseEntity<List<ChatPreguntaRapida>> listarActivas() {
        return ResponseEntity.ok(service.listarActivas());
    }

    /** GET /api/chatbot/preguntas-rapidas/todas → Lista todas (para administración) */
    @GetMapping("/todas")
    public ResponseEntity<List<ChatPreguntaRapida>> listarTodas() {
        return ResponseEntity.ok(service.listarTodas());
    }

    /** POST /api/chatbot/preguntas-rapidas → Crear nueva pregunta rápida */
    @PostMapping
    public ResponseEntity<ChatPreguntaRapida> crear(@RequestBody ChatPreguntaRapida pregunta) {
        return ResponseEntity.ok(service.crear(pregunta));
    }

    /** PUT /api/chatbot/preguntas-rapidas/{id} → Actualizar una pregunta rápida */
    @PutMapping("/{id}")
    public ResponseEntity<ChatPreguntaRapida> actualizar(
            @PathVariable Integer id,
            @RequestBody ChatPreguntaRapida detalles) {
        return ResponseEntity.ok(service.actualizar(id, detalles));
    }

    /** DELETE /api/chatbot/preguntas-rapidas/{id} → Eliminar una pregunta rápida */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        service.eliminar(id);
        return ResponseEntity.ok().build();
    }
}
