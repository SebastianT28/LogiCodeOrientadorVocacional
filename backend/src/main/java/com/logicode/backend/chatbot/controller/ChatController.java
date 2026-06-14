package com.logicode.backend.chatbot.controller;

import com.logicode.backend.chatbot.entity.ChatMensaje;
import com.logicode.backend.chatbot.entity.ChatSesion;
import com.logicode.backend.chatbot.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/chatbot")
public class ChatController {

    @Autowired
    private ChatService chatService;

    /**
     * POST /api/chatbot/sesion
     * Body: { "tokenNavegador": "abc-xyz-123" }
     * Inicia o recupera una sesión de chat para el usuario anónimo.
     */
    @PostMapping("/sesion")
    public ResponseEntity<ChatSesion> iniciarSesion(@RequestBody Map<String, String> body) {
        String token = body.get("tokenNavegador");
        if (token == null || token.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        ChatSesion sesion = chatService.iniciarORecuperarSesion(token);
        return ResponseEntity.ok(sesion);
    }

    /**
     * POST /api/chatbot/sesion/{sesionId}/mensajes
     * Body: { "mensajeUsuario": "Hola", "respuestaBot": "Hola, soy OrientaBot..." }
     * El frontend llama a este endpoint DESPUÉS de recibir la respuesta de Gemini,
     * para persistir el historial de la conversación en PostgreSQL.
     */
    @PostMapping("/sesion/{sesionId}/mensajes")
    public ResponseEntity<Void> guardarMensajes(
            @PathVariable UUID sesionId,
            @RequestBody Map<String, String> body) {
        String mensajeUsuario = body.get("mensajeUsuario");
        String respuestaBot = body.get("respuestaBot");
        if (mensajeUsuario == null || respuestaBot == null) {
            return ResponseEntity.badRequest().build();
        }
        chatService.guardarMensajes(sesionId, mensajeUsuario, respuestaBot);
        return ResponseEntity.ok().build();
    }

    /**
     * GET /api/chatbot/sesion/{sesionId}/mensajes
     * Devuelve el historial completo de mensajes de una sesión.
     */
    @GetMapping("/sesion/{sesionId}/mensajes")
    public ResponseEntity<List<ChatMensaje>> obtenerHistorial(@PathVariable UUID sesionId) {
        return ResponseEntity.ok(chatService.obtenerHistorial(sesionId));
    }
}
