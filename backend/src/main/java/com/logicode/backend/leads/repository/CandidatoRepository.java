package com.logicode.backend.leads.repository;

import com.logicode.backend.leads.entity.Candidato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CandidatoRepository extends JpaRepository<Candidato, UUID> {

    Optional<Candidato> findByCorreo(String correo);
}
