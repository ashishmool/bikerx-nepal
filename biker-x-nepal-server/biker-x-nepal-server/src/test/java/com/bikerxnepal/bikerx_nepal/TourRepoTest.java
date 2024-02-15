
package com.bikerxnepal.bikerx_nepal;


import com.bikerxnepal.bikerx_nepal.entity.Tour;
import com.bikerxnepal.bikerx_nepal.repo.TourRepo;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class TourRepoTest {

    @Autowired
    private TourRepo tourRepo;

    @Test
    @Order(1)
    @Rollback(value = false)
    public void save() throws ParseException {
        Tour tour = new Tour();

        tour.setTourName("Tour Name For Test");
        tour.setTourDescription("Tour Description");
        tour.setTourType("Tour Type");
        tour.setTourItinerary("Day 1");
        tour.setStartDate(new SimpleDateFormat("dd/MM/yyyy").parse("02/01/2024"));
        tour.setEndDate(new SimpleDateFormat("dd/MM/yyyy").parse("02/01/2025"));
        tour.setMaxParticipants(10);
        tour.setTourRating(3L);
        tour.setTourPrice(1200.1);
        tour.setTourAvailability(true);

        tour=tourRepo.save(tour);

        Assertions.assertThat(tour.getTourId()).isGreaterThan(0);

    }

    @Test
    @Order(2)
    public  void getById(){
        Tour tour= tourRepo.findById(1L).get();
        Assertions.assertThat(tour.getTourId()).isEqualTo(1L);
    }

    @Test
    @Order(3)
    public void testDuration() throws ParseException {
        Date startDate=new SimpleDateFormat("dd/MM/yyyy").parse("02/01/2024");
        Date endDate=new SimpleDateFormat("dd/MM/yyyy").parse("02/01/2025");
        List<Tour> tourList = tourRepo.findByStartDateGreaterThanEqualAndEndDateLessThanEqual(startDate, endDate);
        Assertions.assertThat(tourList.size()).isGreaterThan(0);
    }

}

