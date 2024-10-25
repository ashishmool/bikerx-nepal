package com.bikerxnepal.bikerx_nepal.service;

import com.bikerxnepal.bikerx_nepal.entity.Booking;
import com.bikerxnepal.bikerx_nepal.pojo.EmailRequest;

import java.util.Map;

public interface EmailService {

    void resetPassword(EmailRequest emailRequest);

    void sendBookingConfirmation(Booking booking, String userEmail);


}
