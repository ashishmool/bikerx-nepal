package com.bikerxnepal.bikerx_nepal.controller;

import com.bikerxnepal.bikerx_nepal.entity.Bike;
import com.bikerxnepal.bikerx_nepal.pojo.BikePojo;
import com.bikerxnepal.bikerx_nepal.service.BikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/bike")
@RequiredArgsConstructor
public class BikeController {

    private final BikeService bikeService;

    @PostMapping("/save")
    public String saveBike(@ModelAttribute BikePojo bikePojo) throws IOException {
        return bikeService.save(bikePojo);
    }

    @GetMapping("/getAll")
    public List<Bike> getAll() {
        return bikeService.getAll();
    }

    @GetMapping("/getById/{id}")
    public Optional<Bike> getById(@PathVariable("id") Long id) {
        return bikeService.getById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable("id") Long id) {
        bikeService.deleteById(id);
    }

    @PutMapping("/update/{id}")
    public String updateBike(@PathVariable("id") Long id, @ModelAttribute BikePojo bikePojo) throws IOException {
        return bikeService.update(id, bikePojo);
    }
}
