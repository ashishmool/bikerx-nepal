package com.bikerxnepal.bikerx_nepal.repo;

import com.bikerxnepal.bikerx_nepal.entity.Testimonial;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface TestimonialRepo extends JpaRepository<Testimonial, Long> {

    List<Testimonial> findByDate(Date date);

}
