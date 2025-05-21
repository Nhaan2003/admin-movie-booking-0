package com.example.DemoAdmin.service.seattype;

import com.example.DemoAdmin.dto.request.SeatTypesRequest;
import com.example.DemoAdmin.dto.response.SeatTypesResponse;

public interface ISeatTypeService {
    SeatTypesResponse getAllSeatTypes();
    SeatTypesResponse updateSeatTypes(SeatTypesRequest request);
}