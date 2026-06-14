package com.logicode.backend.academico.service;

import com.logicode.backend.academico.dto.CategoriaDTO;

import java.util.List;

public interface CategoriaService {
    List<CategoriaDTO> getAllCategorias();
    CategoriaDTO getCategoriaById(Integer id);
}
