package com.healthbuddy.services.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthbuddy.config.JwtProvider;
import com.healthbuddy.exceptions.UserException;
import com.healthbuddy.model.User;
import com.healthbuddy.repository.UserRepo;
import com.healthbuddy.services.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private JwtProvider jwtProvider;
	
	
	@Override
	public User findUserById(Long userId) throws UserException {
		Optional<User> user = userRepo.findById(userId);
		if(user.isPresent())
		{
			return user.get();
		}
		throw new UserException("User Not Found : "+userId);
	}

	@Override
	public User findUserProfileByJwt(String jwt) throws UserException {
		String email = jwtProvider.getEmailFromJwt(jwt);
		
		User user = userRepo.findByEmail(email);
		
		if(user != null)
		{
			throw new UserException("User Not Found : "+email);
		}
		return user;
	}

}
