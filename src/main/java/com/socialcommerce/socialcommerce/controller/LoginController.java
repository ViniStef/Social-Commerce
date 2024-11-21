package com.socialcommerce.socialcommerce.controller;

import com.socialcommerce.socialcommerce.dto.LoginDto;
import com.socialcommerce.socialcommerce.service.loginService.LoginService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
public class LoginController {

    private LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping()
    public ResponseEntity<Object> login (@RequestBody LoginDto loginDto) {

        return new ResponseEntity<>(loginService.login(loginDto.email(), loginDto.password()), HttpStatus.OK);
    }
}
