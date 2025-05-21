import React, { useState, useEffect } from 'react';
import { 
  TextField, Button, Grid, Box, FormControl, 
  InputLabel, Select, MenuItem, Typography 
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { vi } from 'date-fns/locale';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const RevenueFilterForm = ({ onSearch }) => {
  const [filterType, setFilterType] = useState('date');
  const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 30)));
  const [endDate, setEndDate] = useState(new Date());
  const [theaterId, setTheaterId] = useState('');
  const [theaterBrandId, setTheaterBrandId] = useState('');
  const [movieId, setMovieId] = useState('');
  const [genreId, setGenreId] = useState('');
  const [seatTypeId, setSeatTypeId] = useState('');
  
  // Data for dropdowns
  const [theaters, setTheaters] = useState([]);
  const [theaterBrands, setTheaterBrands] = useState([]);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [seatTypes, setSeatTypes] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const theaterBrandsRes = await axios.get(`${API_URL}/theaterbrand/all`);
        setTheaterBrands(theaterBrandsRes.data);
        
        const theatersRes = await axios.get(`${API_URL}/theater/all`);
        setTheaters(theatersRes.data);
        
        const moviesRes = await axios.get(`${API_URL}/movie/all`);
        setMovies(moviesRes.data);
        
        const genresRes = await axios.get(`${API_URL}/genre/all`);
        setGenres(genresRes.data);
        
        const seatTypesRes = await axios.get(`${API_URL}/seattype/all`);
        setSeatTypes(seatTypesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const filter = {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    };
    
    // Add filter criteria based on the selected type
    switch (filterType) {
      case 'theater':
        filter.theaterId = theaterId ? parseInt(theaterId) : null;
        break;
      case 'theaterBrand':
        filter.theaterBrandId = theaterBrandId ? parseInt(theaterBrandId) : null;
        break;
      case 'movie':
        filter.movieId = movieId ? parseInt(movieId) : null;
        break;
      case 'genre':
        filter.genreId = genreId ? parseInt(genreId) : null;
        break;
      case 'seatType':
        filter.seatTypeId = seatTypeId ? parseInt(seatTypeId) : null;
        break;
      default:
        break;
    }
    
    onSearch(filterType, filter);
  };
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>Bộ lọc báo cáo doanh thu</Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id="filter-type-label">Loại báo cáo</InputLabel>
              <Select
                labelId="filter-type-label"
                id="filter-type"
                value={filterType}
                label="Loại báo cáo"
                onChange={(e) => setFilterType(e.target.value)}
              >
                <MenuItem value="date">Theo ngày</MenuItem>
                <MenuItem value="theater">Theo rạp</MenuItem>
                <MenuItem value="theaterBrand">Theo chuỗi rạp</MenuItem>
                <MenuItem value="movie">Theo phim</MenuItem>
                <MenuItem value="genre">Theo thể loại phim</MenuItem>
                <MenuItem value="seatType">Theo loại ghế</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <DatePicker
              label="Từ ngày"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          
          <Grid item xs={12} md={3}>
            <DatePicker
              label="Đến ngày"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          
          {filterType === 'theater' && (
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id="theater-label">Rạp</InputLabel>
                <Select
                  labelId="theater-label"
                  id="theater"
                  value={theaterId}
                  label="Rạp"
                  onChange={(e) => setTheaterId(e.target.value)}
                >
                  <MenuItem value="">Tất cả</MenuItem>
                  {theaters.map((theater) => (
                    <MenuItem key={theater.theaterId} value={theater.theaterId}>
                      {theater.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
          
          {filterType === 'theaterBrand' && (
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id="theater-brand-label">Chuỗi rạp</InputLabel>
                <Select
                  labelId="theater-brand-label"
                  id="theater-brand"
                  value={theaterBrandId}
                  label="Chuỗi rạp"
                  onChange={(e) => setTheaterBrandId(e.target.value)}
                >
                  <MenuItem value="">Tất cả</MenuItem>
                  {theaterBrands.map((brand) => (
                    <MenuItem key={brand.theaterBrandId} value={brand.theaterBrandId}>
                      {brand.theaterBrandName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
          
          {filterType === 'movie' && (
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id="movie-label">Phim</InputLabel>
                <Select
                  labelId="movie-label"
                  id="movie"
                  value={movieId}
                  label="Phim"
                  onChange={(e) => setMovieId(e.target.value)}
                >
                  <MenuItem value="">Tất cả</MenuItem>
                  {movies.map((movie) => (
                    <MenuItem key={movie.movieId} value={movie.movieId}>
                      {movie.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
          
          {filterType === 'genre' && (
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id="genre-label">Thể loại</InputLabel>
                <Select
                  labelId="genre-label"
                  id="genre"
                  value={genreId}
                  label="Thể loại"
                  onChange={(e) => setGenreId(e.target.value)}
                >
                  <MenuItem value="">Tất cả</MenuItem>
                  {genres.map((genre) => (
                    <MenuItem key={genre.genreId} value={genre.genreId}>
                      {genre.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
          
          {filterType === 'seatType' && (
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id="seat-type-label">Loại ghế</InputLabel>
                <Select
                  labelId="seat-type-label"
                  id="seat-type"
                  value={seatTypeId}
                  label="Loại ghế"
                  onChange={(e) => setSeatTypeId(e.target.value)}
                >
                  <MenuItem value="">Tất cả</MenuItem>
                  {seatTypes.map((seatType) => (
                    <MenuItem key={seatType.seatTypeId} value={seatType.seatTypeId}>
                      {seatType.typeName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
          
          <Grid item xs={12}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
            >
              Tìm kiếm
            </Button>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default RevenueFilterForm;