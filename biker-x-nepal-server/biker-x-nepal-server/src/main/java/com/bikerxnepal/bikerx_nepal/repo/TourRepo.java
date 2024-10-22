package com.bikerxnepal.bikerx_nepal.repo;

import com.bikerxnepal.bikerx_nepal.entity.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface TourRepo extends JpaRepository<Tour, Long> {

//    List<Tour> findByMaxParticipantsLessThanEqual(int maxParticipants);
//
//    List<Tour> findByStartDateGreaterThanEqualAndEndDateLessThanEqual(Date startDate, Date endDate);
//
//    List<Tour> findByTourPrice(double tourPrice);
//
//    List<Tour> findByTourType(String tourType);
//
//    List<Tour> findByTourPriceBetween(double minPrice, double maxPrice);

    @Query("SELECT t FROM Tour t WHERE " +
            "(:tourName IS NULL OR LOWER(t.tourName) LIKE LOWER(CONCAT('%', :tourName, '%'))) AND " +
            "(:tourType IS NULL OR LOWER(t.tourType) = LOWER(:tourType)) AND " +
            "(:startDate IS NULL OR t.startDate >= :startDate) AND " +
            "(:endDate IS NULL OR t.endDate <= :endDate) AND " +
            "(:minPrice IS NULL OR t.tourPrice >= :minPrice) AND " +
            "(:maxPrice IS NULL OR t.tourPrice <= :maxPrice)")
    List<Tour> searchTours(
            @Param("tourName") String tourName,
            @Param("tourType") String tourType,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice
    );

}
