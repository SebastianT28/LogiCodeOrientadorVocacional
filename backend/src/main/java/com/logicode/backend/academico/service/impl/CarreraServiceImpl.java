package com.logicode.backend.academico.service.impl;

import com.logicode.backend.academico.dto.CarreraDTO;
import com.logicode.backend.academico.dto.MallaCurricularDTO;
import com.logicode.backend.academico.entity.Carrera;
import com.logicode.backend.academico.repository.CarreraRepository;
import com.logicode.backend.academico.service.CarreraService;
import com.logicode.backend.academico.service.MallaCurricularService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CarreraServiceImpl implements CarreraService {

    private final CarreraRepository carreraRepository;
    private final MallaCurricularService mallaCurricularService;

    @Override
    public List<CarreraDTO> getAllCarreras() {
        return carreraRepository.findAll().stream()
                .map(this::mapToDTOBasic)
                .collect(Collectors.toList());
    }

    @Override
    public CarreraDTO getCarreraById(Integer id) {
        return carreraRepository.findById(id)
                .map(this::mapToDTOWithMalla)
                .orElse(null);
    }

    @Override
    public List<CarreraDTO> getCarrerasRecomendadas(String codigoArea) {
        return carreraRepository.findByAreaVocacionalCodigo(codigoArea).stream()
                .map(this::mapToDTOWithMalla)
                .collect(Collectors.toList());
    }

    private CarreraDTO mapToDTOBasic(Carrera carrera) {
        Integer categoriaId = carrera.getCategoria() != null ? carrera.getCategoria().getId() : null;
        String categoriaNombre = carrera.getCategoria() != null ? carrera.getCategoria().getNombre() : null;

        return new CarreraDTO(
                carrera.getId(),
                categoriaId,
                categoriaNombre,
                carrera.getNombre(),
                carrera.getDescripcion(),
                carrera.getPerfilEgresado(),
                carrera.getImagen(),
                carrera.getSucursales(),
                carrera.getCampoLaboral(),
                null // Sin malla para la lista general (landing)
        );
    }

    private CarreraDTO mapToDTOWithMalla(Carrera carrera) {
        CarreraDTO dto = mapToDTOBasic(carrera);
        List<MallaCurricularDTO> malla = mallaCurricularService.getMallaByCarreraId(carrera.getId());
        dto.setMallaCurricular(malla);
        return dto;
    }
}
