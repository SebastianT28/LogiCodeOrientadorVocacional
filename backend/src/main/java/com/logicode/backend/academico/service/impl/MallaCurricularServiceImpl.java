package com.logicode.backend.academico.service.impl;

import com.logicode.backend.academico.dto.MallaCurricularDTO;
import com.logicode.backend.academico.entity.MallaCurricular;
import com.logicode.backend.academico.repository.MallaCurricularRepository;
import com.logicode.backend.academico.service.MallaCurricularService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MallaCurricularServiceImpl implements MallaCurricularService {

    private final MallaCurricularRepository mallaCurricularRepository;

    @Override
    public List<MallaCurricularDTO> getMallaByCarreraId(Integer carreraId) {
        return mallaCurricularRepository.findByCarreraId(carreraId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private MallaCurricularDTO mapToDTO(MallaCurricular malla) {
        Integer carreraId = malla.getCarrera() != null ? malla.getCarrera().getId() : null;
        return new MallaCurricularDTO(
                malla.getId(),
                carreraId,
                malla.getCiclo(),
                malla.getCurso()
        );
    }
}
