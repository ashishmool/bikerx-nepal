package com.bikerxnepal.bikerx_nepal.repo;

import com.bikerxnepal.bikerx_nepal.entity.Itinerary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ItineraryRepo extends JpaRepository<Itinerary, Long> {
    Optional<Itinerary> findByTour_TourId(Long tourId);

}
