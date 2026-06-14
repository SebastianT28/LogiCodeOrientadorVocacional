package com.logicode.backend.chatbot.entity;

import com.logicode.backend.leads.entity.Candidato;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "chat_sesion", schema = "chatbot")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatSesion {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "token_navegador", unique = true, length = 255)
    private String tokenNavegador;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "candidato_id")
    private Candidato candidato;

    @Column(name = "iniciada_en", insertable = false, updatable = false)
    private LocalDateTime iniciadaEn;

    @Column(name = "ultima_interaccion")
    private LocalDateTime ultimaInteraccion;
}
