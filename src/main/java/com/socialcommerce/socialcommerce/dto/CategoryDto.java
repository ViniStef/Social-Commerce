package com.socialcommerce.socialcommerce.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public record CategoryDto(String category_name) {

    @JsonCreator
    public CategoryDto(String category_name) {
        this.category_name = category_name;
    }

    @JsonValue
    public String category_name() {
        return category_name;
    }
}
