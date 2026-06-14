package com.logicode.backend.academico.controller;

import com.logicode.backend.academico.dto.MallaCurricularDTO;
import com.logicode.backend.academico.service.MallaCurricularService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/malla-curricular")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MallaCurricularController {

    private final MallaCurricularService mallaCurricularService;

    @GetMapping("/carrera/{carreraId}")
    public ResponseEntity<List<MallaCurricularDTO>> getMallaByCarreraId(@PathVariable Integer carreraId) {
        return ResponseEntity.ok(mallaCurricularService.getMallaByCarreraId(carreraId));
    }
}
