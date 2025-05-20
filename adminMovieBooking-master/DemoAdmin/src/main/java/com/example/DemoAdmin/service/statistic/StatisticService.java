// doanh thu
package com.example.DemoAdmin.service.statistic;

import com.example.DemoAdmin.dto.response.RevenueStatisticResponse;
import com.example.DemoAdmin.repository.IBookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StatisticService implements IStatisticService {

    @Autowired
    private IBookingRepository bookingRepository;

    @Override
    public List<RevenueStatisticResponse> getRevenueStatistics(
            LocalDateTime startDate,
            LocalDateTime endDate,
            String theaterBrandName,
            String theaterName,
            String movieTitle,
            String seatType) {

        return bookingRepository.getRevenueStatistics(
                startDate,
                endDate,
                theaterBrandName,
                theaterName,
                movieTitle,
                seatType
        );
    }
}
