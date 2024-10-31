package com.bikerxnepal.bikerx_nepal.controller;

import com.bikerxnepal.bikerx_nepal.entity.Information;
import com.bikerxnepal.bikerx_nepal.pojo.InformationPojo;
import com.bikerxnepal.bikerx_nepal.service.InformationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/information")
@RequiredArgsConstructor
public class InformationController {

    private final InformationService informationService;

    @PostMapping(value = "/save")
    public String saveInformation(@RequestBody InformationPojo informationPojo) {
        informationService.save(informationPojo);
        return "Saved Successfully!";
    }

    @PutMapping("/update/{id}")
    public String updateInformation(@PathVariable Long id, @RequestBody InformationPojo informationPojo) {
        return informationService.update(id, informationPojo);
    }

    @GetMapping("/getAll")
    public List<Information> getAll() {
        return informationService.getAll();
    }

    @GetMapping("/getById/{id}")
    public Optional<Information> getById(@PathVariable("id") Long id) {
        return informationService.getById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable("id") Long id) {
        informationService.deleteById(id);
    }

    @GetMapping("/getByDate/{date}")
    public List<Information> getByDate(@PathVariable("date") Date date) {
        return informationService.getByDate(date);
    }
}
