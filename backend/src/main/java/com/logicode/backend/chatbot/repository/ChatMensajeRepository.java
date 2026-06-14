package com.logicode.backend.chatbot.repository;

import com.logicode.backend.chatbot.entity.ChatMensaje;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ChatMensajeRepository extends JpaRepository<ChatMensaje, Long> {

    List<ChatMensaje> findBySesionIdOrderByEnviadoEnAsc(UUID sesionId);
}
