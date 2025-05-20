// doanh thu
package com.example.DemoAdmin.service.statistic;

import com.example.DemoAdmin.dto.response.RevenueStatisticResponse;

import java.time.LocalDateTime;
import java.util.List;

public interface IStatisticService {
    List<RevenueStatisticResponse> getRevenueStatistics(
            LocalDateTime startDate,
            LocalDateTime endDate,
            String theaterBrandName,
            String theaterName,
            String movieTitle,
            String seatType
    );
}

