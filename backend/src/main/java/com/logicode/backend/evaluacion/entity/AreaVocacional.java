package com.logicode.backend.evaluacion.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.List;

@Entity
@Table(name = "area_vocacional", schema = "evaluacion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AreaVocacional {

    @Id
    @Column(length = 10)
    private String codigo;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(length = 10)
    private String emoji;

    @Column(name = "perfil_nombre", nullable = false, length = 100)
    private String perfilNombre;

    @Column(name = "perfil_desc", columnDefinition = "TEXT")
    private String perfilDesc;

    @Column(name = "perfil_tags", columnDefinition = "text[]")
    @JdbcTypeCode(SqlTypes.ARRAY)
    private List<String> perfilTags;

    @Column(name = "perfil_insight", columnDefinition = "TEXT")
    private String perfilInsight;
}
