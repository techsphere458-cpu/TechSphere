package com.example.backend.ServicesTest;

import com.example.backend.Configs.R2DBCConfig;
import com.example.backend.DTOs.ProductItemDTO;
import com.example.backend.Services.ProductItemsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import reactor.test.StepVerifier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = {R2DBCConfig.class, ProductItemsService.class})
@Testcontainers
@ActiveProfiles("test")
class ProductItemsServiceTest {

    @Container
    static MySQLContainer<?> mysql = new MySQLContainer<>("mysql:5.7")
            .withDatabaseName("test")
            .withUsername("test")
            .withPassword("test");


    @DynamicPropertySource
    static void registerProps(DynamicPropertyRegistry registry) {
        registry.add("database.host", mysql::getHost);
        registry.add("database.port", () -> String.valueOf(mysql.getFirstMappedPort()));
        registry.add("database.username", mysql::getUsername);
        registry.add("database.password", mysql::getPassword);
        registry.add("database.name", mysql::getDatabaseName);
    }

    @Autowired
    DatabaseClient databaseClient;

    @Autowired
    ProductItemsService service;

    @BeforeEach
    void setUpSchemaAndData() {
        databaseClient.sql("DROP TABLE IF EXISTS productsItems").then()
                .then(databaseClient.sql("""
                        CREATE TABLE productsItems(
                            id BIGINT PRIMARY KEY AUTO_INCREMENT,
                            type VARCHAR(255) NOT NULL,
                            model VARCHAR(255) NOT NULL,
                            price DECIMAL(10,2) NOT NULL,
                            isNew BOOLEAN NOT NULL,
                            imageURL VARCHAR(255) NOT NULL
                        )
                        """).then())
                .then(databaseClient.sql("""
                        INSERT INTO productsItems(type, model, price, isNew, imageURl)
                        VALUES ('Matrix','M1',100.00,true,'http://img1'),
                               ('Game','G1',  50.00,false,'http://img2'),
                               ('Matrix','M2',120.00,false,'http://img3')
                        """).then())
                .block();
    }

    @Test
    void getAllProductItemsByType_returnsOnlyRequestedType() {
        service.getAllProductItemsByType("Matrix")
                .collectList()
                .as(StepVerifier::create)
                .assertNext(items -> {
                    // Перевіряємо, що знайдено рівно 2 товари типу "Matrix"
                    assertEquals(2, items.size());
                    assertTrue(items.stream().allMatch(i -> "Matrix".equals(i.getType())));
                    assertTrue(items.stream().anyMatch(i -> "M1".equals(i.getModel())));
                    assertTrue(items.stream().anyMatch(i -> "M2".equals(i.getModel())));
                })
                .verifyComplete();
    }

    @Test
    void getAllProductItemsByType_emptyWhenNoMatch() {
        service.getAllProductItemsByType("Nope")
                .collectList()
                .as(StepVerifier::create)
                .assertNext(items -> assertTrue(items.isEmpty()))
                .verifyComplete();
    }

    @Test
    void redactById() {
        ProductItemDTO testItem = new ProductItemDTO();
        testItem.setId(1L);
        testItem.setType("Matrix");
        testItem.setPrice(120.00);
        testItem.setImageUrl("tesdtesjosdfjt");
        testItem.setIsNew(false);
        testItem.setModel("testToChange");

        service.redactItem(testItem)
                .as(StepVerifier::create)
                .expectNext("success")
                .verifyComplete();

        // Перевіряємо, що дані дійсно оновились
        service.getProductItemById(1L)
                .as(StepVerifier::create)
                .assertNext(item -> {
                    assertEquals("testToChange", item.getModel());
                    assertEquals(120.00, item.getPrice());
                    assertEquals("tesdtesjosdfjt", item.getImageUrl());
                    assertFalse(item.getIsNew());
                })
                .verifyComplete();
    }

    @Test
    void getProductItemById_returnsCorrectItem() {
        service.getProductItemById(1L)
                .as(StepVerifier::create)
                .assertNext(item -> {
                    assertEquals(1L, item.getId());
                    assertEquals("Matrix", item.getType());
                    assertEquals("M1", item.getModel());
                    assertEquals(100.00, item.getPrice());
                    assertEquals("http://img1", item.getImageUrl());
                    assertTrue(item.getIsNew());
                })
                .verifyComplete();
    }
}
