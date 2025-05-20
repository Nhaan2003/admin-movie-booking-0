// doanh thu
package com.example.DemoAdmin.repository;

import com.example.DemoAdmin.dto.response.RevenueStatisticResponse;
import com.example.DemoAdmin.entity.Booking;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface IBookingRepository extends JpaRepository<Booking, Integer> {

    @Query("""
        SELECT new com.example.DemoAdmin.dto.response.RevenueStatisticResponse(
            CAST(b.bookingDate AS date),
            t.theaterBrand.theaterBrandName,
            t.name,
            m.title,
            st.typeName,
            SUM(b.total)
        )
        FROM Booking b
        JOIN b.showtime s
        JOIN s.movie m
        JOIN s.screen sc
        JOIN sc.theater t
        JOIN BookingSeat bs ON bs.booking.id = b.id
        JOIN Seat seat ON seat.id = bs.seat.id
        JOIN seat.seatType st
        WHERE b.status = 'Confirmed'
            AND b.bookingDate BETWEEN :startDate AND :endDate
            AND (:theaterBrandName IS NULL OR t.theaterBrand.theaterBrandName = :theaterBrandName)
            AND (:theaterName IS NULL OR t.name = :theaterName)
            AND (:movieTitle IS NULL OR m.title = :movieTitle)
            AND (:seatType IS NULL OR st.typeName = :seatType)
        GROUP BY CAST(b.bookingDate AS date), t.theaterBrand.theaterBrandName, t.name, m.title, st.typeName
    """)
    List<RevenueStatisticResponse> getRevenueStatistics(
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            @Param("theaterBrandName") String theaterBrandName,
            @Param("theaterName") String theaterName,
            @Param("movieTitle") String movieTitle,
            @Param("seatType") String seatType
    );
}
