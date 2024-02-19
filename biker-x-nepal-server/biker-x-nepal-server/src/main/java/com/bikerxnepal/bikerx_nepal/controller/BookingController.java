package com.bikerxnepal.bikerx_nepal.controller;

import com.bikerxnepal.bikerx_nepal.entity.Booking;
import com.bikerxnepal.bikerx_nepal.pojo.BookingPojo;
import com.bikerxnepal.bikerx_nepal.enums.BookingEnum;
import com.bikerxnepal.bikerx_nepal.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/booking")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping("/save")
    public Booking purchaseTour(@RequestBody BookingPojo bookingPojo) {
        return bookingService.purchaseTour(bookingPojo);
    }

    @PutMapping("/update/{purchaseId}")
    public Booking updatePurchase(@PathVariable Long purchaseId, @RequestBody BookingPojo bookingPojo) {
        return bookingService.updatePurchase(purchaseId, bookingPojo);
    }

    @DeleteMapping("/delete/{purchaseId}")
    public void deletePurchase(@PathVariable Long purchaseId) {
        bookingService.deletePurchase(purchaseId);
    }

    @GetMapping("/get/{purchaseId}")
    public Optional<Booking> getPurchaseById(@PathVariable Long purchaseId) {
        return bookingService.getPurchaseById(purchaseId);
    }

    @GetMapping("/getAll")
    public List<Booking> getAllPurchases() {
        return bookingService.getAllPurchases();
    }

    @GetMapping("/get-by-date")
    public List<Booking> getPurchasesByDate(@RequestParam("purchaseDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date purchaseDate) {
        return bookingService.getPurchasesByDate(purchaseDate);
    }

    @GetMapping("/get-by-payment-status")
    public List<Booking> getPurchasesByPaymentStatus(@RequestParam("paymentStatus") BookingEnum paymentStatus) {
        return bookingService.getPurchasesByPaymentStatus(paymentStatus);
    }


    @GetMapping("/getByUserId/{userId}") // Updated mapping to retrieve userId from path
    public List<Booking> getPurchasesByUserId(@PathVariable Long userId) { // Use @PathVariable to retrieve userId from path
        return bookingService.getPurchasesByUserId(userId);
    }
}
