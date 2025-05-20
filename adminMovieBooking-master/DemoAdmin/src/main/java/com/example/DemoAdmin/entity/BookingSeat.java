// doanh thu
package com.example.DemoAdmin.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@IdClass(BookingSeatId.class)
public class BookingSeat {

    @Id
    @ManyToOne
    @JoinColumn(name = "bookingId")
    private Booking booking;

    @Id
    @ManyToOne
    @JoinColumn(name = "seatId")
    private Seat seat;
}

