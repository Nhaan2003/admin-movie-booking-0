package com.example.DemoAdmin.mapper;

import com.example.DemoAdmin.dto.request.SeatTypesRequest;
import com.example.DemoAdmin.dto.response.SeatTypesResponse;
import com.example.DemoAdmin.entity.SeatType;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface ISeatTypeMapper {
    SeatType toSeatType(SeatTypesRequest request);

    SeatTypesResponse toSeatTypeResponse(SeatType seatType);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateSeatTypeFromRequest(SeatTypesRequest request, @MappingTarget SeatType seatType);
}