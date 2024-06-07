package com.healthbuddy.model;

import java.time.LocalDate;

import jakarta.persistence.Column;

public class PaymentInformation {

	@Column(name="cardholder_name")
	private String cardHolderName;
	
	@Column(name="card_number")
	private String cardNumber;
	
	@Column(name="expiry_date")
	private LocalDate expiryDate;
	
	@Column(name="cvv")
	private String cvv; 
}
