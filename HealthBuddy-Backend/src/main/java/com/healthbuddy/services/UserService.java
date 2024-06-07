package com.healthbuddy.services;

import java.util.List;

import com.healthbuddy.exceptions.UserException;
import com.healthbuddy.model.User;

public interface UserService {

	public User findUserById(Long userId) throws UserException;
	
	public User findUserProfileByJwt(String jwt) throws UserException;
	
    public List<User> findAllUsers();	
    
    public void deleteUser(Long userId) throws UserException;
    
    public User findUserByEmail(String email) throws UserException;
	
}
