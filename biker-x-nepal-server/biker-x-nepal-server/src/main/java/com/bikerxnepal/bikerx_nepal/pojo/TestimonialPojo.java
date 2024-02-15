package com.bikerxnepal.bikerx_nepal.pojo;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TestimonialPojo {

    private Long testimonialId;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Date is required")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date date;

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Designation is required")
    private String designation;

    @NotBlank(message = "Company is required")
    private String company;

    @NotNull(message = "Rating is required")
    private Integer reviewRating;


}
