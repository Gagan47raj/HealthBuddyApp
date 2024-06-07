package com.healthbuddy.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthbuddy.config.JwtProvider;
import com.healthbuddy.exceptions.UserException;
import com.healthbuddy.model.Cart;
import com.healthbuddy.model.User;
import com.healthbuddy.repository.UserRepo;
import com.healthbuddy.request.LoginRequest;
import com.healthbuddy.response.AuthResponse;
import com.healthbuddy.services.CartService;
import com.healthbuddy.services.impl.CustomUserServiceImpl;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private JwtProvider jwtProvider;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private CustomUserServiceImpl userServiceImpl; 
	
	@Autowired
	private CartService cartService;
	
	
	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User  user) throws UserException {
		
		String email = user.getEmail();
		String password = user.getPassword();
		String firstName = user.getFirstName();
		String lastName = user.getLastName();
		String phone = user.getPhone();
		
		User isEmailPresent = userRepo.findByEmail(email);
		if(isEmailPresent != null) {
			throw new UserException("User already present with email id "+email);
		}
		
		
		User userCreated = new User();
		userCreated.setEmail(email);
		userCreated.setPassword(passwordEncoder.encode(password));
		userCreated.setFirstName(firstName);
		userCreated.setLastName(lastName);
		userCreated.setPhone(phone);
		userCreated.setCreatedAt(LocalDateTime.now());
		
		User savedUser = userRepo.save(userCreated);
		Cart cart = cartService.createCart(savedUser);
		
		Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(), savedUser.getPassword()); 
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		String token = jwtProvider.generateToken(authentication);
		AuthResponse authResponse = new AuthResponse();
		authResponse.setJwt(token);
		authResponse.setMessage("User created successfully");
		
		return new ResponseEntity<AuthResponse> (authResponse,HttpStatus.CREATED);
		
	}
	
	@PostMapping("/signin")
	public ResponseEntity<AuthResponse> loginUserHandler(@RequestBody LoginRequest loginRequest)
	{
		String username = loginRequest.getEmail();
		String password = loginRequest.getPassword();
		
		Authentication authentication = authenticate(username, password);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		String token = jwtProvider.generateToken(authentication);
		AuthResponse authResponse = new AuthResponse();
		authResponse.setJwt(token);
		authResponse.setMessage("User Login successfully");
		
		return new ResponseEntity<> (authResponse,HttpStatus.CREATED);
	}

	private Authentication authenticate(String username, String password) {
		UserDetails userDetails = userServiceImpl.loadUserByUsername(username);
		
		if(userDetails == null) {
			throw new BadCredentialsException("user not found"+username);
		}
		
		if(!passwordEncoder.matches(password, userDetails.getPassword())) {
			throw new BadCredentialsException("invalid password");
		}
		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}
}