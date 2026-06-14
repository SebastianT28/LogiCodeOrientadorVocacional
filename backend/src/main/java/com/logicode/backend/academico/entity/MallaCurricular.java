package com.logicode.backend.academico.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "malla_curricular", schema = "academico")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MallaCurricular {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "carrera_id", nullable = false)
    private Carrera carrera;

    @Column(nullable = false, length = 20)
    private String ciclo;

    @Column(nullable = false, length = 150)
    private String curso;
}
