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
    public String saveBike(@RequestBody @ModelAttribute BikePojo bikePojo) throws IOException {
        return bikeService.save(bikePojo);
    }

    @GetMapping("/getAll")
    public List<Bike> getAll() {
        return this.bikeService.getAll();
    }

    @GetMapping("/getById/{id}")
    public Optional<Bike> getById(@PathVariable("id") Long id) {
        return this.bikeService.getById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable("id") Long id) throws IOException {
        this.bikeService.deleteById(id);
    }

    @PutMapping("/update/{id}")
    public String updateBike(@PathVariable("id") Long id, @ModelAttribute BikePojo bikePojo) throws IOException {
        return this.bikeService.update(id, bikePojo);
    }
}
