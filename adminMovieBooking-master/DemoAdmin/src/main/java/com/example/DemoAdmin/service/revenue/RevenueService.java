package com.example.DemoAdmin.service.revenue;

import com.example.DemoAdmin.dto.request.RevenueFilterRequest;
import com.example.DemoAdmin.dto.response.RevenueDetailDTO;
import com.example.DemoAdmin.dto.response.RevenueResponse;
import com.example.DemoAdmin.repository.IRevenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class RevenueService implements IRevenueService {

    @Autowired
    private IRevenueRepository revenueRepository;

    @Override
    public RevenueResponse getRevenueByDate(RevenueFilterRequest request) {
        List<Object[]> results = revenueRepository.getRevenueByDateRange(
                request.getStartDate(),
                request.getEndDate()
        );

        return buildRevenueResponse(results);
    }

    @Override
    public RevenueResponse getRevenueByTheater(RevenueFilterRequest request) {
        List<Object[]> results = revenueRepository.getRevenueByTheater(
                request.getStartDate(),
                request.getEndDate(),
                request.getTheaterId()
        );

        return buildRevenueResponse(results);
    }

    @Override
    public RevenueResponse getRevenueByTheaterBrand(RevenueFilterRequest request) {
        List<Object[]> results = revenueRepository.getRevenueByTheaterBrand(
                request.getStartDate(),
                request.getEndDate(),
                request.getTheaterBrandId()
        );

        return buildRevenueResponse(results);
    }

    @Override
    public RevenueResponse getRevenueByMovie(RevenueFilterRequest request) {
        List<Object[]> results = revenueRepository.getRevenueByMovie(
                request.getStartDate(),
                request.getEndDate(),
                request.getMovieId()
        );

        return buildRevenueResponse(results);
    }

    @Override
    public RevenueResponse getRevenueByGenre(RevenueFilterRequest request) {
        List<Object[]> results = revenueRepository.getRevenueByGenre(
                request.getStartDate(),
                request.getEndDate(),
                request.getGenreId()
        );

        return buildRevenueResponse(results);
    }

    @Override
    public RevenueResponse getRevenueBySeatType(RevenueFilterRequest request) {
        List<Object[]> results = revenueRepository.getRevenueBySeatType(
                request.getStartDate(),
                request.getEndDate(),
                request.getSeatTypeId()
        );

        return buildRevenueResponse(results);
    }

    private RevenueResponse buildRevenueResponse(List<Object[]> results) {
        RevenueResponse response = new RevenueResponse();
        List<RevenueDetailDTO> details = new ArrayList<>();
        BigDecimal totalRevenue = BigDecimal.ZERO;

        for (Object[] result : results) {
            RevenueDetailDTO detail = new RevenueDetailDTO();
            detail.setLabel(result[0].toString());

            // Convert to BigDecimal depending on the type returned from the database
            BigDecimal amount;
            if (result[1] instanceof BigDecimal) {
                amount = (BigDecimal) result[1];
            } else if (result[1] instanceof Integer) {
                amount = new BigDecimal((Integer) result[1]);
            } else if (result[1] instanceof Long) {
                amount = new BigDecimal((Long) result[1]);
            } else {
                amount = new BigDecimal(result[1].toString());
            }

            detail.setAmount(amount);
            details.add(detail);

            totalRevenue = totalRevenue.add(amount);
        }

        response.setDetails(details);
        response.setTotalRevenue(totalRevenue);

        return response;
    }
}