package com.socialcommerce.socialcommerce.exception;


import com.socialcommerce.socialcommerce.dto.ExceptionDto;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionController {

    @ExceptionHandler(PasswordNotMatchException.class)
    public ResponseEntity<?> handlePasswordNotMatchException(PasswordNotMatchException ex) {
        ExceptionDto exception = new ExceptionDto(ex.getMessage());
        return ResponseEntity.badRequest().body(exception);
    }
}
