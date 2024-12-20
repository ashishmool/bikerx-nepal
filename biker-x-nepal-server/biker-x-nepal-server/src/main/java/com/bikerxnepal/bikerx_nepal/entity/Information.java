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

    @Column(name = "title", nullable = false, length = 500)
    private String title;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "date", nullable = false)
    private Date date;

}
