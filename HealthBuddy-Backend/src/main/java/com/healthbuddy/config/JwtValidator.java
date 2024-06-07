package com.healthbuddy.config;

import java.io.IOException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.crypto.SecretKey;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtValidator extends OncePerRequestFilter {

    private static final Logger logger = Logger.getLogger(JwtValidator.class.getName());

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
    	
    	String requestPath = request.getServletPath();
        if ("/api/contact".equals(requestPath)) {
            filterChain.doFilter(request, response);
            return; // Skip JWT validation for this endpoint
        }
    	
    	
        String jwtString = request.getHeader(JwtConstants.JWT_HEADER);

        if (jwtString != null && jwtString.startsWith("Bearer ")) {
            jwtString = jwtString.substring(7); // Extract token without "Bearer "

            try {
                SecretKey key = Keys.hmacShaKeyFor(JwtConstants.SECRET_KEY.getBytes());
                Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwtString).getBody();

                String email = String.valueOf(claims.get("email"));
                List<GrantedAuthority> auths = AuthorityUtils.commaSeparatedStringToAuthorityList("ROLE_USER");
                Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, auths);
                SecurityContextHolder.getContext().setAuthentication(authentication);

                logger.log(Level.INFO, "JWT token successfully validated for email: " + email);
            } catch (Exception e) {
                logger.log(Level.SEVERE, "Error parsing JWT token: " + e.getMessage(), e);
                throw new BadCredentialsException("Invalid token received from jwt validator");
            }
        } else {
            logger.log(Level.WARNING, "No JWT token found in the request headers or token does not start with Bearer");
        }

        filterChain.doFilter(request, response);
    }
}
