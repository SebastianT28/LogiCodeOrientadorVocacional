package com.logicode.backend.academico.controller;

import com.logicode.backend.academico.dto.CarreraDTO;
import com.logicode.backend.academico.service.CarreraService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carreras")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CarreraController {

    private final CarreraService carreraService;

    @GetMapping
    public ResponseEntity<List<CarreraDTO>> getAllCarreras() {
        return ResponseEntity.ok(carreraService.getAllCarreras());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CarreraDTO> getCarreraById(@PathVariable Integer id) {
        CarreraDTO carrera = carreraService.getCarreraById(id);
        if (carrera != null) {
            return ResponseEntity.ok(carrera);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/recomendadas/{codigoArea}")
    public ResponseEntity<List<CarreraDTO>> getCarrerasRecomendadas(@PathVariable String codigoArea) {
        return ResponseEntity.ok(carreraService.getCarrerasRecomendadas(codigoArea));
    }
}
