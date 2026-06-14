package com.logicode.backend.academico.service;

import com.logicode.backend.academico.dto.MallaCurricularDTO;

import java.util.List;

public interface MallaCurricularService {
    List<MallaCurricularDTO> getMallaByCarreraId(Integer carreraId);
}
