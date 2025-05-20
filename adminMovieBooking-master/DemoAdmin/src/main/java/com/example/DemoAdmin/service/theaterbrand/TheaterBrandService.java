package com.example.DemoAdmin.service.theaterbrand;

import com.example.DemoAdmin.dto.request.TheaterBrandRequest;
import com.example.DemoAdmin.dto.response.TheaterBrandResponse;
import com.example.DemoAdmin.entity.TheaterBrand;
import com.example.DemoAdmin.mapper.ITheaterBrandMapper;
import com.example.DemoAdmin.repository.ITheaterBrandReposiroty;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TheaterBrandService implements ITheaterBrandService {
    @Autowired
    private final ITheaterBrandReposiroty theaterBrandReposiroty;
    @Autowired
    private final ITheaterBrandMapper theaterBrandMapper;



    @Override
    public TheaterBrandResponse createTheaterBrand(TheaterBrandRequest request) {
        TheaterBrand theaterBrand = new TheaterBrand();
        theaterBrand.setTheaterBrandName(request.getTheaterBrandName());
        TheaterBrand savedTheaterBrand = theaterBrandReposiroty.save(theaterBrand);
        return theaterBrandMapper.toTheaterBrandResponse(savedTheaterBrand);
    }

    @Override
    public TheaterBrandResponse updateTheaterBrand(TheaterBrandRequest request, Integer id) {
        TheaterBrand theaterBrand = theaterBrandReposiroty.findById(id)
                .orElseThrow(()-> new RuntimeException("Theater Brand not exist"));
        theaterBrand.setTheaterBrandName(request.getTheaterBrandName());
        TheaterBrand updateTheaterBrand = theaterBrandReposiroty.save(theaterBrand);
        return theaterBrandMapper.toTheaterBrandResponse(updateTheaterBrand);
    }




    @Override
    public void deleteTheaterBrand(Integer id) {
        TheaterBrand theaterBrand = theaterBrandReposiroty.findById(id)
                .orElseThrow(()-> new RuntimeException("Theater Brand not exist"));
        theaterBrandReposiroty.delete(theaterBrand);
    }

    @Override
    public TheaterBrandResponse getTheaterBrandById(Integer id) {
        TheaterBrand theaterBrand = theaterBrandReposiroty.findById(id)
                .orElseThrow(()-> new RuntimeException("Theater Brand not exist"));
        return theaterBrandMapper.toTheaterBrandResponse(theaterBrand);
    }
}
