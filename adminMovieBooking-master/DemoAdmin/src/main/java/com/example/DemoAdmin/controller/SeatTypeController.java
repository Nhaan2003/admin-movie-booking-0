package com.example.DemoAdmin.controller;

import com.example.DemoAdmin.dto.request.SeatTypesRequest;
import com.example.DemoAdmin.dto.response.ApiResponse;
import com.example.DemoAdmin.dto.response.SeatTypesResponse;
import com.example.DemoAdmin.service.seattype.ISeatTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/seattypes")
public class SeatTypeController {

    @Autowired
    private ISeatTypeService seatTypeService;

    @GetMapping
    public ResponseEntity<ApiResponse<SeatTypesResponse>> getAllSeatTypes() {
        SeatTypesResponse response = seatTypeService.getAllSeatTypes();
        return ResponseEntity.ok(new ApiResponse<>("Seat types retrieved successfully", response));
    }

    @PutMapping
    public ResponseEntity<ApiResponse<SeatTypesResponse>> updateSeatTypes(@RequestBody SeatTypesRequest request) {
        SeatTypesResponse response = seatTypeService.updateSeatTypes(request);
        return ResponseEntity.ok(new ApiResponse<>("Seat types updated successfully", response));
    }
}