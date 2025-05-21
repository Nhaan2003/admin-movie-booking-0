package com.example.DemoAdmin.controller;

import com.example.DemoAdmin.dto.request.RevenueFilterRequest;
import com.example.DemoAdmin.dto.response.RevenueResponse;
import com.example.DemoAdmin.service.revenue.IRevenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/revenue")
public class RevenueController {

    @Autowired
    private IRevenueService revenueService;

    @PostMapping("/by-date")
    public ResponseEntity<RevenueResponse> getRevenueByDate(@RequestBody RevenueFilterRequest request) {
        RevenueResponse response = revenueService.getRevenueByDate(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/by-theater")
    public ResponseEntity<RevenueResponse> getRevenueByTheater(@RequestBody RevenueFilterRequest request) {
        RevenueResponse response = revenueService.getRevenueByTheater(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/by-theater-brand")
    public ResponseEntity<RevenueResponse> getRevenueByTheaterBrand(@RequestBody RevenueFilterRequest request) {
        RevenueResponse response = revenueService.getRevenueByTheaterBrand(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/by-movie")
    public ResponseEntity<RevenueResponse> getRevenueByMovie(@RequestBody RevenueFilterRequest request) {
        RevenueResponse response = revenueService.getRevenueByMovie(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/by-genre")
    public ResponseEntity<RevenueResponse> getRevenueByGenre(@RequestBody RevenueFilterRequest request) {
        RevenueResponse response = revenueService.getRevenueByGenre(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/by-seat-type")
    public ResponseEntity<RevenueResponse> getRevenueBySeatType(@RequestBody RevenueFilterRequest request) {
        RevenueResponse response = revenueService.getRevenueBySeatType(request);
        return ResponseEntity.ok(response);
    }
}