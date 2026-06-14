package com.logicode.backend.chatbot.config;

import com.logicode.backend.chatbot.entity.ChatPreguntaFrecuente;
import com.logicode.backend.chatbot.repository.ChatPreguntaFrecuenteRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class ChatbotDataInitializer {

    @Bean
    public CommandLineRunner initChatPreguntas(ChatPreguntaFrecuenteRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.saveAll(Arrays.asList(
                    new ChatPreguntaFrecuente("¿Cómo funciona el test vocacional?", 1),
                    new ChatPreguntaFrecuente("¿Qué carreras ofrece la UTP?", 2),
                    new ChatPreguntaFrecuente("¿Dónde quedan las sedes?", 3)
                ));
            }
        };
    }
}
