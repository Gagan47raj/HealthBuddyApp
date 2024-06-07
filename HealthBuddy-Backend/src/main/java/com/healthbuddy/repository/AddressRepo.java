package com.healthbuddy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthbuddy.model.Address;

public interface AddressRepo extends JpaRepository<Address, Long> {

}
