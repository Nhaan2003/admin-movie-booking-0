package com.example.DemoAdmin.service.seattype;

import com.example.DemoAdmin.dto.request.SeatTypeDTORequest;
import com.example.DemoAdmin.dto.request.SeatTypesRequest;
import com.example.DemoAdmin.dto.response.SeatTypeDTOResponse;
import com.example.DemoAdmin.dto.response.SeatTypesResponse;
import com.example.DemoAdmin.entity.SeatType;
import com.example.DemoAdmin.repository.ISeatTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class SeatTypeService implements ISeatTypeService {

    @Autowired
    private ISeatTypeRepository seatTypeRepository;

    @Override
    public SeatTypesResponse getAllSeatTypes() {
        List<SeatType> seatTypes = seatTypeRepository.findAll();

        Map<String, SeatTypeDTOResponse> seatTypeMap = new HashMap<>();

        for (SeatType seatType : seatTypes) {
            SeatTypeDTOResponse response = new SeatTypeDTOResponse();
            response.setPrice(seatType.getPrice());
            response.setEnabled(seatType.isEnabled());

            seatTypeMap.put(seatType.getTypeName(), response);
        }

        SeatTypesResponse response = new SeatTypesResponse();
        response.setSeatTypes(seatTypeMap);

        return response;
    }

    @Override
    public SeatTypesResponse updateSeatTypes(SeatTypesRequest request) {
        Map<String, SeatTypeDTORequest> requestMap = request.getSeatTypes();

        // Lấy tất cả loại ghế hiện có
        List<SeatType> existingSeatTypes = seatTypeRepository.findAll();
        Map<String, SeatType> existingSeatTypeMap = existingSeatTypes.stream()
                .collect(Collectors.toMap(SeatType::getTypeName, seatType -> seatType));

        // Cập nhật loại ghế từ request
        for (Map.Entry<String, SeatTypeDTORequest> entry : requestMap.entrySet()) {
            String typeName = entry.getKey();
            SeatTypeDTORequest requestDTO = entry.getValue();

            SeatType seatType = existingSeatTypeMap.getOrDefault(typeName, new SeatType());
            seatType.setTypeName(typeName);
            seatType.setPrice(requestDTO.getPrice());
            seatType.setEnabled(requestDTO.isEnabled());

            seatTypeRepository.save(seatType);
        }

        // Trả về danh sách loại ghế đã cập nhật
        return getAllSeatTypes();
    }
}