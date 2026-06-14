package com.logicode.backend.academico.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MallaCurricularDTO {
    private Integer id;
    private Integer carreraId;
    private String ciclo;
    private String curso;
}
