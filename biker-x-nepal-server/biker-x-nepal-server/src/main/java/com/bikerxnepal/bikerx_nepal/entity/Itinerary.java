package com.bikerxnepal.bikerx_nepal.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "itineraries")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Itinerary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itineraryId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tour_id")
    @JsonIgnore
    private Tour tour;

    @Column(name = "no_of_days", nullable = false)
    private Integer noOfDays;

    @Column(name = "description", nullable = false)
    private String description;

}
