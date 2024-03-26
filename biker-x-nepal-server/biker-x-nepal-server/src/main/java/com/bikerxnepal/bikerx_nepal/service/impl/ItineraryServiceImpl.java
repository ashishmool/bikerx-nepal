package com.bikerxnepal.bikerx_nepal.service.impl;

import com.bikerxnepal.bikerx_nepal.entity.Itinerary;
import com.bikerxnepal.bikerx_nepal.entity.Tour;
import com.bikerxnepal.bikerx_nepal.pojo.ItineraryPojo;
import com.bikerxnepal.bikerx_nepal.repo.ItineraryRepo;
import com.bikerxnepal.bikerx_nepal.service.ItineraryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ItineraryServiceImpl implements ItineraryService {

    private final ItineraryRepo itineraryRepo;

    @Override
    public String save(ItineraryPojo itineraryPojo) throws IOException {
        Itinerary itinerary = new Itinerary();
        Tour tour = new Tour();
        tour.setTourId(itineraryPojo.getTourId()); // Retrieve tourId in TourPojo

        // Itinerary entity has a field named 'tour' of type 'Tour' for the one-to-one relationship
        itinerary.setTour(tour);
        itinerary.setNoOfDays(itineraryPojo.getNoOfDays());
        itinerary.setDescription(itineraryPojo.getDescription());
        itineraryRepo.save(itinerary);
        return "Saved Successfully!";
    }


    @Override
    public List<Itinerary> getAll() {
        return itineraryRepo.findAll();
    }

    @Override
    public void deleteById(Long id) throws IOException {
        itineraryRepo.deleteById(id);
    }

    @Override
    public Optional<Itinerary> getById(Long id) {
        return itineraryRepo.findById(id);
    }

    @Override
    public String update(Long id, ItineraryPojo itineraryPojo) throws IOException {
        Optional<Itinerary> existingItineraryOptional = itineraryRepo.findById(id);
        if (existingItineraryOptional.isPresent()) {
            Itinerary existingItinerary = existingItineraryOptional.get();

            existingItinerary.setNoOfDays(itineraryPojo.getNoOfDays());
            existingItinerary.setDescription(itineraryPojo.getDescription());
            itineraryRepo.save(existingItinerary);
            return "Updated Successfully!";
        }
        return "Itinerary not found with ID: " + id;
    }
}
