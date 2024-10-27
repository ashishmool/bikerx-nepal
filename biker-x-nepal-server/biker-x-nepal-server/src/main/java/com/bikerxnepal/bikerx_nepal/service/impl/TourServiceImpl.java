package com.bikerxnepal.bikerx_nepal.service.impl;

import com.bikerxnepal.bikerx_nepal.entity.Bike;
import com.bikerxnepal.bikerx_nepal.entity.Tour;
import com.bikerxnepal.bikerx_nepal.pojo.TourPojo;
import com.bikerxnepal.bikerx_nepal.repo.TourRepo;
import com.bikerxnepal.bikerx_nepal.service.TourService;
import com.bikerxnepal.bikerx_nepal.utils.ImageToBase64;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TourServiceImpl implements TourService {

    private static final Logger log = LoggerFactory.getLogger(TourServiceImpl.class);


    private final TourRepo tourRepo;

    ImageToBase64 imageToBase64=new ImageToBase64();

    @Override
    public String save(TourPojo tourPojo) throws IOException {
        Tour tour = new Tour();
        if (tourPojo.getImage() != null && !tourPojo.getImage().isEmpty()) {
            Path fileNameAndPath = Paths.get("image_uploads/", tourPojo.getImage().getOriginalFilename());
            Files.write(fileNameAndPath, tourPojo.getImage().getBytes());
            tour.setImage(tourPojo.getImage().getOriginalFilename());
        }
        tour.setTourName(tourPojo.getTourName());
        tour.setTourDescription(tourPojo.getTourDescription());
        tour.setTourItinerary(tourPojo.getTourItinerary());
        tour.setTourMap(tourPojo.getTourMap());
        tour.setTourType(tourPojo.getTourType());
        tour.setStartDate(tourPojo.getStartDate());
        tour.setEndDate(tourPojo.getEndDate());
        tour.setMaxParticipants(tourPojo.getMaxParticipants());
        tour.setTourPrice(tourPojo.getTourPrice());
        tour.setTourRating(tourPojo.getTourRating());
        tourRepo.save(tour);
        return "Tour saved successfully!";
    }



    @Override
    public List<Tour> getAll() {


        return tourRepo.findAll().stream().map(item -> {
            item.setImage(imageToBase64.getImageBase64(item.getImage()));
            return item;
        }).collect(Collectors.toList());


    }



    @Override
    public void deleteById(Long id) throws IOException {
        Optional<Tour> tour = tourRepo.findById(id);
        if (tour.isEmpty()) {
            throw new EntityNotFoundException("Tour not found");
        }
        tourRepo.deleteById(id);
    }



    @Override
    public Optional<Tour> getById(Long id) {
        Optional<Tour> tour = tourRepo.findById(id);

        // If tour is present, convert the image to Base64 format
        if (tour.isPresent()) {
            Tour foundTour = tour.get();
            foundTour.setImage(imageToBase64.getImageBase64(foundTour.getImage()));
        }

        return tour;
    }


    @Override
    public String update(Long id, TourPojo tourPojo) throws IOException {
        Tour existingTour = tourRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tour not found with ID: " + id));

        // Update only if the new values are present, otherwise retain the existing ones
        if (tourPojo.getTourName() != null && !tourPojo.getTourName().isEmpty()) {
            existingTour.setTourName(tourPojo.getTourName());
        }

        if (tourPojo.getTourDescription() != null && !tourPojo.getTourDescription().isEmpty()) {
            existingTour.setTourDescription(tourPojo.getTourDescription());
        }

        if (tourPojo.getTourType() != null && !tourPojo.getTourType().isEmpty()) {
            existingTour.setTourType(tourPojo.getTourType());
        }

        if (tourPojo.getTourMap() != null && !tourPojo.getTourMap().isEmpty()) {
            existingTour.setTourMap(tourPojo.getTourMap());
        }

        if (tourPojo.getTourItinerary() != null && !tourPojo.getTourItinerary().isEmpty()) {
            existingTour.setTourItinerary(tourPojo.getTourItinerary());
        }

        if (tourPojo.getStartDate() != null) {
            existingTour.setStartDate(tourPojo.getStartDate());
        }

        if (tourPojo.getEndDate() != null) {
            existingTour.setEndDate(tourPojo.getEndDate());
        }

        if (tourPojo.getMaxParticipants() > 0) {
            existingTour.setMaxParticipants(tourPojo.getMaxParticipants());
        }

        if (tourPojo.getTourRating() != null) {
            existingTour.setTourRating(tourPojo.getTourRating());
        }

        if (tourPojo.getTourPrice() > 0) {
            existingTour.setTourPrice(tourPojo.getTourPrice());
        }


        // Handle image update if provided
        if (tourPojo.getImage() != null && !tourPojo.getImage().isEmpty()) {
            Path fileNameAndPath = Paths.get("image_uploads", tourPojo.getImage().getOriginalFilename());
            Files.write(fileNameAndPath, tourPojo.getImage().getBytes());
            existingTour.setImage(tourPojo.getImage().getOriginalFilename());
        }

        tourRepo.save(existingTour);
        return "Updated Successfully!";
    }


    @Override
    public List<Tour> getTourByMaxParticipants(int maxParticipants) {
        // Updated logic to include tours with maxParticipants less than or equal to the given maxParticipants
        return tourRepo.findAll().stream()
                .filter(t -> t.getMaxParticipants() <= maxParticipants) // Filter tours based on maxParticipants
                .map(item -> {
                    // Convert image to Base64 format
                    item.setImage(imageToBase64.getImageBase64(item.getImage()));
                    return item;
                })
                .collect(Collectors.toList());
    }



    @Override
    public List<Tour> getByDuration(Date startDate, Date endDate) {
        return tourRepo.findAll().stream()
                .filter(t -> t.getStartDate().after(startDate) && t.getEndDate().before(endDate))
                .collect(Collectors.toList());
    }

    @Override
    public List<Tour> getByTourPrice(double tourPrice) {
        return tourRepo.findAll().stream()
                .filter(t -> t.getTourPrice() <= tourPrice)
                .collect(Collectors.toList());
    }

    @Override
    public List<Tour> getByTourType(String tourType) {
        return tourRepo.findAll().stream()
                .filter(t -> t.getTourType().equalsIgnoreCase(tourType))
                .collect(Collectors.toList());
    }

    @Override
    public List<Tour> getByPriceRange(double minPrice, double maxPrice) {
        return tourRepo.findAll().stream()
                .filter(t -> t.getTourPrice() >= minPrice && t.getTourPrice() <= maxPrice)
                .collect(Collectors.toList());
    }

    @Override
    public List<Tour> searchTours(String tourName, String tourType, Date startDate, Date endDate, Double minPrice, Double maxPrice, Integer maxParticipants) {
        log.info("Searching tours with parameters - Tour Name: {}, Tour Type: {}, Start Date: {}, End Date: {}, Min Price: {}, Max Price: {}, Max Participants: {}",
                tourName, tourType, startDate, endDate, minPrice, maxPrice, maxParticipants);

        List<Tour> tours = tourRepo.searchTours(tourName, tourType, startDate, endDate, minPrice, maxPrice, maxParticipants)
                .stream()
                .map(item -> {
                    item.setImage(imageToBase64.getImageBase64(item.getImage()));
                    return item;
                })
                .collect(Collectors.toList());

        log.info("Found {} tours matching the search criteria.", tours.size());
        return tours;
    }


}
