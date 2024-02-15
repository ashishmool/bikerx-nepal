package com.bikerxnepal.bikerx_nepal.service;

import com.bikerxnepal.bikerx_nepal.pojo.EmailRequest;

public interface EmailService {

    void resetPassword(EmailRequest emailRequest);
}
