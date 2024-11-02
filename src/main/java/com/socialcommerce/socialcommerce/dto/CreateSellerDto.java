package com.socialcommerce.socialcommerce.dto;

public record CreateSellerDto(String first_name, String last_name, Long cnpj, String password, String confirmPassword, String email) {
}
