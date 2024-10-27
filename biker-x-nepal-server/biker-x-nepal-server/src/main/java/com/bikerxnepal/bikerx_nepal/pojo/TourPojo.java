package com.bikerxnepal.bikerx_nepal.pojo;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TourPojo {

    private Long tourId;

    @NotBlank(message = "Tour name is required")
    private String tourName;

    @NotBlank(message = "Tour description is required")
    private String tourDescription;

    private String tourMap;

    @NotBlank(message = "Tour type is required")
    private String tourType;

    private String tourItinerary;

    @NotNull(message = "Start date is required")
    @FutureOrPresent(message = "Start date cannot be in the past")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date startDate;

    @NotNull(message = "End date is required")
    @Future(message = "End date must be in the future")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date endDate;

    @Min(value = 1, message = "Minimum participants must be at least 1")
    private int maxParticipants;

    @Min(value = 1, message = "Tour rating must be at least 1")
    @Max(value = 5, message = "Tour rating cannot be more than 5")
    private Double tourRating;

    @Min(value = 1, message = "Comfort rating must be at least 1")
    @Max(value = 5, message = "Comfort rating cannot be more than 5")
    private Double comfortRating;

    @Positive(message = "Tour price must be positive")
    private double tourPrice;

    private MultipartFile image; // Add custom validators if needed
}
