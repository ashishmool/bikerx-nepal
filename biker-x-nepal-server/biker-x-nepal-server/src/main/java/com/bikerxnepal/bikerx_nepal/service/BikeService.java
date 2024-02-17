package com.bikerxnepal.bikerx_nepal.service;

import com.bikerxnepal.bikerx_nepal.entity.Bike;
import com.bikerxnepal.bikerx_nepal.pojo.BikePojo;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface BikeService {

    String save(BikePojo bikePojo) throws IOException;

    List<Bike> getAll();

    void deleteById(Long id) throws IOException;

    Optional<Bike> getById(Long id);

    String update(Long id, BikePojo bikePojo) throws IOException;

}
