package com.socialcommerce.socialcommerce.controller;

import com.socialcommerce.socialcommerce.service.LoginService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class LoginController {

    private LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping()
    public ResponseEntity<Object> login (@RequestParam String email, @RequestParam String password) {

        return new ResponseEntity<>(loginService.login(email, password), HttpStatus.OK);
    }
}
