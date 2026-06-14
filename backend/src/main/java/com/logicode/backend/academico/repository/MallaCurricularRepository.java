package com.logicode.backend.academico.repository;

import com.logicode.backend.academico.entity.MallaCurricular;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MallaCurricularRepository extends JpaRepository<MallaCurricular, Integer> {
    List<MallaCurricular> findByCarreraId(Integer carreraId);
}
