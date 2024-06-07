package com.healthbuddy.services.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthbuddy.config.JwtProvider;
import com.healthbuddy.exceptions.UserException;
import com.healthbuddy.model.User;
import com.healthbuddy.repository.CartRepo;
import com.healthbuddy.repository.UserRepo;
import com.healthbuddy.services.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private CartRepo cartRepo;
	
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
		
		if(user == null)
		{
			throw new UserException("User Not Found : "+email);
		}
		return user;
	}

	@Override
	public List<User> findAllUsers() {
		return userRepo.findAll();
	}

	@Override
	public void deleteUser(Long userId) throws UserException {
		if (!userRepo.existsById(userId)) {
            throw new UserException("User Not Found: " + userId);
        }
		cartRepo.deleteByUserId(userId);
		
        userRepo.deleteById(userId);
	}

	@Override
	public User findUserByEmail(String email) throws UserException {
		User user = userRepo.findByEmail(email);
        if (user == null) {
            throw new UserException("User not found with email: " + email);
        }
        return user;
	}

}
