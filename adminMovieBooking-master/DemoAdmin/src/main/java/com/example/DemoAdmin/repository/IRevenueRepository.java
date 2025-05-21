package com.example.DemoAdmin.repository;

import com.example.DemoAdmin.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IRevenueRepository extends JpaRepository<Booking, Integer> {

    @Query(value = "SELECT CONVERT(VARCHAR(10), b.BookingDate, 103) as date, SUM(b.Total) as amount " +
            "FROM Booking b " +
            "WHERE CONVERT(DATE, b.BookingDate) BETWEEN :startDate AND :endDate " +
            "AND b.Status = 'Confirmed' " +
            "GROUP BY CONVERT(VARCHAR(10), b.BookingDate, 103) " +
            "ORDER BY MIN(b.BookingDate)", nativeQuery = true)
    List<Object[]> getRevenueByDateRange(@Param("startDate") LocalDate startDate,
                                         @Param("endDate") LocalDate endDate);

    @Query(value = "SELECT t.Name as theaterName, SUM(b.Total) as amount " +
            "FROM Booking b " +
            "JOIN Showtime s ON b.ShowtimeId = s.ShowtimeId " +
            "JOIN Screen sc ON s.ScreenId = sc.ScreenId " +
            "JOIN Theater t ON sc.TheaterId = t.TheaterId " +
            "WHERE CONVERT(DATE, b.BookingDate) BETWEEN :startDate AND :endDate " +
            "AND b.Status = 'Confirmed' " +
            "AND (:theaterId IS NULL OR t.TheaterId = :theaterId) " +
            "GROUP BY t.Name " +
            "ORDER BY SUM(b.Total) DESC", nativeQuery = true)
    List<Object[]> getRevenueByTheater(@Param("startDate") LocalDate startDate,
                                       @Param("endDate") LocalDate endDate,
                                       @Param("theaterId") Integer theaterId);

    @Query(value = "SELECT tb.TheaterBrandName as brandName, SUM(b.Total) as amount " +
            "FROM Booking b " +
            "JOIN Showtime s ON b.ShowtimeId = s.ShowtimeId " +
            "JOIN Screen sc ON s.ScreenId = sc.ScreenId " +
            "JOIN Theater t ON sc.TheaterId = t.TheaterId " +
            "JOIN TheaterBrand tb ON t.TheaterBrandId = tb.TheaterBrandId " +
            "WHERE CONVERT(DATE, b.BookingDate) BETWEEN :startDate AND :endDate " +
            "AND b.Status = 'Confirmed' " +
            "AND (:theaterBrandId IS NULL OR tb.TheaterBrandId = :theaterBrandId) " +
            "GROUP BY tb.TheaterBrandName " +
            "ORDER BY SUM(b.Total) DESC", nativeQuery = true)
    List<Object[]> getRevenueByTheaterBrand(@Param("startDate") LocalDate startDate,
                                            @Param("endDate") LocalDate endDate,
                                            @Param("theaterBrandId") Integer theaterBrandId);

    @Query(value = "SELECT m.Title as movieName, SUM(b.Total) as amount " +
            "FROM Booking b " +
            "JOIN Showtime s ON b.ShowtimeId = s.ShowtimeId " +
            "JOIN Movie m ON s.MovieId = m.MovieId " +
            "WHERE CONVERT(DATE, b.BookingDate) BETWEEN :startDate AND :endDate " +
            "AND b.Status = 'Confirmed' " +
            "AND (:movieId IS NULL OR m.MovieId = :movieId) " +
            "GROUP BY m.Title " +
            "ORDER BY SUM(b.Total) DESC", nativeQuery = true)
    List<Object[]> getRevenueByMovie(@Param("startDate") LocalDate startDate,
                                     @Param("endDate") LocalDate endDate,
                                     @Param("movieId") Integer movieId);

    @Query(value = "SELECT g.Name as genreName, SUM(b.Total) as amount " +
            "FROM Booking b " +
            "JOIN Showtime s ON b.ShowtimeId = s.ShowtimeId " +
            "JOIN Movie m ON s.MovieId = m.MovieId " +
            "JOIN MovieGenre mg ON m.MovieId = mg.MovieId " +
            "JOIN Genre g ON mg.GenreId = g.GenreId " +
            "WHERE CONVERT(DATE, b.BookingDate) BETWEEN :startDate AND :endDate " +
            "AND b.Status = 'Confirmed' " +
            "AND (:genreId IS NULL OR g.GenreId = :genreId) " +
            "GROUP BY g.Name " +
            "ORDER BY SUM(b.Total) DESC", nativeQuery = true)
    List<Object[]> getRevenueByGenre(@Param("startDate") LocalDate startDate,
                                     @Param("endDate") LocalDate endDate,
                                     @Param("genreId") Integer genreId);

    @Query(value = "SELECT st.TypeName as seatTypeName, SUM(b.Total) as amount " +
            "FROM Booking b " +
            "JOIN BookingSeat bs ON b.BookingId = bs.BookingId " +
            "JOIN Seat s ON bs.SeatId = s.SeatId " +
            "JOIN SeatType st ON s.SeatTypeId = st.SeatTypeId " +
            "WHERE CONVERT(DATE, b.BookingDate) BETWEEN :startDate AND :endDate " +
            "AND b.Status = 'Confirmed' " +
            "AND (:seatTypeId IS NULL OR st.SeatTypeId = :seatTypeId) " +
            "GROUP BY st.TypeName " +
            "ORDER BY SUM(b.Total) DESC", nativeQuery = true)
    List<Object[]> getRevenueBySeatType(@Param("startDate") LocalDate startDate,
                                        @Param("endDate") LocalDate endDate,
                                        @Param("seatTypeId") Integer seatTypeId);
}