package com.example.tripease.repository;

import com.example.tripease.Enum.Gender;
import com.example.tripease.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer>{
    List<Customer> findByGender(Gender gender);
    List<Customer> findByGenderAndAge(Gender gender, int age);
    List<Customer> findByGenderAndAgeGreaterThan(Gender gender, int age);
}
