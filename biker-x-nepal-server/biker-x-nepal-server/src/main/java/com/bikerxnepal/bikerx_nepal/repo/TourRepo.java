package com.bikerxnepal.bikerx_nepal.repo;

import com.bikerxnepal.bikerx_nepal.entity.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface TourRepo extends JpaRepository<Tour, Long> {
    @Query("SELECT t FROM Tour t WHERE " +
            "(:tourName IS NULL OR t.tourName LIKE %:tourName%) AND " +
            "(:tourType IS NULL OR t.tourType = :tourType) AND " +
            "(:startDate IS NULL OR t.startDate >= :startDate) AND " +
            "(:endDate IS NULL OR t.endDate <= :endDate) AND " +
            "(:minPrice IS NULL OR t.tourPrice >= :minPrice) AND " +
            "(:maxPrice IS NULL OR t.tourPrice <= :maxPrice) AND " +
            "(:maxParticipants IS NULL OR t.maxParticipants <= :maxParticipants)")
    List<Tour> searchTours(@Param("tourName") String tourName,
                           @Param("tourType") String tourType,
                           @Param("startDate") Date startDate,
                           @Param("endDate") Date endDate,
                           @Param("minPrice") Double minPrice,
                           @Param("maxPrice") Double maxPrice,
                           @Param("maxParticipants") Integer maxParticipants);
}


