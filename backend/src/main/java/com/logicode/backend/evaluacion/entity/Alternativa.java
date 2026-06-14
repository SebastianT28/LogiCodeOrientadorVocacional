package com.logicode.backend.evaluacion.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "alternativa", schema = "evaluacion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Alternativa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pregunta_id", nullable = false)
    private Pregunta pregunta;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String texto;

    @Column(length = 5)
    private String letra;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "area_vocacional_codigo")
    private AreaVocacional areaVocacional;
}
