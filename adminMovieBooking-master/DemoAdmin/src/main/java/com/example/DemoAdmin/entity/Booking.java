// doanh thu
package com.example.DemoAdmin.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer userId;

    private LocalDateTime bookingDate;

    private Integer total;

    private String status;

    private Integer discount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "showtimeId")
    private Showtime showtime;

    @OneToMany(mappedBy = "booking")
    private List<BookingSeat> bookingSeats;

    @OneToMany(mappedBy = "booking")
    private List<BookingFood> bookingFoods;
}

