package com.bikerxnepal.bikerx_nepal;

import com.bikerxnepal.bikerx_nepal.entity.SystemUser;
import com.bikerxnepal.bikerx_nepal.repo.SystemUserRepo;
import com.bikerxnepal.bikerx_nepal.service.SystemUserService;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import lombok.extern.log4j.Log4j2;
import org.junit.Assert;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@Log4j2
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class SystemUserStepDefinitions {

    @Autowired
    private SystemUserService systemUserService;

    @Autowired
    private SystemUserRepo systemUserRepo;

    @Given("getAll SystemUser")
    public void getall_SystemUser() {
        List<SystemUser> allUsers = systemUserService.getAll();
        log.info(allUsers);
        Assert.assertTrue(!allUsers.isEmpty());
    }

    @Given("getById SystemUser")
    public void getbyid_SystemUser() {
        systemUserService.getById(2L);
        System.out.println("User Fetched Successfully!");
    }

    @Given("save SystemUser")
    public void save_SystemUser() {
        // Logic to Save User
    }

    @Given("Verify Id")
    public void verify_Id() {
        // Logic to verify UserById
    }
    @Then("Verify Email")
    public void verify_Email() {
        // Logic to Verify SystemUser by Email
    }

    @Given("get SystemUserEmail")
    public void get_SystemUserEmail() {
        // Write code here that turns the phrase above into concrete actions
        throw new io.cucumber.java.PendingException();
    }


    @Given("Send ResetEmail")
    public void send_ResetEmail() {
        // Write code here that turns the phrase above into concrete actions
        throw new io.cucumber.java.PendingException();
    }
    @Then("Change Password")
    public void change_Password() {
        // Write code here that turns the phrase above into concrete actions
        throw new io.cucumber.java.PendingException();
    }


}
