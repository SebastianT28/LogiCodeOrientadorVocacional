package com.logicode.backend.chatbot.repository;

import com.logicode.backend.chatbot.entity.ChatPreguntaRapida;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatPreguntaRapidaRepository extends JpaRepository<ChatPreguntaRapida, Integer> {

    List<ChatPreguntaRapida> findByActivaTrueOrderByOrdenAsc();
}
