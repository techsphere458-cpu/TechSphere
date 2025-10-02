package com.example.backend.Services;

import com.example.backend.DTOs.OrderDTO;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class OrderService {

    private final ServiceSendingMessage serviceSendingMessage;

    public OrderService(ServiceSendingMessage serviceSendingMessage) {
        this.serviceSendingMessage = serviceSendingMessage;
    }


    public Mono<String> submitOrder(OrderDTO order) {
        String condition = order.getIsNew() ? "Новий" : "Б/У";

        String text = "- " + order.getType() + " (1шт)\n" +
                      "- модель: " + order.getModel() + "\n" +
                      "- ціна: " + order.getPrice() + " грн \n" +
                      "- стан: " + condition + "\n" +
                      "ім'я замовника: " + order.getName() + "\n" +
                      "телефон замовника: " + order.getPhone();

        return serviceSendingMessage.sendText("1hack2r.34@gmail.com", "Техно Сфера - Нове замовлення", text)
                .thenReturn("success");
    }
}
