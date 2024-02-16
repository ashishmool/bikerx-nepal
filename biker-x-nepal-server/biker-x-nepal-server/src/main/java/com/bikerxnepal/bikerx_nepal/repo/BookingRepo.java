package com.bikerxnepal.bikerx_nepal.repo;

import com.bikerxnepal.bikerx_nepal.entity.Booking;
import com.bikerxnepal.bikerx_nepal.enums.BookingEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface BookingRepo extends JpaRepository<Booking, Long> {
    List<Booking> findByPurchaseDate(Date purchaseDate);
    List<Booking> findByPaymentStatus(BookingEnum paymentStatus);
}
