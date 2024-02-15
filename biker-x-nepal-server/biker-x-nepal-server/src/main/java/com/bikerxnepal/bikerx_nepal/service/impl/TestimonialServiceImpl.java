package com.bikerxnepal.bikerx_nepal.service.impl;

import com.bikerxnepal.bikerx_nepal.entity.Testimonial;
import com.bikerxnepal.bikerx_nepal.entity.Tour;
import com.bikerxnepal.bikerx_nepal.pojo.TestimonialPojo;
import com.bikerxnepal.bikerx_nepal.repo.TestimonialRepo;
import com.bikerxnepal.bikerx_nepal.service.TestimonialService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TestimonialServiceImpl implements TestimonialService {

    private final TestimonialRepo testimonialRepo;

    @Override
    public String save(TestimonialPojo testimonialPojo) {
        Testimonial testimonial;
        if (testimonialPojo.getTestimonialId() != null) {
            testimonial = testimonialRepo.findById(testimonialPojo.getTestimonialId())
                    .orElseThrow(() -> new EntityNotFoundException("testimonial not found with ID: " + testimonialPojo.getTestimonialId()));
        } else {
            testimonial = new Testimonial();
        }

        testimonial.setTitle(testimonialPojo.getTitle());
        testimonial.setDescription(testimonialPojo.getDescription());
        testimonial.setFullName(testimonialPojo.getFullName());
        testimonial.setDesignation(testimonialPojo.getDesignation());
        testimonial.setCompany(testimonialPojo.getCompany());
        testimonial.setReviewRating(testimonialPojo.getReviewRating());
        // Get the current date
        Date currentDate = new Date();
        testimonial.setDate(currentDate);

        testimonialRepo.save(testimonial);
        return "Saved Successfully!";
    }

    @Override
    public List<Testimonial> getAll() {
        return testimonialRepo.findAll();
    }

    @Override
    public void deleteById(Long id) {
        testimonialRepo.deleteById(id);
    }

    @Override
    public Optional<Testimonial> getById(Long id) {
        return testimonialRepo.findById(id);
    }

    @Override
    public List<Testimonial> getByDate(Date date) {
        return testimonialRepo.findByDate(date);
    }
}
