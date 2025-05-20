// doanh thu
package com.example.DemoAdmin.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
public class RevenueStatisticResponse {
    // Getters and Setters
    private LocalDate date;
    private String theaterBrand;
    private String theater;
    private String movie;
    private String seatType;
    private Long total;

    public RevenueStatisticResponse(LocalDate date, String theaterBrand, String theater, String movie, String seatType, Long total) {
        this.date = date;
        this.theaterBrand = theaterBrand;
        this.theater = theater;
        this.movie = movie;
        this.seatType = seatType;
        this.total = total;
    }

}
