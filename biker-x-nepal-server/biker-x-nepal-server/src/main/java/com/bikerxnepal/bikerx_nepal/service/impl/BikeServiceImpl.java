package com.bikerxnepal.bikerx_nepal.service.impl;

import com.bikerxnepal.bikerx_nepal.entity.Bike;
import com.bikerxnepal.bikerx_nepal.pojo.BikePojo;
import com.bikerxnepal.bikerx_nepal.repo.BikeRepo;
import com.bikerxnepal.bikerx_nepal.service.BikeService;
import com.bikerxnepal.bikerx_nepal.utils.ImageToBase64;
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
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BikeServiceImpl implements BikeService {

    private final BikeRepo bikeRepo;

    ImageToBase64 imageToBase64=new ImageToBase64();

    @Override
    public String save(BikePojo bikePojo) throws IOException {
        // Validate mandatory fields
        if (bikePojo.getMakeBrand() == null || bikePojo.getMakeBrand().isEmpty()) {
            throw new IllegalArgumentException("Make/Brand cannot be null or empty");
        }
        if (bikePojo.getModel() == null || bikePojo.getModel().isEmpty()) {
            throw new IllegalArgumentException("Model cannot be null or empty");
        }
        if (bikePojo.getDescription() == null || bikePojo.getDescription().isEmpty()) {
            throw new IllegalArgumentException("Description cannot be null or empty");
        }
        if (bikePojo.getOwnerEmail() == null || bikePojo.getOwnerEmail().isEmpty()) {
            throw new IllegalArgumentException("Owner email cannot be null or empty");
        }

        // Create Bike entity
        Bike bike = new Bike();
        bike.setMakeBrand(bikePojo.getMakeBrand());
        bike.setModel(bikePojo.getModel());
        bike.setYear(bikePojo.getYear());
        bike.setBikePrice(bikePojo.getBikePrice());
        bike.setDescription(bikePojo.getDescription());
        bike.setQuantityStock(bikePojo.getQuantityStock());
        bike.setOwnerEmail(bikePojo.getOwnerEmail());
        bike.setTerrain(bikePojo.getTerrain());

        // Handle image upload if present
        if (bikePojo.getImage() != null && !bikePojo.getImage().isEmpty()) {
            String fileName = saveImage(bikePojo.getImage());
            bike.setImage(fileName);
        }

        // Save bike entity to the database
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


        return bikeRepo.findAll().stream().map(item -> {
            item.setImage(imageToBase64.getImageBase64(item.getImage()));
            return item;
        }).collect(Collectors.toList());


    }

    @Override
    public void deleteById(Long id) throws IOException {
        Bike bike= bikeRepo.findById(id).get();
        String uploadDir = "image_uploads/"+bike.getImage();
        Path uploadPath = Paths.get(uploadDir);
        Files.deleteIfExists(uploadPath);

        bikeRepo.deleteById(id);
    }


    @Override
    public Optional<Bike> getById(Long id) {
        return bikeRepo.findById(id);
    }

    @Override
    public List<Bike> getByBikePrice(double bikePrice) {
        return null;
    }

    @Override
    public String update(Long id, BikePojo bikePojo) throws IOException {
        // Fetch the existing bike from the repository
        Bike existingBike = bikeRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Bike not found with ID: " + id));

        // Update fields with new values or retain existing ones if not provided
        existingBike.setMakeBrand(bikePojo.getMakeBrand() != null ? bikePojo.getMakeBrand() : existingBike.getMakeBrand());
        existingBike.setModel(bikePojo.getModel() != null ? bikePojo.getModel() : existingBike.getModel());
        existingBike.setYear(bikePojo.getYear() != 0 ? bikePojo.getYear() : existingBike.getYear());
        existingBike.setDescription(bikePojo.getDescription() != null ? bikePojo.getDescription() : existingBike.getDescription());
        existingBike.setBikePrice(bikePojo.getBikePrice() != null ? bikePojo.getBikePrice() : existingBike.getBikePrice());
        existingBike.setQuantityStock(bikePojo.getQuantityStock() != 0 ? bikePojo.getQuantityStock() : existingBike.getQuantityStock());
        existingBike.setOwnerEmail(bikePojo.getOwnerEmail() != null ? bikePojo.getOwnerEmail() : existingBike.getOwnerEmail());
        existingBike.setTerrain(bikePojo.getTerrain() != null ? bikePojo.getTerrain() : existingBike.getTerrain());

        // Handle image update
        if (bikePojo.getImage() != null && !bikePojo.getImage().isEmpty()) {
            // Construct the path for the existing image
            String existingImageFileName = existingBike.getImage();
            String uploadDir = "image_uploads";
            Path uploadPath = Paths.get(uploadDir, existingImageFileName);

            // Delete the old image if it exists
            Files.deleteIfExists(uploadPath);

            // Save the new image and update the bike entity
            String newFileName = saveImage(bikePojo.getImage());
            existingBike.setImage(newFileName);
        }

        // Save the updated bike entity back to the repository
        bikeRepo.save(existingBike);
        return "Updated Successfully!";
    }



}
