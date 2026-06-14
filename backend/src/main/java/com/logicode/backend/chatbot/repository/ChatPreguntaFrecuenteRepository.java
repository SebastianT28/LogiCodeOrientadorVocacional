package com.logicode.backend.chatbot.repository;

import com.logicode.backend.chatbot.entity.ChatPreguntaFrecuente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatPreguntaFrecuenteRepository extends JpaRepository<ChatPreguntaFrecuente, Long> {
    List<ChatPreguntaFrecuente> findByActivaTrueOrderByOrdenAsc();
}
