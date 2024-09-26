package com.bikerxnepal.bikerx_nepal.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "tours")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Tour {

    @Id
    @SequenceGenerator(name = "tours_seq_gen", sequenceName = "tours_id_seq", allocationSize = 1)
    @GeneratedValue(generator = "tours_seq_gen", strategy = GenerationType.SEQUENCE)
    private Long tourId;

    @Column(name = "tour_name", nullable = false)
    private String tourName;

    @Column(name = "description", nullable = false)
    private String tourDescription;

    @Column(name = "type", nullable = false)
    private String tourType;

    @Column(name = "itinerary", nullable = true)
    private String tourItinerary;

    @Column(name = "start_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date startDate;

    @Column(name = "end_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date endDate;

    @Column(name = "max_participants", nullable = false)
    private Integer maxParticipants;

    @Column(name = "rating")
    private Long tourRating;

    @Column(name = "tour_price", nullable = false)
    private Double tourPrice;

    @Column(name = "availability", nullable = false)
    private Boolean tourAvailability;

    private String image;

    @OneToOne(mappedBy = "tour", cascade = CascadeType.ALL)
    private Itinerary itinerary; // Assuming Itinerary is another entity
}
