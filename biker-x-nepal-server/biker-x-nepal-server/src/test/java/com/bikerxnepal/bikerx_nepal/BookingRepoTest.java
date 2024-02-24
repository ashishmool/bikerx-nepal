package com.bikerxnepal.bikerx_nepal;

import com.bikerxnepal.bikerx_nepal.entity.Booking;
import com.bikerxnepal.bikerx_nepal.enums.BookingEnum;
import com.bikerxnepal.bikerx_nepal.repo.BookingRepo;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.Date;
import java.util.List;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class BookingRepoTest {

    @Autowired
    private BookingRepo bookingRepo;

    @Test
    @Order(1)
    @Rollback(value = false)
    public void save() {
        Booking booking = new Booking();
        booking.setPurchaseDate(new Date());
        booking.setTourId(25L); // Assuming tour with ID 1 exists
        booking.setUserId(1L); // Assuming user with ID 1 exists
        booking.setBikeId(8L); // Optional, set as needed
        booking.setQuantityPersons(2); // Assuming 2 persons
        booking.setTotalAmount(2400.2); // Assuming total amount
        booking.setPaymentStatus(BookingEnum.COMPLETED); // Assuming payment status
        booking = bookingRepo.save(booking);
        Assertions.assertThat(booking.getPurchaseId()).isGreaterThan(0);
    }
    @Test
    @Order(2)
    public void getById() {
        Booking booking = bookingRepo.findById(1L).get(); // Assuming booking with ID 1 exists
        Assertions.assertThat(booking.getPurchaseId()).isEqualTo(1L);
    }
}
