package com.example.backend.Configs;

import jakarta.annotation.PostConstruct;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Component;

@Component
public class TablesConfig {

    private final DatabaseClient databaseClient;

    public TablesConfig(DatabaseClient databaseClient) {
        this.databaseClient = databaseClient;
    }

    @PostConstruct
    public void init() {
        String sql = """
                CREATE TABLE IF NOT EXISTS products(
                       id BIGINT PRIMARY KEY AUTO_INCREMENT,
                       title VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                       imageURL VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
                );
                
                CREATE TABLE IF NOT EXISTS productsItems(
                       id BIGINT PRIMARY KEY AUTO_INCREMENT,
                       type VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                        model VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                        price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
                        isNew BOOLEAN NOT NULL,
                       imageURL VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
                );
                """;

        databaseClient.sql(sql)
                .fetch()
                .rowsUpdated()
                .doOnNext(count ->
                        System.out.println("Таблиця products створена/оновлена, змінено рядків: " + count)
                )
                .block();
    }
}
