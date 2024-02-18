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
    public String save(TourPojo tourPojo)  throws IOException {
        Tour tour;

        if (tourPojo.getTourId() != null) {
            tour = tourRepo.findById(tourPojo.getTourId())
                    .orElseThrow(() -> new EntityNotFoundException("Tour not found with ID: " + tourPojo.getTourId()));
        } else {
            tour = new Tour();
        }

        tour.setTourName(tourPojo.getTourName());
        tour.setTourDescription(tourPojo.getTourDescription());
        tour.setTourType(tourPojo.getTourType());
        tour.setTourItinerary(tourPojo.getTourItinerary());
        tour.setStartDate(tourPojo.getStartDate());
        tour.setEndDate(tourPojo.getEndDate());
        tour.setMaxParticipants(tourPojo.getMaxParticipants());
        tour.setTourRating(tourPojo.getTourRating());
        tour.setTourPrice(tourPojo.getTourPrice());
        tour.setTourAvailability(tourPojo.isTourAvailability()); //Boolean to check


        if(tourPojo.getImage()!=null){
            Path fileNameAndPath = Paths.get("image_uploads", tourPojo.getImage().getOriginalFilename());
            Files.write(fileNameAndPath, tourPojo.getImage().getBytes());
        }

        tour.setImage(tourPojo.getImage().getOriginalFilename());

        tourRepo.save(tour);
        return "Saved Successfully!";
    }

    @Override
    public List<Tour> getAll() {

        return tourRepo.findAll().stream().map(item -> {
            item.setImage(imageToBase64.getImageBase64( item.getImage()));
            return item;
        }).collect(Collectors.toList());

    }

    @Override
    public void deleteById(Long id) throws IOException {
        Tour tour= tourRepo.findById(id).get();
        String uploadDir = "image_uploads/"+tour.getImage();
        Path uploadPath = Paths.get(uploadDir);
        Files.deleteIfExists(uploadPath);
        tourRepo.deleteById(id);
    }

    @Override
    public Optional<Tour> getById(Long id) {
        Optional<Tour> tourOptional = tourRepo.findById(id);
        tourOptional.ifPresent(tour -> tour.setImage(imageToBase64.getImageBase64(tour.getImage())));
        return tourOptional;
    }

    @Override
    public String update(Long id, TourPojo tourPojo) throws IOException {
        Tour existingTour = tourRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Course not found with ID: " + id));

        existingTour.setTourName(tourPojo.getTourName());
        existingTour.setTourDescription(tourPojo.getTourDescription());
        existingTour.setTourType(tourPojo.getTourType());
        existingTour.setTourItinerary(tourPojo.getTourItinerary());
        existingTour.setStartDate(tourPojo.getStartDate());
        existingTour.setEndDate(tourPojo.getEndDate());
        existingTour.setMaxParticipants(tourPojo.getMaxParticipants());
        existingTour.setTourRating(tourPojo.getTourRating());
        existingTour.setTourPrice(tourPojo.getTourPrice());
        existingTour.setTourAvailability(tourPojo.isTourAvailability()); // Boolean to check

        if (tourPojo.getImage() != null) {
            Path fileNameAndPath = Paths.get("image_uploads", tourPojo.getImage().getOriginalFilename());
            Files.write(fileNameAndPath, tourPojo.getImage().getBytes());
            existingTour.setImage(tourPojo.getImage().getOriginalFilename());
        }

        tourRepo.save(existingTour);
        return "Updated Successfully!";
    }


    @Override
    public List<Tour> getTourByMaxParticipants(int maxParticipants) {
        return tourRepo.findByMaxParticipantsLessThanEqual(maxParticipants);
    }

    @Override
    public List<Tour> getByDuration(Date startDate, Date endDate) {
        return tourRepo.findByStartDateGreaterThanEqualAndEndDateLessThanEqual(startDate, endDate);
    }

    @Override
    public List<Tour> getByTourPrice(double tourPrice) {
        return tourRepo.findByTourPrice(tourPrice);
    }

    @Override
    public List<Tour> getByTourType(String tourType) {
        return tourRepo.findByTourType(tourType);
    }

    @Override
    public List<Tour> getByPriceRange(double minPrice, double maxPrice) {
        return tourRepo.findByTourPriceBetween(minPrice, maxPrice);
    }
}
