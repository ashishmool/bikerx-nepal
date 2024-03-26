package com.bikerxnepal.bikerx_nepal.pojo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItineraryPojo {

    private Long itineraryId;

    private Long tourId;

    private Integer noOfDays;

    private String description;

}
