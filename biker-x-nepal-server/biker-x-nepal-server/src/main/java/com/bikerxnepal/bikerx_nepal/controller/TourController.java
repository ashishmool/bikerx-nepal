package com.bikerxnepal.bikerx_nepal.controller;

import com.bikerxnepal.bikerx_nepal.entity.Tour;
import com.bikerxnepal.bikerx_nepal.pojo.TourPojo;
import com.bikerxnepal.bikerx_nepal.service.TourService;
import com.bikerxnepal.bikerx_nepal.service.impl.TourServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tour")
@RequiredArgsConstructor
public class TourController {

    private static final Logger log = LoggerFactory.getLogger(TourServiceImpl.class);


    private final TourService tourService;

    @PostMapping("/save")
    public String saveTour(@ModelAttribute @Valid TourPojo tourPojo) throws IOException {
        tourService.save(tourPojo);
        return "Tour saved successfully!";
    }

    @PutMapping("/update/{id}")
    public String updateTour(@PathVariable("id") Long id, @ModelAttribute TourPojo tourPojo) throws IOException {
        return tourService.update(id, tourPojo);
    }

    @GetMapping("/getAll")
    public List<Tour> getAll() {
        return this.tourService.getAll();
    }

    @GetMapping("/getById/{id}")
    public Optional<Tour> getById(@PathVariable("id") Long id) {
        return this.tourService.getById(id);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteById(@PathVariable("id") Long id) throws IOException {
        tourService.deleteById(id);
        return "Tour deleted successfully!";
    }


    @GetMapping("/getByMaxParticipants/{maxParticipants}")
    public List<Tour> getTourByMaxParticipants(@PathVariable("maxParticipants") int maxParticipants) {
        log.info("Fetching tours with a maximum of {} participants.", maxParticipants);
        List<Tour> tours = tourService.getTourByMaxParticipants(maxParticipants);
        log.info("Returning {} tours that have up to {} participants.", tours.size(), maxParticipants);
        return tours;
    }


    @GetMapping("/getByDuration")
    public List<Tour> getByDuration(@RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
                                    @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        return tourService.getByDuration(startDate, endDate);
    }

    @GetMapping("/getByTourPrice/{tourPrice}")
    public List<Tour> getByTourPrice(@PathVariable("tourPrice") double tourPrice) {
        return tourService.getByTourPrice(tourPrice);
    }

    @GetMapping("/getByTourType/{tourType}")
    public List<Tour> getByTourType(@PathVariable("tourType") String tourType) {
        return tourService.getByTourType(tourType);
    }

    @GetMapping("/getByPriceRange")
    public List<Tour> getByPriceRange(@RequestParam("minPrice") double minPrice,
                                      @RequestParam("maxPrice") double maxPrice) {
        return tourService.getByPriceRange(minPrice, maxPrice);
    }

    @GetMapping("/search/")
    public List<Tour> searchTours(@RequestParam(required = false) String tourName,
                                  @RequestParam(required = false) String tourType,
                                  @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
                                  @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate,
                                  @RequestParam(required = false) Double minPrice,
                                  @RequestParam(required = false) Double maxPrice,
                                  @RequestParam(required = false) Integer maxParticipants) {
        log.info("Received search request with parameters - Tour Name: {}, Tour Type: {}, Start Date: {}, End Date: {}, Min Price: {}, Max Price: {}, Max Participants: {}",
                tourName, tourType, startDate, endDate, minPrice, maxPrice, maxParticipants);

        List<Tour> tours = tourService.searchTours(tourName, tourType, startDate, endDate, minPrice, maxPrice, maxParticipants);

        log.info("Returning {} tours from search request.", tours.size());
        return tours;
    }

}
