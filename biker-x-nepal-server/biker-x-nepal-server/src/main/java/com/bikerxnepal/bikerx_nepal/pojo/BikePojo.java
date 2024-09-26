package com.bikerxnepal.bikerx_nepal.pojo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BikePojo {

    private Long bikeId;

    private String makeBrand;

    private String model;

    private Integer year;

    private String description;

    private MultipartFile image;

}
