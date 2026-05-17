package com.example.tripease.service;
import java.util.*;

import com.example.tripease.Enum.Gender;
import com.example.tripease.dto.request.CustomerRequest;
import com.example.tripease.dto.response.CustomerResponse;
import com.example.tripease.exception.CustomerNotFoundException;
import com.example.tripease.model.Customer;
import com.example.tripease.repository.CustomerRepository;
import com.example.tripease.transformer.CustomerTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    @Autowired
    CustomerRepository customerRepository;

    public CustomerResponse addCustomer(CustomerRequest customerRequest) {

        //RequestDTO->Entity
        Customer customer= CustomerTransformer.customerRequestToCustomer(customerRequest);
        //save the entity to db
        Customer savedCustomer=customerRepository.save(customer);
        //saved entity->ResponseDTO
        return CustomerTransformer.customerToCustomerResponse(savedCustomer);
    }

    public CustomerResponse getCustomer(int customerId) {
        Optional<Customer> optionalCustomer= customerRepository.findById(customerId);
        if(optionalCustomer.isEmpty()){
            throw new CustomerNotFoundException("Invalid customer id");
        }
        Customer savedCustomer=optionalCustomer.get();
        //saved entity->DTO
        return CustomerTransformer.customerToCustomerResponse(savedCustomer);

    }

    public List<CustomerResponse> getAllByGender(Gender gender) {
        List<Customer> customers=customerRepository.findByGender(gender);
        //entity->response DTO
        List<CustomerResponse> customerResponses=new ArrayList<>();
        for(Customer customer:customers){
            customerResponses.add(CustomerTransformer.customerToCustomerResponse(customer));
        }
        return customerResponses;
    }

    public List<CustomerResponse> getAllByGenderAndAge(Gender gender, int age) {
            List<Customer> customers=customerRepository.findByGenderAndAge(gender, age);
            List<CustomerResponse> customerResponse=new ArrayList<>();
            for(Customer customer:customers){
                customerResponse.add(CustomerTransformer.customerToCustomerResponse(customer));
            }
            return customerResponse;
    }

    public List<CustomerResponse> getAllByGenderAndAgeGreaterThan(Gender gender, int age) {
        List<Customer> customers=customerRepository.findByGenderAndAgeGreaterThan(gender, age);
        List<CustomerResponse> customerResponse=new ArrayList<>();
        for(Customer customer:customers){
            customerResponse.add(CustomerTransformer.customerToCustomerResponse(customer));
        }
        return customerResponse;
    }
}
