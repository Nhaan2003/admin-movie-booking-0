package com.example.DemoAdmin.dto.request;

import lombok.Data;
import java.time.LocalDate;

@Data
public class RevenueFilterRequest {
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer theaterId;
    private Integer theaterBrandId;
    private Integer movieId;
    private Integer genreId;
    private Integer seatTypeId;
}