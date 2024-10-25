package com.bikerxnepal.bikerx_nepal.service.impl;

import com.bikerxnepal.bikerx_nepal.entity.Bike;
import com.bikerxnepal.bikerx_nepal.entity.Booking;
import com.bikerxnepal.bikerx_nepal.enums.BookingEnum;
import com.bikerxnepal.bikerx_nepal.pojo.BookingPojo;
import com.bikerxnepal.bikerx_nepal.repo.BikeRepo;
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
    private final BikeRepo bikeRepo; // Repository to manage bike stock


    @Override
    public Booking purchaseTour(BookingPojo bookingPojo) {
        Booking booking = new Booking();
        booking.setPurchaseDate(new Date());
        booking.setTourId(bookingPojo.getTourId());
        booking.setUserId(bookingPojo.getUserId());
        booking.setBikeIds(bookingPojo.getBikeIds());
        booking.setQuantityPersons(bookingPojo.getQuantityPersons());
        booking.setPaymentStatus(BookingEnum.PENDING); // Default status
        booking.setTotalAmount(bookingPojo.getTotalAmount());

        // Set start and end dates for duration calculation
        booking.setStartDate(bookingPojo.getStartDate());
        booking.setEndDate(bookingPojo.getEndDate());

        // Update stock for each bike in the booking
        bookingPojo.getBikeIds().forEach(bikeId -> {
            Bike bike = bikeRepo.findById(bikeId)
                    .orElseThrow(() -> new EntityNotFoundException("Bike not found with ID: " + bikeId));
            if (bike.getQuantityStock() <= 0) {
                throw new IllegalStateException("Bike with ID " + bikeId + " is out of stock.");
            }
            bike.setQuantityStock(bike.getQuantityStock() - 1); // Deduct stock
            bikeRepo.save(bike); // Save updated stock
        });

        return bookingRepo.save(booking);
    }

    @Override
    public Booking updatePurchase(Long purchaseId, BookingPojo bookingPojo) {
        Booking existingPurchase = bookingRepo.findById(purchaseId)
                .orElseThrow(() -> new EntityNotFoundException("Purchase not found with ID: " + purchaseId));

        existingPurchase.setPaymentStatus(bookingPojo.getPaymentStatus());
        existingPurchase.setBikeIds(bookingPojo.getBikeIds());
        existingPurchase.setStartDate(bookingPojo.getStartDate());
        existingPurchase.setEndDate(bookingPojo.getEndDate());

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
    public List<Booking> getPurchasesByUserId(Long userId) {
        return bookingRepo.findByUserId(userId);
    }

    @Override
    public List<Booking> getPurchasesByPaymentStatus(BookingEnum paymentStatus) {
        return bookingRepo.findByPaymentStatus(paymentStatus);
    }
}
