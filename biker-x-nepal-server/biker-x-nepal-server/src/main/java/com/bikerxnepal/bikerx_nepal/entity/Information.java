package com.bikerxnepal.bikerx_nepal.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "informations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Information {

    @Id
    @SequenceGenerator(name = "informations_seq_gen", sequenceName = "informations_id_seq", allocationSize = 1)
    @GeneratedValue(generator = "informations_seq_gen", strategy = GenerationType.SEQUENCE)
    private Long informationId;

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
