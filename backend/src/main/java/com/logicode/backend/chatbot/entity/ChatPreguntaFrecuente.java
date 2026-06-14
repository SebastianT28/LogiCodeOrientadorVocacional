package com.logicode.backend.chatbot.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "chat_pregunta_rapida", schema = "chatbot")
public class ChatPreguntaFrecuente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "texto_pregunta", nullable = false, length = 255)
    private String textoPregunta;

    @Column(name = "texto_respuesta", columnDefinition = "TEXT")
    private String textoRespuesta;

    @Column(name = "orden")
    private Integer orden;

    @Column(name = "activa")
    private Boolean activa = true;

    public ChatPreguntaFrecuente() {
    }

    public ChatPreguntaFrecuente(String textoPregunta, Integer orden) {
        this.textoPregunta = textoPregunta;
        this.orden = orden;
        this.activa = true;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTextoPregunta() {
        return textoPregunta;
    }

    public void setTextoPregunta(String textoPregunta) {
        this.textoPregunta = textoPregunta;
    }

    public String getTextoRespuesta() {
        return textoRespuesta;
    }

    public void setTextoRespuesta(String textoRespuesta) {
        this.textoRespuesta = textoRespuesta;
    }

    public Integer getOrden() {
        return orden;
    }

    public void setOrden(Integer orden) {
        this.orden = orden;
    }

    public Boolean getActiva() {
        return activa;
    }

    public void setActiva(Boolean activa) {
        this.activa = activa;
    }
}
