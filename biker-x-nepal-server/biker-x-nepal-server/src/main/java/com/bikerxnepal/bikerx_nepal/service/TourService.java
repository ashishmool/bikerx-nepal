package com.bikerxnepal.bikerx_nepal.service;

import com.bikerxnepal.bikerx_nepal.entity.Tour;
import com.bikerxnepal.bikerx_nepal.pojo.TourPojo;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface TourService {

    String save(TourPojo tourPojo) throws IOException;

    List<Tour> getAll();

    void deleteById(Long id) throws IOException;

    Optional<Tour> getById(Long id);

    String update(Long id, TourPojo tourPojo) throws IOException;

    List<Tour> getTourByMaxParticipants(int maxParticipants);

    List<Tour> getByDuration(Date startDate, Date endDate);

    List<Tour> getByTourPrice(double tourPrice);

    List<Tour> getByTourType(String tourType);

    List<Tour> getByPriceRange(double minPrice, double maxPrice);

    List<Tour> searchTours(String tourName, String tourType, Date startDate, Date endDate, Double minPrice, Double maxPrice, Integer maxParticipants); // Modified
}
