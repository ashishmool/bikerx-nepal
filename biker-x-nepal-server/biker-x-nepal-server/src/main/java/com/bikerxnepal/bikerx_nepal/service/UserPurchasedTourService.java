package com.bikerxnepal.bikerx_nepal.service;

import com.bikerxnepal.bikerx_nepal.entity.UserPurchasedTour;
import com.bikerxnepal.bikerx_nepal.enums.BookingEnum;
import com.bikerxnepal.bikerx_nepal.pojo.UserPurchasedTourPojo;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface UserPurchasedTourService {
    UserPurchasedTour purchaseTour(UserPurchasedTourPojo userPurchasedTourPojo);
    UserPurchasedTour updatePurchase(Long purchaseId, UserPurchasedTourPojo userPurchasedTourPojo);
    void deletePurchase(Long purchaseId);
    Optional<UserPurchasedTour> getPurchaseById(Long purchaseId);
    List<UserPurchasedTour> getAllPurchases();
    List<UserPurchasedTour> getPurchasesByDate(Date purchaseDate);
    List<UserPurchasedTour> getPurchasesByPaymentStatus(BookingEnum paymentStatus);
}
