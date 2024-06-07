package com.healthbuddy.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PaymentDetail {

	private String paymentMethod;
	private String status;
	private String paymentId;
	private String razorpayPaymentLinkId;
	private String razorpayPaymentLinkRefId;
	private String razorpayPaymentLinkStatus;
	private String razorpayPaymentId;
	
}
