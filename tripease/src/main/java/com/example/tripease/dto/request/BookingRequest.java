package com.example.tripease.dto.request;

import com.example.tripease.dto.response.CustomerResponse;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class BookingRequest {
    private String pickup;
    private String destination;
    private double tripDistanceInKm;
}
