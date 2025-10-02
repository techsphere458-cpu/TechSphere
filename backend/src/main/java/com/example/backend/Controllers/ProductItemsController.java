package com.example.backend.Controllers;

import com.example.backend.DTOs.ProductItemDTO;
import com.example.backend.Services.ProductItemsService;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api")
public class ProductItemsController {
    private final ProductItemsService productItemsService;

    public ProductItemsController(ProductItemsService productItemsService) {
        this.productItemsService = productItemsService;
    }

    @GetMapping("/items/{type}")
    public Flux<ProductItemDTO> getAllProductItems(@PathVariable("type") String type) {
        return productItemsService.getAllProductItemsByType(type);
    }

    @GetMapping("/item/{id}")
    public Mono<ProductItemDTO> getItemById(@PathVariable("id") String id) {
        return productItemsService.getProductItemById(Long.parseLong(id));
    }

    @PostMapping("/item/redact")
    public Mono<String> redactItemByID(@RequestBody ProductItemDTO item){
        return productItemsService.redactItem(item);
    }
    @PostMapping("/item/add")
    public Mono<String> redactItem(@RequestBody ProductItemDTO item){

        return productItemsService.createItem(item);
    }

    @PostMapping("/item/delete")
    public Mono<String> deleteItem(@RequestBody ProductItemDTO item){
        return productItemsService.deleteItemByID(item.getId());
    }
}

