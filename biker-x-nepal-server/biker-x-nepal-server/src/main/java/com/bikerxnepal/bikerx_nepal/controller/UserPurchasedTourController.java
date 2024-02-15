package com.bikerxnepal.bikerx_nepal.controller;

import com.bikerxnepal.bikerx_nepal.entity.UserPurchasedTour;
import com.bikerxnepal.bikerx_nepal.pojo.UserPurchasedTourPojo;
import com.bikerxnepal.bikerx_nepal.enums.BookingEnum;
import com.bikerxnepal.bikerx_nepal.service.UserPurchasedTourService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user-purchased-tour")
@RequiredArgsConstructor
public class UserPurchasedTourController {

    private final UserPurchasedTourService userPurchasedTourService;

    @PostMapping("/purchase")
    public UserPurchasedTour purchaseTour(@RequestBody UserPurchasedTourPojo userPurchasedTourPojo) {
        return userPurchasedTourService.purchaseTour(userPurchasedTourPojo);
    }

    @PutMapping("/update/{purchaseId}")
    public UserPurchasedTour updatePurchase(@PathVariable Long purchaseId, @RequestBody UserPurchasedTourPojo userPurchasedTourPojo) {
        return userPurchasedTourService.updatePurchase(purchaseId, userPurchasedTourPojo);
    }

    @DeleteMapping("/delete/{purchaseId}")
    public void deletePurchase(@PathVariable Long purchaseId) {
        userPurchasedTourService.deletePurchase(purchaseId);
    }

    @GetMapping("/get/{purchaseId}")
    public Optional<UserPurchasedTour> getPurchaseById(@PathVariable Long purchaseId) {
        return userPurchasedTourService.getPurchaseById(purchaseId);
    }

    @GetMapping("/get-all")
    public List<UserPurchasedTour> getAllPurchases() {
        return userPurchasedTourService.getAllPurchases();
    }

    @GetMapping("/get-by-date")
    public List<UserPurchasedTour> getPurchasesByDate(@RequestParam("purchaseDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date purchaseDate) {
        return userPurchasedTourService.getPurchasesByDate(purchaseDate);
    }

    @GetMapping("/get-by-payment-status")
    public List<UserPurchasedTour> getPurchasesByPaymentStatus(@RequestParam("paymentStatus") BookingEnum paymentStatus) {
        return userPurchasedTourService.getPurchasesByPaymentStatus(paymentStatus);
    }
}
