package com.bikerxnepal.bikerx_nepal.pojo;

import com.bikerxnepal.bikerx_nepal.entity.SystemUser;
import com.bikerxnepal.bikerx_nepal.entity.Tour;
import com.bikerxnepal.bikerx_nepal.enums.BookingEnum;
import lombok.Getter;
import lombok.Setter;

import jakarta.validation.constraints.NotNull;
import java.util.Date;

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

    private Long bikeId;

    @NotNull(message = "Quantity of persons is required")
    private Integer quantityPersons;

    private Double totalAmount;

    @NotNull(message = "Payment status is required")
    private BookingEnum paymentStatus;
}
