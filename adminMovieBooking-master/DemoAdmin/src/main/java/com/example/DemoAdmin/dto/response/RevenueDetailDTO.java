package com.example.DemoAdmin.dto.response;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class RevenueDetailDTO {
    private String label; // Ngày, tên rạp, tên phim hoặc loại ghế
    private BigDecimal amount;
}