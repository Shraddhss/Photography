package com.example.tripease.service;

import com.example.tripease.dto.request.DriverRequest;
import com.example.tripease.dto.response.DriverResponse;
import com.example.tripease.model.Driver;
import com.example.tripease.repository.DriverRepository;
import com.example.tripease.transformer.DriverTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DriverService {

    @Autowired
    DriverRepository driverRepository;

    public DriverResponse addDriver(DriverRequest driverRequest) {
        //convert RequestDto to entitiy
        Driver driver= DriverTransformer.driverRequestToDriver(driverRequest);
        Driver savedDriver= driverRepository.save(driver);
        //entity to responseDto
        return DriverTransformer.driverToDriverResponse(savedDriver);
    }
}
