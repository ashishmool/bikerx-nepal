package com.bikerxnepal.bikerx_nepal.service;

import com.bikerxnepal.bikerx_nepal.entity.Itinerary;
import com.bikerxnepal.bikerx_nepal.pojo.ItineraryPojo;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface ItineraryService {

    String save(ItineraryPojo itineraryPojo) throws IOException;

    List<Itinerary> getAll();

    void deleteById(Long id) throws IOException;

    Optional<Itinerary> getById(Long id);

    String update(Long id, ItineraryPojo itineraryPojo) throws IOException;

}
