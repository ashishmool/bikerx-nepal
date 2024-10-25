package com.bikerxnepal.bikerx_nepal.pojo;

import com.bikerxnepal.bikerx_nepal.enums.BookingEnum;
import lombok.Getter;
import lombok.Setter;

import jakarta.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class BookingPojo {

    private Long purchaseId;

    @NotNull(message = "Purchase date is required")
    private Date purchaseDate;

    @NotNull(message = "Tour is required")
    private Long tourId;

    @NotNull(message = "User is required")
    private Long userId;

    // List of chosen bike IDs
    private List<Long> bikeIds;

    @NotNull(message = "Quantity of persons is required")
    private Integer quantityPersons;

    private Double totalAmount;

    @NotNull(message = "Payment status is required")
    private BookingEnum paymentStatus;

    // Dates for calculating duration
    @NotNull(message = "Start date is required")
    private Date startDate;

    @NotNull(message = "End date is required")
    private Date endDate;

    // Optionally include derived duration in Pojo (optional)
    private Long duration;

    private String userEmail; // Add this field


    // Getters and Setters
    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

}
