package com.bikerxnepal.bikerx_nepal.controller;

import com.bikerxnepal.bikerx_nepal.entity.Itinerary;
import com.bikerxnepal.bikerx_nepal.pojo.ItineraryPojo;
import com.bikerxnepal.bikerx_nepal.service.ItineraryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/itinerary")
@RequiredArgsConstructor
public class ItineraryController {

    private final ItineraryService itineraryService;

    @PostMapping("/save")
    public ResponseEntity<String> saveItinerary(@RequestBody ItineraryPojo itineraryPojo) {
        try {
            String result = itineraryService.save(itineraryPojo);
            return ResponseEntity.ok(result);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save itinerary!");
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateItinerary(@PathVariable Long id, @RequestBody ItineraryPojo itineraryPojo) {
        try {
            String result = itineraryService.update(id, itineraryPojo);
            return ResponseEntity.ok(result);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update itinerary!");
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Itinerary>> getAll() {
        List<Itinerary> itineraries = itineraryService.getAll();
        return ResponseEntity.ok(itineraries);
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<Itinerary> getById(@PathVariable Long id) {
        Optional<Itinerary> itinerary = itineraryService.getById(id);
        return itinerary.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        try {
            itineraryService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/getByTourId/{tourId}")
    public ResponseEntity<Itinerary> getByTourId(@PathVariable Long tourId) {
        Optional<Itinerary> itinerary = itineraryService.getByTourId(tourId);
        return itinerary.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

}
