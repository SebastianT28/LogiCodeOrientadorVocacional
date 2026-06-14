package com.logicode.backend.chatbot.repository;

import com.logicode.backend.chatbot.entity.ChatSesion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ChatSesionRepository extends JpaRepository<ChatSesion, UUID> {

    Optional<ChatSesion> findByTokenNavegador(String tokenNavegador);
}
