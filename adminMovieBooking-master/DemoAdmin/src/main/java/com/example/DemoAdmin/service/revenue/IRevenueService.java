package com.example.DemoAdmin.service.revenue;

import com.example.DemoAdmin.dto.request.RevenueFilterRequest;
import com.example.DemoAdmin.dto.response.RevenueResponse;

public interface IRevenueService {
    RevenueResponse getRevenueByDate(RevenueFilterRequest request);
    RevenueResponse getRevenueByTheater(RevenueFilterRequest request);
    RevenueResponse getRevenueByTheaterBrand(RevenueFilterRequest request);
    RevenueResponse getRevenueByMovie(RevenueFilterRequest request);
    RevenueResponse getRevenueByGenre(RevenueFilterRequest request);
    RevenueResponse getRevenueBySeatType(RevenueFilterRequest request);
}