// doanh thu
package com.example.DemoAdmin.controller;

import com.example.DemoAdmin.dto.response.RevenueStatisticResponse;
import com.example.DemoAdmin.service.statistic.IStatisticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/statistics")
public class StatisticController {

    @Autowired
    private IStatisticService statisticService;

    @GetMapping("/revenue")
    public List<RevenueStatisticResponse> getRevenueStatistics(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            @RequestParam(value = "theaterBrand", required = false) String theaterBrand,
            @RequestParam(value = "theater", required = false) String theater,
            @RequestParam(value = "movie", required = false) String movie,
            @RequestParam(value = "seatType", required = false) String seatType
    ) {
        return statisticService.getRevenueStatistics(
                startDate,
                endDate,
                theaterBrand,
                theater,
                movie,
                seatType
        );
    }
}
