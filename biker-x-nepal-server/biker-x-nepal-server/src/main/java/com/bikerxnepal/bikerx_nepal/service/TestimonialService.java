package com.bikerxnepal.bikerx_nepal.service;

import com.bikerxnepal.bikerx_nepal.entity.Testimonial;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface TestimonialService {

    String save(Testimonial testimonial);

    List<Testimonial> getAll();

    void deleteById(Long id);

    Optional<Testimonial> getById(Long id);

    List<Testimonial> getByDate(Date date);

}
