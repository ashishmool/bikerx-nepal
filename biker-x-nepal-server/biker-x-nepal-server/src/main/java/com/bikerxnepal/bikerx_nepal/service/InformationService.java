package com.bikerxnepal.bikerx_nepal.service;

import com.bikerxnepal.bikerx_nepal.entity.Information;
import com.bikerxnepal.bikerx_nepal.pojo.InformationPojo;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface InformationService {

    String save(InformationPojo informationPojo);

    List<Information> getAll();

    void deleteById(Long id);

    Optional<Information> getById(Long id);

    List<Information> getByDate(Date date);

}
