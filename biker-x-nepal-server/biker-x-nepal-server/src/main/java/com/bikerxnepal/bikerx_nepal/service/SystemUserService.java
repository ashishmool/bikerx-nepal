package com.bikerxnepal.bikerx_nepal.service;

import com.bikerxnepal.bikerx_nepal.entity.SystemUser;
import com.bikerxnepal.bikerx_nepal.pojo.NewPasswordPojo;
import com.bikerxnepal.bikerx_nepal.pojo.SystemUserPojo;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface SystemUserService {

    String save(SystemUserPojo systemUserPojo);

    List<SystemUser> getAll();

    Optional<SystemUser> getByEmail(String email);

    void deleteById(Long id);

    Optional<SystemUser> getById(Long id);

    String update(Long id, SystemUserPojo systemUserPojo);

    List<Map<String, Object>> getAllStudentsWithoutPassword();

    String setNewPassword(NewPasswordPojo newPasswordPojo);

}
