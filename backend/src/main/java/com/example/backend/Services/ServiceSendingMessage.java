package com.example.backend.Services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Service
public class ServiceSendingMessage {
    private final WebClient client;
    private final String from;

    public ServiceSendingMessage(@Value("${mail.sendgrid.api-key}") String apiKey,
                                 @Value("${mail.sendgrid.from}") String from) {
        this.from = from;
        this.client = WebClient.builder()
                .baseUrl("https://api.sendgrid.com/v3")
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    public Mono<Void> sendText(String to, String subject, String text) {
        var payload = Map.of(
                "personalizations", List.of(Map.of(
                        "to", List.of(Map.of("email", to)),
                        "subject", subject
                )),
                "from", Map.of("email", from),
                "content", List.of(Map.of(
                        "type", "text/plain",
                        "value", text
                ))
        );

        return client.post()
                .uri("/mail/send")
                .bodyValue(payload)
                .retrieve()
                .toBodilessEntity()
                .then();
    }
}

