package com.healthbuddy.services;

import com.healthbuddy.exceptions.UserException;
import com.healthbuddy.model.User;

public interface UserService {

	public User findUserById(Long userId) throws UserException;
	
	public User findUserProfileByJwt(String jwt) throws UserException;
	
	
}
