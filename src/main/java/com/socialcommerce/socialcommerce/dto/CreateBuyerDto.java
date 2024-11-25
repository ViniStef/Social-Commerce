package com.socialcommerce.socialcommerce.dto;

public record CreateBuyerDto(String first_name, String last_name, Long cpf, String password, String confirm_password, String email) {
}
