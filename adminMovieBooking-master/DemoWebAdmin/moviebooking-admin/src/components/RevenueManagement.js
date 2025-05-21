import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, TextField, Button, 
  FormControl, InputLabel, Select, MenuItem, Table, TableHead, 
  TableBody, TableRow, TableCell, TableContainer, CircularProgress
} from '@mui/material';
import { BarChart as BarChartIcon, FilterAlt as FilterIcon } from '@mui/icons-material';
import axios from 'axios';

const RevenueManagement = () => {
  // States for filters
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [theaterBrandId, setTheaterBrandId] = useState('');
  const [theaterId, setTheaterId] = useState('');
  const [movieId, setMovieId] = useState('');
  const [seatTypeId, setSeatTypeId] = useState('');
  
  // States for data
  const [loading, setLoading] = useState(false);
  const [theaterBrands, setTheaterBrands] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [movies, setMovies] = useState([]);
  const [seatTypes, setSeatTypes] = useState([]);
  const [revenueData, setRevenueData] = useState(null);
  
  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandsRes, moviesRes, typesRes] = await Promise.all([
          axios.get('http://localhost:8080/api/theaterbrand/all'),
          axios.get('http://localhost:8080/api/movie/all'),
          axios.get('http://localhost:8080/api/seattype/all')
        ]);
        
        setTheaterBrands(brandsRes.data);
        setMovies(moviesRes.data);
        setSeatTypes(typesRes.data);
        
        // Set default dates (last 30 days)
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 30);
        
        setStartDate(formatDateForInput(start));
        setEndDate(formatDateForInput(end));
        
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    
    fetchData();
  }, []);
  
  // Update theaters when theater brand changes
  useEffect(() => {
    const fetchTheaters = async () => {
      if (!theaterBrandId) {
        setTheaters([]);
        setTheaterId('');
        return;
      }
      
      try {
        const response = await axios.get(`http://localhost:8080/api/theater/by-brand/${theaterBrandId}`);
        setTheaters(response.data);
      } catch (error) {
        console.error("Error fetching theaters:", error);
      }
    };
    
    fetchTheaters();
  }, [theaterBrandId]);
  
  // Format date for input field
  const formatDateForInput = (date) => {
    return date.toISOString().split('T')[0];
  };
  
  // Handle search button click
  const handleSearch = async () => {
    setLoading(true);
    
    try {
      const params = {
        startDate,
        endDate,
        theaterBrandId: theaterBrandId || null,
        theaterId: theaterId || null,
        movieId: movieId || null,
        seatTypeId: seatTypeId || null
      };
      
      const response = await axios.post('http://localhost:8080/api/revenue/search', params);
      setRevenueData(response.data);
    } catch (error) {
      console.error("Error searching revenue data:", error);
      alert("Không thể tải dữ liệu doanh thu. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  // Mock data (replace with actual data from API)
  const mockRevenueData = {
    totalRevenue: 1850000000,
    details: [
      { date: '21/05/2025', theater: 'CGV Aeon Mall', movie: 'Avengers: Endgame', seats: 'VIP', ticketCount: 130, revenue: 156000000 },
      { date: '20/05/2025', theater: 'BHD Star Phạm Ngọc Thạch', movie: 'Spider-Man: No Way Home', seats: 'Thường', ticketCount: 85, revenue: 93500000 },
      { date: '19/05/2025', theater: 'CGV Crescent Mall', movie: 'The Batman', seats: 'Đôi', ticketCount: 95, revenue: 114000000 },
      { date: '18/05/2025', theater: 'Lotte Cantavil', movie: 'Doctor Strange 2', seats: 'VIP', ticketCount: 110, revenue: 132000000 },
      { date: '17/05/2025', theater: 'Galaxy Nguyễn Du', movie: 'Avengers: Endgame', seats: 'Thường', ticketCount: 75, revenue: 82500000 }
    ]
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <BarChartIcon sx={{ fontSize: 30, mr: 2, color: 'primary.main' }} />
        <Typography variant="h4" component="h1">
          Quản lý doanh thu
        </Typography>
      </Box>
      
      {/* Filter Panel */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <FilterIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Bộ lọc báo cáo doanh thu</Typography>
        </Box>
        
        <Grid container spacing={2}>
          {/* Date Range */}
          <Grid item xs={12} md={5}>
            <TextField
              label="Ngày bắt đầu"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField
              label="Ngày kết thúc"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSearch} 
              fullWidth 
              sx={{ height: '100%' }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Tìm kiếm'}
            </Button>
          </Grid>
          
          {/* Filters */}
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Chuỗi rạp</InputLabel>
              <Select
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
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Rạp</InputLabel>
              <Select
                value={theaterId}
                label="Rạp"
                onChange={(e) => setTheaterId(e.target.value)}
                disabled={!theaterBrandId}
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
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Phim</InputLabel>
              <Select
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
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Loại ghế</InputLabel>
              <Select
                value={seatTypeId}
                label="Loại ghế"
                onChange={(e) => setSeatTypeId(e.target.value)}
              >
                <MenuItem value="">Tất cả</MenuItem>
                {seatTypes.map((type) => (
                  <MenuItem key={type.seatTypeId} value={type.seatTypeId}>
                    {type.typeName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', bgcolor: '#e3f2fd' }}>
            <Typography variant="h6" gutterBottom>
              Tổng doanh thu
            </Typography>
            <Typography variant="h4" component="div">
              {new Intl.NumberFormat('vi-VN').format(mockRevenueData.totalRevenue)} VNĐ
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', bgcolor: '#fff3e0' }}>
            <Typography variant="h6" gutterBottom>
              Số vé đã bán
            </Typography>
            <Typography variant="h4" component="div">
              {new Intl.NumberFormat('vi-VN').format(495)} vé
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', bgcolor: '#f3e5f5' }}>
            <Typography variant="h6" gutterBottom>
              Giá vé trung bình
            </Typography>
            <Typography variant="h4" component="div">
              {new Intl.NumberFormat('vi-VN').format(3737374)} VNĐ
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Data Table */}
      <Paper sx={{ p: 2, overflowX: 'auto' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Chi tiết doanh thu
        </Typography>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell><strong>Ngày</strong></TableCell>
                <TableCell><strong>Rạp</strong></TableCell>
                <TableCell><strong>Phim</strong></TableCell>
                <TableCell><strong>Loại ghế</strong></TableCell>
                <TableCell align="right"><strong>Số vé</strong></TableCell>
                <TableCell align="right"><strong>Doanh thu (VNĐ)</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockRevenueData.details.map((row, index) => (
                <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.theater}</TableCell>
                  <TableCell>{row.movie}</TableCell>
                  <TableCell>{row.seats}</TableCell>
                  <TableCell align="right">{new Intl.NumberFormat('vi-VN').format(row.ticketCount)}</TableCell>
                  <TableCell align="right">{new Intl.NumberFormat('vi-VN').format(row.revenue)}</TableCell>
                </TableRow>
              ))}
              <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
                <TableCell colSpan={4}><strong>Tổng cộng</strong></TableCell>
                <TableCell align="right"><strong>{new Intl.NumberFormat('vi-VN').format(495)}</strong></TableCell>
                <TableCell align="right"><strong>{new Intl.NumberFormat('vi-VN').format(578000000)}</strong></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      
      {/* Optional: Simple Bar Chart using div elements */}
      <Paper sx={{ p: 2, mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Biểu đồ doanh thu theo ngày
        </Typography>
        
        <Box sx={{ display: 'flex', height: 300, alignItems: 'flex-end' }}>
          {mockRevenueData.details.map((item, index) => (
            <Box
              key={index}
              sx={{
                flex: 1,
                m: 0.5,
                bgcolor: 'primary.main',
                height: `${item.revenue / 2000000}%`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                '&:hover': {
                  bgcolor: 'primary.dark',
                }
              }}
            >
              <Typography 
                variant="caption" 
                sx={{ 
                  position: 'absolute', 
                  top: -25, 
                  color: 'text.primary',
                  fontWeight: 'bold'
                }}
              >
                {new Intl.NumberFormat('vi-VN', {
                  notation: 'compact',
                  compactDisplay: 'short'
                }).format(item.revenue)}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  position: 'absolute', 
                  bottom: -25, 
                  color: 'text.secondary',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%'
                }}
              >
                {item.date}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default RevenueManagement;