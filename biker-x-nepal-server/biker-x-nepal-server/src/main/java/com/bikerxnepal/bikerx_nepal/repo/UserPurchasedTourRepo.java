package com.bikerxnepal.bikerx_nepal.repo;

import com.bikerxnepal.bikerx_nepal.entity.UserPurchasedTour;
import com.bikerxnepal.bikerx_nepal.enums.BookingEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface UserPurchasedTourRepo extends JpaRepository<UserPurchasedTour, Long> {
    List<UserPurchasedTour> findByPurchaseDate(Date purchaseDate);
    List<UserPurchasedTour> findByPaymentStatus(BookingEnum paymentStatus);
}
