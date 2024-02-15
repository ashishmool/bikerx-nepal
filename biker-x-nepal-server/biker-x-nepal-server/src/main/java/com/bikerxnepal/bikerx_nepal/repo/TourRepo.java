package com.bikerxnepal.bikerx_nepal.repo;

import com.bikerxnepal.bikerx_nepal.entity.Tour;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface TourRepo extends JpaRepository<Tour, Long> {

    List<Tour> findByMaxParticipantsLessThanEqual(int maxParticipants);

    List<Tour> findByStartDateGreaterThanEqualAndEndDateLessThanEqual(Date startDate, Date endDate);

    List<Tour> findByTourPrice(double tourPrice);

    List<Tour> findByTourType(String tourType);

    List<Tour> findByTourPriceBetween(double minPrice, double maxPrice);
}
