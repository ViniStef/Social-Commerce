package com.socialcommerce.socialcommerce.controller;

import com.socialcommerce.socialcommerce.service.registerService.RegisterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/register")
public class RegisterController {

    private RegisterService registerService;

    public RegisterController(RegisterService registerService) {
        this.registerService = registerService;
    }

    @GetMapping()
    public ResponseEntity<Boolean> isEmailUsed(@RequestParam String type, @RequestParam String email) {
        return new ResponseEntity<>(registerService.isEmailUsed(type, email), HttpStatus.OK);
    }

}
