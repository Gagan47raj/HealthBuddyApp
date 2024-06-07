package com.healthbuddy.controller;

import java.util.List;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthbuddy.config.ApiResponse;
import com.healthbuddy.config.JwtConstants;
import com.healthbuddy.exceptions.UserException;
import com.healthbuddy.model.User;
import com.healthbuddy.services.UserService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;
	
	@GetMapping("/profile")
	public ResponseEntity<User> getUserProfileHandler(
		@RequestHeader("Authorization") String jwt
	) throws UserException{
		String email = extractEmailFromJwt(jwt);
        User user = userService.findUserByEmail(email);
        return new ResponseEntity<User>(user, HttpStatus.ACCEPTED);
	}
	
	private String extractEmailFromJwt(String jwt) throws UserException {
        if (jwt != null && jwt.startsWith("Bearer ")) {
            jwt = jwt.substring(7); // Remove "Bearer " prefix
            try {
                SecretKey key = Keys.hmacShaKeyFor(JwtConstants.SECRET_KEY.getBytes());
                Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
                return String.valueOf(claims.get("email"));
            } catch (Exception e) {
                throw new UserException("Invalid JWT token: " + e.getMessage());
            }
        }
        throw new UserException("JWT token is missing or invalid");
    }
	
	@GetMapping("/admin")
    public ResponseEntity<List<User>> getAllUsersHandler() {
        List<User> users = userService.findAllUsers();
        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }
	
	@DeleteMapping("/admin/{userId}/delete")
	@Transactional
	public ResponseEntity<ApiResponse> deleteUserHandler(@PathVariable Long userId) throws UserException
	{
		userService.deleteUser(userId);
		ApiResponse apiResponse = new ApiResponse();
		apiResponse.setMessage("User deleted successfully");
		apiResponse.setStatus(true);
		return new ResponseEntity<>(apiResponse,HttpStatus.OK);
	}
	
}
