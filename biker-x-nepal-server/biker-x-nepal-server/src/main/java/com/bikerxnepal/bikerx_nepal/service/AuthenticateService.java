package com.bikerxnepal.bikerx_nepal.service;

import com.bikerxnepal.bikerx_nepal.pojo.AuthenticateRequest;
import com.bikerxnepal.bikerx_nepal.pojo.AuthenticateResponse;

public interface AuthenticateService {

    AuthenticateResponse authenticate(AuthenticateRequest authenticateRequest);
}
