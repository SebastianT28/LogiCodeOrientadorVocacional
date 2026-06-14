package com.logicode.backend.chatbot.service;

import com.logicode.backend.chatbot.entity.ChatPreguntaFrecuente;
import com.logicode.backend.chatbot.repository.ChatPreguntaFrecuenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatPreguntaFrecuenteService {

    @Autowired
    private ChatPreguntaFrecuenteRepository repository;

    public List<ChatPreguntaFrecuente> obtenerPreguntasActivas() {
        return repository.findByActivaTrueOrderByOrdenAsc();
    }
}
