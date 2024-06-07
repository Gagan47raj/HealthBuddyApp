package com.healthbuddy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthbuddy.services.EmailService;

@RestController
@RequestMapping("/api")
public class ContactController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/contact")
    public String sendEmail(@RequestBody ContactRequest contactRequest) {
        String sub = "Subject : " + contactRequest.getSubject();
        String msg = "Message : " + contactRequest.getMessage();
        String to = "From : " + contactRequest.getEmail();
        
        if (!isValidEmail(to)) {
            return "Invalid email address";
        }

        emailService.sendEmail(to, sub, msg);
        return "Email sent successfully";
    }
    private boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        return email.matches(emailRegex);
    }
}

class ContactRequest {
    private String email;
    private String subject;
    private String message;

    // Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
