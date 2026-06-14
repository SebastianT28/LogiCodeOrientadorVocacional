package com.logicode.backend.academico.service.impl;

import com.logicode.backend.academico.dto.CarreraDTO;
import com.logicode.backend.academico.entity.Carrera;
import com.logicode.backend.academico.repository.CarreraRepository;
import com.logicode.backend.academico.service.CarreraService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CarreraServiceImpl implements CarreraService {

    private final CarreraRepository carreraRepository;

    @Override
    public List<CarreraDTO> getAllCarreras() {
        return carreraRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CarreraDTO getCarreraById(Integer id) {
        return carreraRepository.findById(id)
                .map(this::mapToDTO)
                .orElse(null);
    }

    private CarreraDTO mapToDTO(Carrera carrera) {
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
                carrera.getCampoLaboral()
        );
    }
}
