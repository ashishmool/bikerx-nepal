package com.bikerxnepal.bikerx_nepal.service.impl;

import com.bikerxnepal.bikerx_nepal.entity.UserPurchasedTour;
import com.bikerxnepal.bikerx_nepal.enums.BookingEnum;
import com.bikerxnepal.bikerx_nepal.pojo.UserPurchasedTourPojo;
import com.bikerxnepal.bikerx_nepal.repo.UserPurchasedTourRepo;
import com.bikerxnepal.bikerx_nepal.service.UserPurchasedTourService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserPurchasedTourServiceImpl implements UserPurchasedTourService {

    private final UserPurchasedTourRepo userPurchasedTourRepo;

    @Override
    public UserPurchasedTour purchaseTour(UserPurchasedTourPojo userPurchasedTourPojo) {
        UserPurchasedTour userPurchasedTour = new UserPurchasedTour();
        userPurchasedTour.setPurchaseDate(new Date());
        userPurchasedTour.setTour(userPurchasedTourPojo.getTour());
        userPurchasedTour.setUser(userPurchasedTourPojo.getUser());
        userPurchasedTour.setBikeId(userPurchasedTourPojo.getBikeId());
        userPurchasedTour.setQuantityPersons(userPurchasedTourPojo.getQuantityPersons());
        userPurchasedTour.setPaymentStatus(BookingEnum.PENDING); // Default status

//        userPurchasedTour.setTotalAmount(userPurchasedTourPojo.getTourPrice() * userPurchasedTourPojo.getQuantityPersons());


        return userPurchasedTourRepo.save(userPurchasedTour);
    }

    @Override
    public UserPurchasedTour updatePurchase(Long purchaseId, UserPurchasedTourPojo userPurchasedTourPojo) {
        UserPurchasedTour existingPurchase = userPurchasedTourRepo.findById(purchaseId)
                .orElseThrow(() -> new EntityNotFoundException("Purchase not found with ID: " + purchaseId));


        existingPurchase.setTour(userPurchasedTourPojo.getTour());
        existingPurchase.setUser(userPurchasedTourPojo.getUser());
        existingPurchase.setBikeId(userPurchasedTourPojo.getBikeId());
        existingPurchase.setQuantityPersons(userPurchasedTourPojo.getQuantityPersons());
//        existingPurchase.setTotalAmount(userPurchasedTourPojo.getTourPrice() * userPurchasedTourPojo.getQuantityPersons());


        return userPurchasedTourRepo.save(existingPurchase);
    }

    @Override
    public void deletePurchase(Long purchaseId) {
        userPurchasedTourRepo.deleteById(purchaseId);
    }

    @Override
    public Optional<UserPurchasedTour> getPurchaseById(Long purchaseId) {
        return userPurchasedTourRepo.findById(purchaseId);
    }

    @Override
    public List<UserPurchasedTour> getAllPurchases() {
        return userPurchasedTourRepo.findAll();
    }

    @Override
    public List<UserPurchasedTour> getPurchasesByDate(Date purchaseDate) {
        return userPurchasedTourRepo.findByPurchaseDate(purchaseDate);
    }

    @Override
    public List<UserPurchasedTour> getPurchasesByPaymentStatus(BookingEnum paymentStatus) {
        return userPurchasedTourRepo.findByPaymentStatus(paymentStatus);
    }
}
