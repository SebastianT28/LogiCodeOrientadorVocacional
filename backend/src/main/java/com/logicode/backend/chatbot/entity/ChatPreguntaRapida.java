package com.logicode.backend.chatbot.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "chat_pregunta_rapida", schema = "chatbot")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatPreguntaRapida {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "texto_pregunta", nullable = false, length = 255)
    private String textoPregunta;

    @Column(name = "texto_respuesta", columnDefinition = "TEXT")
    private String textoRespuesta;

    private Integer orden;

    private Boolean activa = true;
}
