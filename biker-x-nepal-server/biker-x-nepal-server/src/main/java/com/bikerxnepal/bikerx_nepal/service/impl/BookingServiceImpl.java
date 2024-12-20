package com.bikerxnepal.bikerx_nepal.service.impl;

import com.bikerxnepal.bikerx_nepal.entity.Bike;
import com.bikerxnepal.bikerx_nepal.entity.Booking;
import com.bikerxnepal.bikerx_nepal.entity.SystemUser;
import com.bikerxnepal.bikerx_nepal.entity.Tour;
import com.bikerxnepal.bikerx_nepal.enums.BookingEnum;
import com.bikerxnepal.bikerx_nepal.pojo.BookingPojo;
import com.bikerxnepal.bikerx_nepal.repo.BikeRepo;
import com.bikerxnepal.bikerx_nepal.repo.BookingRepo;
import com.bikerxnepal.bikerx_nepal.repo.SystemUserRepo;
import com.bikerxnepal.bikerx_nepal.repo.TourRepo;
import com.bikerxnepal.bikerx_nepal.service.BookingService;
import com.bikerxnepal.bikerx_nepal.service.EmailService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepo bookingRepo;
    private final BikeRepo bikeRepo;
    private final EmailService emailService;
    private final SystemUserRepo systemUserRepo;
    private final TourRepo tourRepo;



    @Override
    public Booking purchaseTour(BookingPojo bookingPojo) {
        // Create a new Booking instance
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

        // Fetch the tour by its ID
        Tour tour = tourRepo.findById(bookingPojo.getTourId())
                .orElseThrow(() -> new EntityNotFoundException("Tour not found with ID: " + bookingPojo.getTourId()));

        // Check if there are enough spots available
        if (tour.getMaxParticipants() < bookingPojo.getQuantityPersons()) {
            throw new IllegalStateException("Not enough spots available for this tour.");
        }

        // Update maxParticipants by reducing available spots
        tour.setMaxParticipants(tour.getMaxParticipants() - bookingPojo.getQuantityPersons());
        tourRepo.save(tour); // Save the updated tour with reduced participants

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

        // Save the booking
        Booking savedBooking = bookingRepo.save(booking);

        // Get the email directly from bookingPojo
        String userEmail = bookingPojo.getUserEmail(); // Use email from bookingPojo

        // Send booking confirmation email
        emailService.sendBookingConfirmation(savedBooking, userEmail);


        return savedBooking;
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
