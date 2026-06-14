package com.logicode.backend.chatbot.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "chat_mensaje", schema = "chatbot")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatMensaje {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sesion_id", nullable = false)
    private ChatSesion sesion;

    @Column(nullable = false, length = 10)
    private String remitente;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String contenido;

    @Column(name = "enviado_en", insertable = false, updatable = false)
    private LocalDateTime enviadoEn;
}
