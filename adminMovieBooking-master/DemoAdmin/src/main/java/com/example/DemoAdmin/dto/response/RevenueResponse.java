package com.example.DemoAdmin.dto.response;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class RevenueResponse {
    private List<RevenueDetailDTO> details;
    private BigDecimal totalRevenue;
}