package com.bikerxnepal.bikerx_nepal.controller;

import com.bikerxnepal.bikerx_nepal.entity.Testimonial;
import com.bikerxnepal.bikerx_nepal.service.TestimonialService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/testimonial")
@RequiredArgsConstructor
public class TestimonialController {

    private final TestimonialService testimonialService;

    @PostMapping(value = "/save")
    public String saveTestimonial(@RequestBody Testimonial testimonial) {
        testimonialService.save(testimonial);
        return "Saved Successfully!";
    }

    @GetMapping("/getAll")
    public List<Testimonial> getAll() {
        return testimonialService.getAll();
    }

    @GetMapping("/getById/{id}")
    public Optional<Testimonial> getById(@PathVariable("id") Long id) {
        return testimonialService.getById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable("id") Long id) {
        testimonialService.deleteById(id);
    }

    @GetMapping("/getByDate/{date}")
    public List<Testimonial> getByDate(@PathVariable("date") Date date) {
        return testimonialService.getByDate(date);
    }
}
