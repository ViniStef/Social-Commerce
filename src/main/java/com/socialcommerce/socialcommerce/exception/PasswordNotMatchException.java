package com.socialcommerce.socialcommerce.exception;

public class PasswordNotMatchException extends RuntimeException {

    public PasswordNotMatchException(String message) {
        super(message);
    }
}
