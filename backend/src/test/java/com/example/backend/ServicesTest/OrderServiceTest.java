package com.example.backend.ServicesTest;
import com.example.backend.DTOs.OrderDTO;
import com.example.backend.Services.OrderService;
import com.example.backend.Services.ServiceSendingMessage;
import org.junit.jupiter.api.Test;
import org.springframework.boot.env.YamlPropertySourceLoader;
import org.springframework.core.env.PropertySource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.io.IOException;

class OrderServiceTest {

    @Test
    void submitOrder_sendsEmailSuccessfully() throws IOException {
        YamlPropertySourceLoader loader = new YamlPropertySourceLoader();
        Resource resource = new ClassPathResource("application.yml");
        PropertySource<?> propertySource = loader.load("testProps", resource).get(0);

        String apiKey = (String) propertySource.getProperty("mail.sendgrid.api-key");
        String fromEmail = (String) propertySource.getProperty("mail.sendgrid.from");

        ServiceSendingMessage realSender = new ServiceSendingMessage(apiKey, fromEmail);
        OrderService orderService = new OrderService(realSender);

        OrderDTO order = new OrderDTO();
        order.setType("(ТЕСТОВА ВІДПРАВКА)");
        order.setModel("FDSFDS");
        order.setPrice(120.50);
        order.setNew(false);
        order.setName("Коля");
        order.setPhone("123456789");

        Mono<String> result = orderService.submitOrder(order);

        StepVerifier.create(result)
                .expectNext("success")
                .verifyComplete();
    }
}
