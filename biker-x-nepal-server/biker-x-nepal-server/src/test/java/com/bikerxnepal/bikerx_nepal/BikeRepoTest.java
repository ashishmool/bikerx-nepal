package com.bikerxnepal.bikerx_nepal;

import com.bikerxnepal.bikerx_nepal.entity.Bike;
import com.bikerxnepal.bikerx_nepal.pojo.BikePojo;
import com.bikerxnepal.bikerx_nepal.repo.BikeRepo;
import com.bikerxnepal.bikerx_nepal.service.impl.BikeServiceImpl;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class BikeRepoTest {

    @Mock
    private BikeRepo bikeRepo;

    @InjectMocks
    private BikeServiceImpl bikeService; // Assuming you have implemented BikeServiceImpl

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }



    @Test
    @Order(1)
    public void getBikeByIdTest() {
        // Given
        Long id = 1L; // Assuming the bike with ID 1 exists
        Bike bike = new Bike();
        bike.setBikeId(id);
        bike.setMakeBrand("Test Brand");
        bike.setModel("Test Model");
        bike.setYear(2022);
        bike.setDescription("Test Description");

        Mockito.when(bikeRepo.findById(id)).thenReturn(Optional.of(bike));

        // When
        Optional<Bike> result = bikeService.getById(id);

        // Then
        Assertions.assertThat(result).isPresent();
        Assertions.assertThat(result.get().getBikeId()).isEqualTo(id);
    }
    @Test
    @Order(2)
    public void deleteBikeByIdTest() {
        // Given
        Long id = 1L; // Assuming the bike with ID 1 exists

        // When
        try {
            bikeService.deleteById(id);
        } catch (Exception e) {
            e.printStackTrace();
        }

        // Then
        Mockito.verify(bikeRepo, Mockito.times(1)).deleteById(id);
    }

    @Test
    @Order(3)
    public void updateBikeTest() {
        // Given
        Long id = 1L; // Assuming the bike with ID 1 exists

        BikePojo bikePojo = new BikePojo();
        bikePojo.setMakeBrand("Updated Brand");
        bikePojo.setModel("Updated Model");
        bikePojo.setYear(2023);
        bikePojo.setDescription("Updated Description");

        Bike existingBike = new Bike();
        existingBike.setBikeId(id);
        existingBike.setMakeBrand("Test Brand");
        existingBike.setModel("Test Model");
        existingBike.setYear(2022);
        existingBike.setDescription("Test Description");

        Mockito.when(bikeRepo.findById(id)).thenReturn(Optional.of(existingBike));
        Mockito.when(bikeRepo.save(Mockito.any(Bike.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // When
        String result = null;
        try {
            result = bikeService.update(id, bikePojo);
        } catch (Exception e) {
            e.printStackTrace();
        }

        // Then
        Assertions.assertThat(result).isEqualTo("Updated Successfully!");
        Assertions.assertThat(existingBike.getMakeBrand()).isEqualTo("Updated Brand");
        Assertions.assertThat(existingBike.getModel()).isEqualTo("Updated Model");
        Assertions.assertThat(existingBike.getYear()).isEqualTo(2023);
        Assertions.assertThat(existingBike.getDescription()).isEqualTo("Updated Description");
    }



}
