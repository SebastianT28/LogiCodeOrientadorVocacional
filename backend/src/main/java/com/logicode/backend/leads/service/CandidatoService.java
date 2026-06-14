package com.logicode.backend.leads.service;

import com.logicode.backend.leads.dto.CandidatoRequestDTO;
import com.logicode.backend.leads.dto.CandidatoResponseDTO;
import com.logicode.backend.leads.entity.Candidato;
import com.logicode.backend.leads.repository.CandidatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CandidatoService {

    @Autowired
    private CandidatoRepository candidatoRepository;

    public CandidatoResponseDTO registrarORecuperar(CandidatoRequestDTO dto) {
        // Si el correo ya existe, devolvemos el candidato existente sin duplicar
        return candidatoRepository.findByCorreo(dto.getCorreo())
                .map(existente -> new CandidatoResponseDTO(
                        existente.getId(),
                        existente.getNombres(),
                        existente.getApellidos(),
                        existente.getCorreo(),
                        existente.getSedeInteres()
                ))
                .orElseGet(() -> {
                    // Si no existe, creamos uno nuevo
                    Candidato nuevo = new Candidato();
                    nuevo.setNombres(dto.getNombres());
                    nuevo.setApellidos(dto.getApellidos());
                    nuevo.setCorreo(dto.getCorreo());
                    nuevo.setTelefono(dto.getTelefono());
                    nuevo.setSedeInteres(dto.getSedeInteres());
                    Candidato guardado = candidatoRepository.save(nuevo);
                    return new CandidatoResponseDTO(
                            guardado.getId(),
                            guardado.getNombres(),
                            guardado.getApellidos(),
                            guardado.getCorreo(),
                            guardado.getSedeInteres()
                    );
                });
    }
}
