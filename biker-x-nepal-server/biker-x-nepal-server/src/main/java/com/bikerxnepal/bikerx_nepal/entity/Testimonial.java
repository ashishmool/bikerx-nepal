package com.bikerxnepal.bikerx_nepal.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "testimonials")
@Getter
@Setter
public class Testimonial {

    @Id
    @SequenceGenerator(name = "testimonials_seq_gen", sequenceName = "testimonials_id_seq", allocationSize = 1)
    @GeneratedValue(generator = "testimonials_seq_gen", strategy = GenerationType.SEQUENCE)
    private Long testimonialId;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "designation", nullable = false)
    private String designation;

    @Column(name = "company", nullable = false)
    private String company;

    @Column(name = "review_rating", nullable = false)
    private Integer reviewRating;

}
