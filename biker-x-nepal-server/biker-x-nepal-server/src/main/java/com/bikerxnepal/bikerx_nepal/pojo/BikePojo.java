package com.bikerxnepal.bikerx_nepal.pojo;

import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BikePojo {

    private Long bikeId;

    private String makeBrand;

    private String model;

    private Integer year;

    private String description;

    @Positive(message = "Bike price must be positive")
    private Double bikePrice;

    private MultipartFile image;

    private int quantityStock;

    private String ownerEmail;

    private String terrain;

}
