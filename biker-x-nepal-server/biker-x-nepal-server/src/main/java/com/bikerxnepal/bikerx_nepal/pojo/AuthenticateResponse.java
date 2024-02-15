package com.bikerxnepal.bikerx_nepal.pojo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticateResponse {

    private String token;
    private String role;
    private Long userId;
    private String fullName;
    private String email;


}
