package com.example.backend.Configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.authentication.RedirectServerAuthenticationFailureHandler;
import org.springframework.security.web.server.authentication.RedirectServerAuthenticationSuccessHandler;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        return http.
                csrf(ServerHttpSecurity.CsrfSpec::disable)
                .authorizeExchange(exchange -> exchange
                        .pathMatchers("/api/**",
                                "/",
                                "/paymentAndDelivery",
                                "/service",
                                "/contacts",
                                "/product/**",
                                "/order/item/**",
                                "/order/success/**",
                                "/admin/**",
                                "/admin/add/product",
                                "/admin/redact/product/**",
                                "/admin/product/**",
                                "/admin/add/item",
                                "/admin/redact/item/**",
                                "/static/**",
                                "/assets/**",
                                "/test")
                        .permitAll()
                        .anyExchange().authenticated())
                .oauth2Login(oAuth2LoginSpec ->
                        oAuth2LoginSpec.
                        loginPage("/oauth2/authorization/google")
                                .authenticationSuccessHandler(new RedirectServerAuthenticationSuccessHandler("/admin"))
                                .authenticationFailureHandler(new RedirectServerAuthenticationFailureHandler("/error")))
                .build();
    }
}
