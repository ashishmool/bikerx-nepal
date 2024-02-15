package com.bikerxnepal.bikerx_nepal.entity;

import com.bikerxnepal.bikerx_nepal.enums.BookingEnum;
import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "user_purchased_tour")
@Getter
@Setter
public class UserPurchasedTour {

    @Id
    @SequenceGenerator(name = "user_purchased_tour_seq_gen", sequenceName = "user_purchased_tour_id_seq", allocationSize = 1)
    @GeneratedValue(generator = "user_purchased_tour_seq_gen", strategy = GenerationType.SEQUENCE)
    private Long purchaseId;

    @Column(name = "purchase_date", nullable = false)
    private Date purchaseDate;

    @ManyToOne
    @JoinColumn(name = "tour_id", nullable = false)
    private Tour tour;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private SystemUser user;

    @Column(name = "bike_id")
    private Long bikeId;

    @Column(name = "quantity_persons", nullable = false)
    private Integer quantityPersons;

    @Column(name = "total_amount", nullable = false)
    private Double totalAmount;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", nullable = false)
    private BookingEnum paymentStatus;
}
