package com.bikerxnepal.bikerx_nepal.controller;

import com.bikerxnepal.bikerx_nepal.entity.Tour;
import com.bikerxnepal.bikerx_nepal.pojo.TourPojo;
import com.bikerxnepal.bikerx_nepal.service.TourService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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

    private final TourService tourService;

    @PostMapping(value = "/save")
    public String saveTour(@RequestBody @ModelAttribute TourPojo tourPojo) throws IOException {
        tourService.save(tourPojo);
        return "Saved Successfully!";
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
    public void deleteById(@PathVariable("id") Long id) throws IOException {
        this.tourService.deleteById(id);
    }

    @PutMapping("/update/{id}")
    public String updateTour(@PathVariable("id") Long id, @ModelAttribute @Valid TourPojo tourPojo) throws IOException {
        return tourService.update(id, tourPojo);
    }


    @GetMapping("/getByMaxParticipants/{maxParticipants}")
    public List<Tour> getTourByMaxParticipants(@PathVariable("maxParticipants") int maxParticipants) {
        return tourService.getTourByMaxParticipants(maxParticipants);
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
}
