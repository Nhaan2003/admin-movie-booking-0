// doanh thu
package com.example.DemoAdmin.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@IdClass(BookingFoodId.class)
public class BookingFood {

    @Id
    @ManyToOne
    @JoinColumn(name = "bookingId")
    private Booking booking;

    @Id
    @Column(name = "foodId")
    private Integer foodId;
}
