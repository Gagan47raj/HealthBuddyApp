package com.healthbuddy.config;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtProvider {
	SecretKey key = Keys.hmacShaKeyFor(JwtConstants.SECRET_KEY.getBytes());
	
    public String generateToken(Authentication authentication) {
        String jwtString = Jwts.builder()
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + 846000000))
                .claim("email", authentication.getName())
                .signWith(key)
                .compact();
        return jwtString;
    }
    
    public String getEmailFromJwt(String jwtString) {
    	jwtString = jwtString.substring(7);
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwtString).getBody();

        String email = String.valueOf(claims.get("email"));
        return email;
    }
}
