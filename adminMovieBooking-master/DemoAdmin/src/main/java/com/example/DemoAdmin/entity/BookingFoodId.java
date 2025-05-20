// doanh thu
package com.example.DemoAdmin.entity;

import lombok.Data;

import java.io.Serializable;
import java.util.Objects;

@Data
public class BookingFoodId implements Serializable {
    private Integer booking;
    private Integer foodId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BookingFoodId that = (BookingFoodId) o;
        return Objects.equals(booking, that.booking) && Objects.equals(foodId, that.foodId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(booking, foodId);
    }
}
