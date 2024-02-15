package com.bikerxnepal.bikerx_nepal.repo;

import com.bikerxnepal.bikerx_nepal.entity.Bike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BikeRepo extends JpaRepository<Bike, Long> {
    // You can add custom queries if needed
}
