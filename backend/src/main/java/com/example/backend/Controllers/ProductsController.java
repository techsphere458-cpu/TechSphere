package com.example.backend.Controllers;

import com.example.backend.DTOs.ProductDTO;
import com.example.backend.Services.ProductsService;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


@RestController
@RequestMapping("/api/products")
public class ProductsController {
    private final ProductsService productsService;

    public ProductsController(ProductsService productsService) {
        this.productsService = productsService;
    }

    @GetMapping()
    public Flux<ProductDTO> getAllProducts() {
        return productsService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Mono<ProductDTO> getProduct(@PathVariable("id") String id){
        return productsService.getProductByID(Long.parseLong(id));
    }

    @PostMapping("/add")
    public Mono<String> addProduct(@RequestBody ProductDTO product){
        return productsService.createProduct(product);
    }

    @PostMapping("/delete")
    public Mono<String> deleteProduct(@RequestBody ProductDTO product){
        return productsService.deleteProductByType(product.getTitle());
    }

    @PostMapping("/change")
    public Mono<String> changeProduct(@RequestBody ProductDTO productDTO){
        return productsService.changeProductProps(productDTO);
    }
}
