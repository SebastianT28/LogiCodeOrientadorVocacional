package com.logicode.backend.academico.service.impl;

import com.logicode.backend.academico.dto.CategoriaDTO;
import com.logicode.backend.academico.entity.Categoria;
import com.logicode.backend.academico.repository.CategoriaRepository;
import com.logicode.backend.academico.service.CategoriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoriaServiceImpl implements CategoriaService {

    private final CategoriaRepository categoriaRepository;

    @Override
    public List<CategoriaDTO> getAllCategorias() {
        return categoriaRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CategoriaDTO getCategoriaById(Integer id) {
        return categoriaRepository.findById(id)
                .map(this::mapToDTO)
                .orElse(null);
    }

    private CategoriaDTO mapToDTO(Categoria categoria) {
        return new CategoriaDTO(
                categoria.getId(),
                categoria.getNombre(),
                categoria.getImagen(),
                categoria.getSvgPath()
        );
    }
}
