package com.bikerxnepal.bikerx_nepal.service.impl;

import com.bikerxnepal.bikerx_nepal.entity.Information;
import com.bikerxnepal.bikerx_nepal.pojo.InformationPojo;
import com.bikerxnepal.bikerx_nepal.repo.InformationRepo;
import com.bikerxnepal.bikerx_nepal.service.InformationService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InformationServiceImpl implements InformationService {

    private final InformationRepo informationRepo;

    @Override
    public String save(InformationPojo informationPojo) {
        Information information;
        if (informationPojo.getInformationId() != null) {
            information = informationRepo.findById(informationPojo.getInformationId())
                    .orElseThrow(() -> new EntityNotFoundException("information not found with ID: " + informationPojo.getInformationId()));
        } else {
            information = new Information();
        }

        information.setTitle(informationPojo.getTitle());
        information.setDescription(informationPojo.getDescription());

        // Get the current date
        Date currentDate = new Date();
        information.setDate(currentDate);

        informationRepo.save(information);
        return "Saved Successfully!";
    }


    @Override
    public String update(Long id, InformationPojo informationPojo) {
        Information information = informationRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Information not found with ID: " + id));

        information.setTitle(informationPojo.getTitle());
        information.setDescription(informationPojo.getDescription());
        information.setDate(new Date());  // Update with current date

        informationRepo.save(information);
        return "Updated Successfully!";
    }

    @Override
    public List<Information> getAll() {
        return informationRepo.findAll();
    }

    @Override
    public void deleteById(Long id) {
        informationRepo.deleteById(id);
    }

    @Override
    public Optional<Information> getById(Long id) {
        return informationRepo.findById(id);
    }

    @Override
    public List<Information> getByDate(Date date) {
        return informationRepo.findByDate(date);
    }
}
