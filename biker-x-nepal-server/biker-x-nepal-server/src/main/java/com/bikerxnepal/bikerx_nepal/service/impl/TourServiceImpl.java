package com.bikerxnepal.bikerx_nepal.service.impl;

import com.bikerxnepal.bikerx_nepal.entity.Bike;
import com.bikerxnepal.bikerx_nepal.entity.Tour;
import com.bikerxnepal.bikerx_nepal.pojo.TourPojo;
import com.bikerxnepal.bikerx_nepal.repo.TourRepo;
import com.bikerxnepal.bikerx_nepal.service.TourService;
import com.bikerxnepal.bikerx_nepal.utils.ImageToBase64;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
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

    private final TourRepo tourRepo;

    ImageToBase64 imageToBase64=new ImageToBase64();

    @Override
    public String save(TourPojo tourPojo) throws IOException {
        Tour tour = new Tour();
        if (tourPojo.getImage() != null && !tourPojo.getImage().isEmpty()) {
            Path fileNameAndPath = Paths.get("uploads/", tourPojo.getImage().getOriginalFilename());
            Files.write(fileNameAndPath, tourPojo.getImage().getBytes());
            tour.setImage(tourPojo.getImage().getOriginalFilename());
        }
        tour.setTourName(tourPojo.getTourName());
        tour.setTourDescription(tourPojo.getTourDescription());
        tour.setTourType(tourPojo.getTourType());
        tour.setStartDate(tourPojo.getStartDate());
        tour.setEndDate(tourPojo.getEndDate());
        tour.setMaxParticipants(tourPojo.getMaxParticipants());
        tour.setTourPrice(tourPojo.getTourPrice());
        tour.setTourAvailability(true); // Default availability is true
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

        existingTour.setTourAvailability(tourPojo.isTourAvailability());

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
        return tourRepo.findAll().stream()
                .filter(t -> t.getMaxParticipants() <= maxParticipants)
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
}
