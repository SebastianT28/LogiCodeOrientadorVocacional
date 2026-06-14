package com.logicode.backend.chatbot.service;

import com.logicode.backend.chatbot.entity.ChatMensaje;
import com.logicode.backend.chatbot.entity.ChatSesion;
import com.logicode.backend.chatbot.repository.ChatMensajeRepository;
import com.logicode.backend.chatbot.repository.ChatSesionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class ChatService {

    @Autowired
    private ChatSesionRepository sesionRepository;

    @Autowired
    private ChatMensajeRepository mensajeRepository;

    /**
     * Busca una sesión existente por el token del navegador.
     * Si no existe, crea una nueva.
     */
    public ChatSesion iniciarORecuperarSesion(String tokenNavegador) {
        return sesionRepository.findByTokenNavegador(tokenNavegador)
                .orElseGet(() -> {
                    ChatSesion nueva = new ChatSesion();
                    nueva.setTokenNavegador(tokenNavegador);
                    nueva.setUltimaInteraccion(LocalDateTime.now());
                    return sesionRepository.save(nueva);
                });
    }

    /**
     * Guarda un par de mensajes (usuario + bot) en la base de datos.
     */
    public void guardarMensajes(UUID sesionId, String mensajeUsuario, String respuestaBot) {
        ChatSesion sesion = sesionRepository.findById(sesionId)
                .orElseThrow(() -> new RuntimeException("Sesión no encontrada: " + sesionId));

        // Guardar mensaje del usuario
        ChatMensaje msgUsuario = new ChatMensaje();
        msgUsuario.setSesion(sesion);
        msgUsuario.setRemitente("user");
        msgUsuario.setContenido(mensajeUsuario);
        mensajeRepository.save(msgUsuario);

        // Guardar respuesta del bot
        ChatMensaje msgBot = new ChatMensaje();
        msgBot.setSesion(sesion);
        msgBot.setRemitente("bot");
        msgBot.setContenido(respuestaBot);
        mensajeRepository.save(msgBot);

        // Actualizar timestamp de última interacción
        sesion.setUltimaInteraccion(LocalDateTime.now());
        sesionRepository.save(sesion);
    }

    /**
     * Devuelve el historial de mensajes de una sesión ordenado cronológicamente.
     */
    public List<ChatMensaje> obtenerHistorial(UUID sesionId) {
        return mensajeRepository.findBySesionIdOrderByEnviadoEnAsc(sesionId);
    }
}
