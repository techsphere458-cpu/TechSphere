package com.example.backend.Controllers;

import com.example.backend.DTOs.OrderDTO;
import com.example.backend.Services.OrderService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/order/submit")
    public Mono<String> submitOrder(@RequestBody OrderDTO order) {
        return orderService.submitOrder(order);
    }
}
