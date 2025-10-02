package com.example.backend.Controllers;

import com.example.backend.DTOs.UserInfoDTO;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api")
public class LoginController {

    @GetMapping("/getUserInfo")
    public Mono<UserInfoDTO> isAuthenticated(@AuthenticationPrincipal OAuth2User user) {
        if(user == null){
            return Mono.just(new UserInfoDTO(false,null,null,false));
        }else{
            String email = user.getAttribute("email");
            String name = user.getAttribute("name");

            if(email != null && checkAdmin(email)){
                return Mono.just(new UserInfoDTO(true,email,name,true));
            }
            return Mono.just(new UserInfoDTO(true,email,name,false));
        }
    }

    @GetMapping("/admin/check")
    public Mono<Boolean> checkAdmin(@AuthenticationPrincipal OAuth2User user) {
        if(user == null) return Mono.just(false);
        String email = user.getAttribute("email");

        if (email == null) return Mono.just(false);
        return Mono.just(checkAdmin(email));
    }

    public boolean checkAdmin(String email){
        return email.equals("nast5s30102016@gmail.com") || email.equals("mykola.chichkalenko@gmail.com") || email.equals("techsphere458@gmail.com");
    }
}
