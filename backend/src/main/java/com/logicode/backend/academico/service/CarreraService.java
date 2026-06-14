package com.logicode.backend.academico.service;

import com.logicode.backend.academico.dto.CarreraDTO;

import java.util.List;

public interface CarreraService {
    List<CarreraDTO> getAllCarreras();
    CarreraDTO getCarreraById(Integer id);
}
