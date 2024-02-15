package com.bikerxnepal.bikerx_nepal.service.impl;

import com.bikerxnepal.bikerx_nepal.entity.Testimonial;
import com.bikerxnepal.bikerx_nepal.repo.TestimonialRepo;
import com.bikerxnepal.bikerx_nepal.service.TestimonialService;
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
    public String save(Testimonial testimonial) {
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
