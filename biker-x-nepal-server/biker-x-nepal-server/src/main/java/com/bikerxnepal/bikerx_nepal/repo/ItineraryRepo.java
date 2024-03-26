package com.bikerxnepal.bikerx_nepal.repo;

import com.bikerxnepal.bikerx_nepal.entity.Itinerary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItineraryRepo extends JpaRepository<Itinerary, Long> {
}
