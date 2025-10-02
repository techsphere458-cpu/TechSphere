package com.example.backend.Services;

import com.example.backend.DTOs.ProductItemDTO;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class ProductItemsService {

    private final DatabaseClient databaseClient;

    public ProductItemsService(DatabaseClient databaseClient) {
        this.databaseClient = databaseClient;
    }

    public Flux<ProductItemDTO> getAllProductItemsByType(String type) {
        String sql = """
                    SELECT * FROM productsItems WHERE type = ?
                """;

        return databaseClient.sql(sql)
                .bind(0, type)
                .map(i -> {
                    ProductItemDTO item = new ProductItemDTO();

                    item.setId(i.get("id", Long.class));
                    item.setType(i.get("type", String.class));
                    item.setModel(i.get("model", String.class));
                    item.setImageUrl(i.get("imageURL", String.class));
                    item.setPrice(i.get("price", Double.class));
                    item.setIsNew(i.get("isNew", Boolean.class));

                    return item;
                })
                .all();
    }

    public Mono<ProductItemDTO> getProductItemById(Long id) {
        String sql = """
                    SELECT * FROM productsItems WHERE id = ?
                """;

        return databaseClient.sql(sql)
                .bind(0, id)
                .map(i -> {
                    ProductItemDTO item = new ProductItemDTO();

                    item.setId(i.get("id", Long.class));
                    item.setType(i.get("type", String.class));
                    item.setModel(i.get("model", String.class));
                    item.setImageUrl(i.get("imageURL", String.class));
                    item.setPrice(i.get("price", Double.class));
                    item.setIsNew(i.get("isNew", Boolean.class));

                    return item;
                })
                .one();
    }

    public Mono<String> redactItem(ProductItemDTO item) {
        String sql = """
                     UPDATE productsItems 
                     SET model = ?,
                        price = ?,
                        isNew = ?,
                        imageURL = ? 
                     WHERE id = ?  
                """;

        return databaseClient.sql(sql)
                .bind(0, item.getModel())
                .bind(1, item.getPrice())
                .bind(2, item.getIsNew())
                .bind(3, item.getImageUrl())
                .bind(4, item.getId())
                .fetch()
                .rowsUpdated()
                .then(Mono.just("Гаджет успішно змінено"));
    }

    public Mono<String> createItem(ProductItemDTO item){
        String sql = """
                    INSERT INTO productsItems(type,model,price,isNew,imageURL) 
                    VALUES(?,?,?,?,?);
                """;

        return databaseClient.sql(sql)
                .bind(0,item.getType())
                .bind(1,item.getModel())
                .bind(2,item.getPrice())
                .bind(3,item.getIsNew())
                .bind(4,item.getImageUrl())
                .fetch()
                .rowsUpdated()
                .then(Mono.just("Гаджет успішно доданий"));
    }

    public Mono<String> deleteItemByID(Long id){
        String sql = "DELETE FROM productsItems WHERE id = ?;";
        return databaseClient.sql(sql)
                .bind(0,id)
                .fetch()
                .rowsUpdated()
                .then(Mono.just("Гаджет успішно видалено"));
    }

    public Mono<String> changeItemsType(String exType,String newType){
        String sql = """
                 UPDATE productsItems 
                     SET type = ? 
                     WHERE type = ?  
                """;

        return databaseClient.sql(sql)
                .bind(0,newType)
                .bind(1,exType)
                .fetch()
                .rowsUpdated()
                .then(Mono.just("Продукт успішно змінено"));
    }
    public Mono<String> deleteItemsByType(String type){
        String sql = "DELETE FROM productsItems WHERE type = ?;";

        return databaseClient.sql(sql)
                .bind(0,type)
                .fetch()
                .rowsUpdated()
                .then(Mono.just("Продукт успішно видалено"));

    }
}
