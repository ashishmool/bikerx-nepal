package com.bikerxnepal.bikerx_nepal.service;

import com.bikerxnepal.bikerx_nepal.pojo.EmailRequest;

public interface EmailService {

    void sendCustomerConfirmationEmail(EmailRequest emailRequest);


    void resetPassword(EmailRequest emailRequest);
}
