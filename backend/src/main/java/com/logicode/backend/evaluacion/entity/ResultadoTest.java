package com.logicode.backend.evaluacion.entity;

import com.logicode.backend.leads.entity.Candidato;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Entity
@Table(name = "resultado_test", schema = "evaluacion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResultadoTest {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "candidato_id")
    private Candidato candidato;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "area_ganadora_codigo")
    private AreaVocacional areaGanadora;

    @Column(columnDefinition = "jsonb", nullable = false)
    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Integer> puntajes;

    @Column(name = "respuestas_detalle", columnDefinition = "jsonb")
    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> respuestasDetalle;

    @Column(name = "completado_en", insertable = false, updatable = false)
    private LocalDateTime completadoEn;
}
