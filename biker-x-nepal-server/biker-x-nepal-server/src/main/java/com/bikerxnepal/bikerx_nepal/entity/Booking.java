package com.bikerxnepal.bikerx_nepal.entity;

import com.bikerxnepal.bikerx_nepal.enums.BookingEnum;
import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "bookings")
@Getter
@Setter
public class Booking {

    @Id
    @SequenceGenerator(name = "booking_seq_gen", sequenceName = "booking_id_seq", allocationSize = 1)
    @GeneratedValue(generator = "booking_seq_gen", strategy = GenerationType.SEQUENCE)
    private Long purchaseId;

    @Column(name = "purchase_date", nullable = false)
    private Date purchaseDate;

    @Column(name = "tour_id", nullable = false)
    private Long tourId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "quantity_persons", nullable = false)
    private Integer quantityPersons;

    @Column(name = "total_amount", nullable = false)
    private Double totalAmount;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", nullable = false)
    private BookingEnum paymentStatus;

    // List of chosen bike IDs
    @ElementCollection
    @CollectionTable(name = "booking_bikes", joinColumns = @JoinColumn(name = "purchase_id"))
    @Column(name = "bike_id")
    private List<Long> bikeIds;

    // Derived duration attribute
    @Transient
    private Long duration;

    // Start and end date for calculating the duration
    @Column(name = "start_date", nullable = false)
    private Date startDate;

    @Column(name = "end_date", nullable = false)
    private Date endDate;

    // Calculate duration based on startDate and endDate
    public Long getDuration() {
        if (startDate != null && endDate != null) {
            long diffInMillies = endDate.getTime() - startDate.getTime();
            return diffInMillies / (1000 * 60 * 60 * 24); // Convert milliseconds to days
        }
        return null;
    }
}

