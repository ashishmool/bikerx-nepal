package com.bikerxnepal.bikerx_nepal.service;

import com.bikerxnepal.bikerx_nepal.entity.Booking;
import com.bikerxnepal.bikerx_nepal.enums.BookingEnum;
import com.bikerxnepal.bikerx_nepal.pojo.BookingPojo;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface BookingService {
    Booking purchaseTour(BookingPojo bookingPojo);
    Booking updatePurchase(Long purchaseId, BookingPojo bookingPojo);
    void deletePurchase(Long purchaseId);
    Optional<Booking> getPurchaseById(Long purchaseId);
    List<Booking> getAllPurchases();
    List<Booking> getPurchasesByDate(Date purchaseDate);
    List<Booking> getPurchasesByPaymentStatus(BookingEnum paymentStatus);
}
