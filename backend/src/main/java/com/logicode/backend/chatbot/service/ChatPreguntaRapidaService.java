package com.logicode.backend.chatbot.service;

import com.logicode.backend.chatbot.entity.ChatPreguntaRapida;
import com.logicode.backend.chatbot.repository.ChatPreguntaRapidaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatPreguntaRapidaService {

    @Autowired
    private ChatPreguntaRapidaRepository repository;

    public List<ChatPreguntaRapida> listarActivas() {
        return repository.findByActivaTrueOrderByOrdenAsc();
    }

    public List<ChatPreguntaRapida> listarTodas() {
        return repository.findAll();
    }

    public ChatPreguntaRapida crear(ChatPreguntaRapida pregunta) {
        return repository.save(pregunta);
    }

    public ChatPreguntaRapida actualizar(Integer id, ChatPreguntaRapida detalles) {
        return repository.findById(id).map(p -> {
            p.setTextoPregunta(detalles.getTextoPregunta());
            p.setTextoRespuesta(detalles.getTextoRespuesta());
            p.setOrden(detalles.getOrden());
            p.setActiva(detalles.getActiva());
            return repository.save(p);
        }).orElseThrow(() -> new RuntimeException("Pregunta rápida no encontrada: " + id));
    }

    public void eliminar(Integer id) {
        repository.deleteById(id);
    }
}
