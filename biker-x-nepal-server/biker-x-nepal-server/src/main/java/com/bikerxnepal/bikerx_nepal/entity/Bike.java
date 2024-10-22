package com.bikerxnepal.bikerx_nepal.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "bikes")
@Getter
@Setter
public class Bike {

    @Id
    @SequenceGenerator(name = "bikes_seq_gen", sequenceName = "bikes_id_seq", allocationSize = 1)
    @GeneratedValue(generator = "bikes_seq_gen", strategy = GenerationType.SEQUENCE)
    @Column(name = "bike_id")
    private Long bikeId;

    @Column(name = "make_brand", nullable = false)
    private String makeBrand;

    @Column(name = "model", nullable = false)
    private String model;

    @Column(name = "year", nullable = false)
    private int year;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "terrain", nullable = true)
    private String terrain;  // New field for Bike Terrain

    @Column(name = "bike_price", nullable = false)
    private Double bikePrice;

    @Column(name = "image", nullable = true)
    private String image;

    @Column(name = "quantity_stock", nullable = false)
    private int quantityStock;  // New field for stock quantity

    @Column(name = "owner_email", nullable = false)
    private String ownerEmail;  // New field for owner's email


}
