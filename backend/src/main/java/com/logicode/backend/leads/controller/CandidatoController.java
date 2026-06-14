package com.logicode.backend.leads.controller;

import com.logicode.backend.leads.dto.CandidatoRequestDTO;
import com.logicode.backend.leads.dto.CandidatoResponseDTO;
import com.logicode.backend.leads.service.CandidatoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/leads")
public class CandidatoController {

    @Autowired
    private CandidatoService candidatoService;

    /**
     * POST /api/leads/candidato
     * Registra un nuevo candidato o devuelve el existente si el correo ya está registrado.
     * Si las validaciones fallan (@Email, @NotBlank), Spring devuelve automáticamente 400 Bad Request.
     */
    @PostMapping("/candidato")
    public ResponseEntity<CandidatoResponseDTO> registrarCandidato(
            @Valid @RequestBody CandidatoRequestDTO dto) {
        CandidatoResponseDTO response = candidatoService.registrarORecuperar(dto);
        return ResponseEntity.ok(response);
    }
}
