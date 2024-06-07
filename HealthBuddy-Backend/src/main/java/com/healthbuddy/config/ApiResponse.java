package com.healthbuddy.config;

import lombok.Data;

@Data
public class ApiResponse {
	private String message;
    private Boolean status;


    public ApiResponse(String message, Boolean status) {

        this.status=status;
        this.message=message;
    }

    public ApiResponse() {
    }
}
