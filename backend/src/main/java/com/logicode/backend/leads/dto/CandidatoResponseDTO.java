package com.logicode.backend.leads.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class CandidatoResponseDTO {

    private UUID id;
    private String nombres;
    private String apellidos;
    private String correo;
    private String sedeInteres;
}
