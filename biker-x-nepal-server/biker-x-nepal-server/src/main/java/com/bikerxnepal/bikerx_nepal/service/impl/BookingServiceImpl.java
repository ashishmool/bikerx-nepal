package com.bikerxnepal.bikerx_nepal.service.impl;

import com.bikerxnepal.bikerx_nepal.entity.Booking;
import com.bikerxnepal.bikerx_nepal.enums.BookingEnum;
import com.bikerxnepal.bikerx_nepal.pojo.BookingPojo;
import com.bikerxnepal.bikerx_nepal.repo.BookingRepo;
import com.bikerxnepal.bikerx_nepal.service.BookingService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepo bookingRepo;

    @Override
    public Booking purchaseTour(BookingPojo bookingPojo) {
        Booking booking = new Booking();
        booking.setPurchaseDate(new Date());
        booking.setTour(bookingPojo.getTour());
        booking.setUser(bookingPojo.getUser());
        booking.setBikeId(bookingPojo.getBikeId());
        booking.setQuantityPersons(bookingPojo.getQuantityPersons());
        booking.setPaymentStatus(BookingEnum.PENDING); // Default status

//        userPurchasedTour.setTotalAmount(userPurchasedTourPojo.getTourPrice() * userPurchasedTourPojo.getQuantityPersons());


        return bookingRepo.save(booking);
    }

    @Override
    public Booking updatePurchase(Long purchaseId, BookingPojo bookingPojo) {
        Booking existingPurchase = bookingRepo.findById(purchaseId)
                .orElseThrow(() -> new EntityNotFoundException("Purchase not found with ID: " + purchaseId));


        existingPurchase.setTour(bookingPojo.getTour());
        existingPurchase.setUser(bookingPojo.getUser());
        existingPurchase.setBikeId(bookingPojo.getBikeId());
        existingPurchase.setQuantityPersons(bookingPojo.getQuantityPersons());
//        existingPurchase.setTotalAmount(userPurchasedTourPojo.getTourPrice() * userPurchasedTourPojo.getQuantityPersons());


        return bookingRepo.save(existingPurchase);
    }

    @Override
    public void deletePurchase(Long purchaseId) {
        bookingRepo.deleteById(purchaseId);
    }

    @Override
    public Optional<Booking> getPurchaseById(Long purchaseId) {
        return bookingRepo.findById(purchaseId);
    }

    @Override
    public List<Booking> getAllPurchases() {
        return bookingRepo.findAll();
    }

    @Override
    public List<Booking> getPurchasesByDate(Date purchaseDate) {
        return bookingRepo.findByPurchaseDate(purchaseDate);
    }

    @Override
    public List<Booking> getPurchasesByPaymentStatus(BookingEnum paymentStatus) {
        return bookingRepo.findByPaymentStatus(paymentStatus);
    }
}
