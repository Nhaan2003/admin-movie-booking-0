//package com.example.DemoAdmin.entity;
//
//import jakarta.persistence.*;
//import lombok.Getter;
//import lombok.Setter;
//
//import java.time.LocalDateTime;
//
//@Getter
//@Setter
//@Entity
//@Table(name = "Booking")
//public class Booking {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "BookingId")
//    private Integer id;
//
//    @Column(name = "UserId")
//    private Integer userId;
//
//    @ManyToOne
//    @JoinColumn(name = "ShowtimeId")
//    private Showtime showtime;
//
//    @Column(name = "BookingDate")
//    private LocalDateTime bookingDate;
//
//    @Column(name = "TotalAmount")
//    private Double totalAmount;
//
//    @Column(name = "Status")
//    private String status;
//}
