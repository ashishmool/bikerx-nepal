package com.bikerxnepal.bikerx_nepal.service.impl;

import com.bikerxnepal.bikerx_nepal.entity.Bike;
import com.bikerxnepal.bikerx_nepal.pojo.BikePojo;
import com.bikerxnepal.bikerx_nepal.repo.BikeRepo;
import com.bikerxnepal.bikerx_nepal.service.BikeService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BikeServiceImpl implements BikeService {

    private final BikeRepo bikeRepo;


    @Override
    public String save(BikePojo bikePojo) throws IOException {
        Bike bike = new Bike();
        bike.setMakeBrand(bikePojo.getMakeBrand());
        bike.setModel(bikePojo.getModel());
        bike.setYear(bikePojo.getYear());
        bike.setDescription(bikePojo.getDescription());

        if (bikePojo.getImage() != null) {
            String fileName = saveImage(bikePojo.getImage());
            bike.setImage(fileName);
        }

        bikeRepo.save(bike);
        return "Saved Successfully!";
    }

    private String saveImage(MultipartFile image) throws IOException {
        String uploadDir = "image_uploads";
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        String fileName = image.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(image.getInputStream(), filePath);
        return fileName;
    }

    @Override
    public List<Bike> getAll() {
        return bikeRepo.findAll();
    }

    @Override
    public void deleteById(Long id) {
        bikeRepo.deleteById(id);
    }

    @Override
    public Optional<Bike> getById(Long id) {
        return bikeRepo.findById(id);
    }

    @Override
    public String update(Long id, BikePojo bikePojo) throws IOException {
        Bike existingBike = bikeRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Bike not found with ID: " + id));

        existingBike.setMakeBrand(bikePojo.getMakeBrand());
        existingBike.setModel(bikePojo.getModel());
        existingBike.setYear(bikePojo.getYear());
        existingBike.setDescription(bikePojo.getDescription());

        if (bikePojo.getImage() != null) {
            String fileName = saveImage(bikePojo.getImage());
            existingBike.setImage(fileName);
        }

        bikeRepo.save(existingBike);
        return "Updated Successfully!";
    }
}
