package com.bikerxnepal.bikerx_nepal.service.impl;


import com.bikerxnepal.bikerx_nepal.entity.Booking;
import com.bikerxnepal.bikerx_nepal.entity.SystemUser;
import com.bikerxnepal.bikerx_nepal.pojo.EmailRequest;
import com.bikerxnepal.bikerx_nepal.repo.SystemUserRepo;
import com.bikerxnepal.bikerx_nepal.security.JwtService;
import com.bikerxnepal.bikerx_nepal.service.EmailService;
import freemarker.template.Configuration;
import freemarker.template.Template;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender getJavaMailSender;
    private final ThreadPoolTaskExecutor taskExecutor;
    private final SystemUserRepo systemUserRepo;
    private final JwtService jwtService;

    @Autowired
    @Qualifier("emailConfigBean")
    private Configuration emailConfig;


    @Override
    public void resetPassword(EmailRequest emailRequest) {
        try {

            SystemUser systemUser=systemUserRepo.findByEmail(emailRequest.getSendToEmail()).get();

            systemUserRepo.save(systemUser);

            String jwt= jwtService.generateToken(systemUser);


            Map<String, String> model = new HashMap<>();

            MimeMessage message = getJavaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());

            model.put("email", emailRequest.getSendToEmail());
            model.put("url", "http://localhost:5173/reset-password?token="+jwt);

            Template template = emailConfig.getTemplate("resetPassword.ftl");
            String html = FreeMarkerTemplateUtils.processTemplateIntoString(template, model);

            mimeMessageHelper.setTo(emailRequest.getSendToEmail());
            mimeMessageHelper.setFrom("bikerxnepal@gmail.com");
            mimeMessageHelper.setText(html, true);
            mimeMessageHelper.setSubject("Reset password");

            taskExecutor.execute(new Thread() {
                public void run() {
                    getJavaMailSender.send(message);
                }
            });
        } catch (Exception e) {

            e.printStackTrace();
        }
    }

    @Override
    public void sendBookingConfirmation(Booking booking, String userEmail) {
        try {
            Map<String, Object> model = new HashMap<>();

            // Populate the model with booking details
            model.put("purchaseId", booking.getPurchaseId());
            model.put("tourId", booking.getTourId());
            model.put("userId", booking.getUserId());
            model.put("totalAmount", booking.getTotalAmount());
            model.put("paymentStatus", booking.getPaymentStatus().toString());
            model.put("startDate", booking.getStartDate());
            model.put("endDate", booking.getEndDate());
            model.put("quantityPersons", booking.getQuantityPersons());
            model.put("bikeIds", booking.getBikeIds());

            MimeMessage message = getJavaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());

            Template template = emailConfig.getTemplate("bookingConfirmation.ftl");
            String html = FreeMarkerTemplateUtils.processTemplateIntoString(template, model);

            mimeMessageHelper.setTo(userEmail);
            mimeMessageHelper.setFrom("bikerxnepal@gmail.com");
            mimeMessageHelper.setText(html, true);
            mimeMessageHelper.setSubject("Booking Confirmation");

            taskExecutor.execute(() -> getJavaMailSender.send(message));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }




}
