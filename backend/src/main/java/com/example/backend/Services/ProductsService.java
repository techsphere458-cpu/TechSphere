package com.example.backend.Services;

import com.example.backend.DTOs.ProductDTO;
import com.example.backend.DTOs.ProductItemDTO;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public class ProductsService {
    private final DatabaseClient databaseClient;
    private final ProductItemsService productItemsService;

    public ProductsService(DatabaseClient databaseClient, ProductItemsService productItemsService) {
        this.databaseClient = databaseClient;
        this.productItemsService = productItemsService;
    }


    public Flux<ProductDTO> getAllProducts() {
        return databaseClient.sql("SELECT * FROM products")
                .map(product -> {
                    ProductDTO productDTO = new ProductDTO();

                    productDTO.setImageURL(product.get("imageURL", String.class));
                    productDTO.setTitle(product.get("title", String.class));
                    productDTO.setId(product.get("id", Long.class));

                    return productDTO;
                }).all();
    }

    public Mono<ProductDTO> getProductByID(Long id){
        String sql = "SELECT * FROM products WHERE id = ?";

        return databaseClient.sql(sql)
                .bind(0,id)
                .map((row, rowMetadata) -> {
                    ProductDTO product = new ProductDTO();

                    product.setId(row.get("id",Long.class));
                    product.setTitle(row.get("title", String.class));
                    product.setImageURL(row.get("imageURL", String.class));

                    return product;
                })
                .one();
    }

    public Mono<String> createProduct(ProductDTO product) {
        String sql = """
                    INSERT INTO products(title,imageURL) VALUES(?,?);
                """;

        return databaseClient.sql(sql)
                .bind(0, product.getTitle())
                .bind(1, product.getImageURL())
                .fetch()
                .rowsUpdated()
                .then(Mono.just("Продукт успішно додано"));

    }

    public Mono<String> deleteProductByType(String type) {
        String sql = "DELETE FROM products WHERE title = ?;";

        return databaseClient.sql(sql)
                .bind(0, type)
                .fetch()
                .rowsUpdated()
                .then(productItemsService.deleteItemsByType(type));
    }

    public Mono<String> changeProductProps(ProductDTO product) {
        String sql = "SELECT title FROM products WHERE id = ?";


        return databaseClient.sql(sql)
                .bind(0, product.getId())
                .map((row,meta) -> row.get("title",String.class))
                .one()
                .flatMap(title -> {
                    if (title.equals(product.getTitle())) {
                        return changeURL(product.getId(), product.getImageURL());
                    } else {
                        return changeProductTotally(product,title);
                    }
                });
    }

    public Mono<String> changeURL(Long id, String URL) {
        String sqlChangeURL = """
                     UPDATE products
                     SET imageURL = ?
                     WHERE id = ?
                """;

        return databaseClient.sql(sqlChangeURL)
                .bind(0, URL)
                .bind(1, id)
                .fetch()
                .rowsUpdated()
                .then(Mono.just("Продукт успішно змінено"));
    }

    public Mono<String> changeProductTotally(ProductDTO product,String originalTitle) {
        String sql = """
                UPDATE products
                     SET imageURL = ?,
                     title = ?
                     WHERE id = ?
                """;

        return databaseClient.sql(sql)
                .bind(0,product.getImageURL())
                .bind(1,product.getTitle())
                .bind(2,product.getId())
                .fetch()
                .rowsUpdated()
                .then(productItemsService.changeItemsType(originalTitle,product.getTitle()));
    }


}
