package com.bikerxnepal.bikerx_nepal.repo;

import com.bikerxnepal.bikerx_nepal.entity.Bike;
import com.bikerxnepal.bikerx_nepal.entity.Tour;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BikeRepo extends JpaRepository<Bike, Long> {
    // You can add custom queries if needed

    List<Bike> findByBikePrice(double bikePrice);

    List<Bike> findByBikePriceBetween(double minPrice, double maxPrice);

}
