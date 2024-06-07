package com.healthbuddy.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.healthbuddy.config.ApiResponse;
import com.healthbuddy.exceptions.OrderException;
import com.healthbuddy.model.Order;
import com.healthbuddy.repository.OrderRepo;
import com.healthbuddy.response.PaymentLinkResponse;
import com.healthbuddy.services.OrderService;
import com.healthbuddy.services.UserService;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;



@RestController
@RequestMapping("/api")
public class PaymentController {

	@Value("${razorpay.api.key}")
	String apiKey;
	
	@Value("${razorpay.api.secret}")
	String apiSecret;
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private OrderRepo orderRepo;
	
	@PostMapping("/payments/{orderId}")
	public ResponseEntity<PaymentLinkResponse> createPaymentLink(
		@PathVariable Long orderId,
		@RequestHeader("Authorization")String jwt) throws RazorpayException, OrderException {
		Order order = orderService.findOrderById(orderId);
		
		try {
			RazorpayClient client = new RazorpayClient(apiKey, apiSecret);
			JSONObject request = new JSONObject();
			request.put("amount", order.getTotalDiscountedPrice()*100);
			request.put("currency", "INR");
			
			JSONObject customer = new JSONObject();
			customer.put("name", order.getUser().getFirstName());
			customer.put("email", order.getUser().getEmail());
			request.put("customer", customer);
			
			JSONObject notify = new JSONObject();
			notify.put("sms", true);
			notify.put("email", true);
			request.put("notify", notify);
			
			request.put("callback_url","http://localhost:3000/payment/"+orderId);
			request.put("callback_method","get" );
			
			PaymentLink payment = client.paymentLink.create(request);
			String paymentLinkId = payment.get("id");
			String paymentLinkUrl = payment.get("short_url");
			
			PaymentLinkResponse response = new PaymentLinkResponse();
			response.setPayment_link_id(paymentLinkId);
			response.setPayment_link_url(paymentLinkUrl);
			
			return new ResponseEntity<PaymentLinkResponse>(response,HttpStatus.OK);
			
		}catch(Exception e)
		{
			throw new RazorpayException(e.getMessage());
		}
	}
	
	@GetMapping("/payments")
	public ResponseEntity<ApiResponse> redirect(
			@RequestParam(name="payment_id") String paymentId,
			@RequestParam(name="order_id") Long orderId) throws OrderException, RazorpayException
	{
		Order order = orderService.findOrderById(orderId);
		RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);
		try
		{
			Payment payment = razorpay.payments.fetch(paymentId);
			
			if(payment.get("status").equals("captured"))
			{
				order.getPaymentDetail().setPaymentId(paymentId);
				order.getPaymentDetail().setStatus("COMPLETED");
				order.setOrderStatus("PLACED");
				orderRepo.save(order);
			}
			
			ApiResponse apiResponse = new ApiResponse();
			apiResponse.setStatus(true);
			apiResponse.setMessage("Payment successful");
			return new ResponseEntity<ApiResponse>(apiResponse,HttpStatus.ACCEPTED);
		}catch(Exception e)
		{
			throw new RazorpayException(e.getMessage());
		}
	}
}
