import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Paper, Box, CircularProgress, Grid,
  TextField, Button, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { vi } from 'date-fns/locale';
import { toast } from 'react-toastify';
import RevenueList from './RevenueList';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const RevenueForm = () => {
  const [filterType, setFilterType] = useState('date');
  const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 30)));
  const [endDate, setEndDate] = useState(new Date());
  const [selectedValue, setSelectedValue] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [theaters, setTheaters] = useState([]);
  const [theaterBrands, setTheaterBrands] = useState([]);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [seatTypes, setSeatTypes] = useState([]);

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [theaterRes, brandRes, movieRes, genreRes, seatTypeRes] = await Promise.all([
          fetch(`${API_URL}/admin/theaters`).then(res => res.json()),
          fetch(`${API_URL}/admin/theaterbrands`).then(res => res.json()),
          fetch(`${API_URL}/movie/all`).then(res => res.json()),
          fetch(`${API_URL}/genre/all`).then(res => res.json()),
          fetch(`${API_URL}/admin/seattypes`).then(res => res.json()),
        ]);

        setTheaters(theaterRes.data || []);
        setTheaterBrands(brandRes.data || []);
        setMovies(movieRes);
        setGenres(genreRes);
        setSeatTypes(seatTypeRes.data?.seatTypes || []);
      } catch (err) {
        toast.error('Lỗi khi tải dữ liệu dropdown');
      }
    };
    fetchDropdowns();
  }, []);

  const fetchRevenue = async () => {
    setLoading(true);
    const filter = {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    };

    if (selectedValue) {
      switch (filterType) {
        case 'theater': filter.theaterId = parseInt(selectedValue); break;
        case 'theaterBrand': filter.theaterBrandId = parseInt(selectedValue); break;
        case 'movie': filter.movieId = parseInt(selectedValue); break;
        case 'genre': filter.genreId = parseInt(selectedValue); break;
        case 'seatType': filter.seatTypeId = parseInt(selectedValue); break;
        default: break;
      }
    }

    try {
      const res = await fetch(`${API_URL}/revenue/by-${filterType}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filter)
      });
      const json = await res.json();
      setData(json);
      toast.success('Tải dữ liệu thành công');
    } catch (err) {
      toast.error('Lỗi khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: data?.details?.map(item => item.label || ''),
    datasets: [{
      label: 'Doanh thu (VND)',
      data: data?.details?.map(item => item.amount),
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Biểu đồ doanh thu' }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: value => new Intl.NumberFormat('vi-VN', {
            notation: 'compact', compactDisplay: 'short'
          }).format(value)
        }
      }
    }
  };

  const renderDropdown = () => {
    const map = {
      theater: { label: 'Rạp', options: theaters, id: 'id', name: 'name' },
      theaterBrand: { label: 'Chuỗi rạp', options: theaterBrands, id: 'theaterBrandId', name: 'theaterBrandName' },
      movie: { label: 'Phim', options: movies, id: 'movieId', name: 'title' },
      genre: { label: 'Thể loại', options: genres, id: 'genreId', name: 'name' },
      seatType: { label: 'Loại ghế', options: seatTypes, id: 'seatTypeId', name: 'typeName' }
    };

    const current = map[filterType];
    if (!current) return null;

    return (
      <Grid item xs={12} md={3}>
        <FormControl fullWidth sx={{ minWidth: 220 }}>
          <InputLabel>{current.label}</InputLabel>
          <Select
            value={selectedValue}
            label={current.label}
            onChange={(e) => setSelectedValue(e.target.value)}
          >
            <MenuItem value="">Tất cả</MenuItem>
            {Array.isArray(current.options) && current.options.map((item) => (
              <MenuItem key={item[current.id]} value={item[current.id]}>
                {item[current.name]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    );
  };

  const formatMoney = (amount) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>Quản lý doanh thu</Typography>

      {/* Bộ lọc */}
      <Paper sx={{ p: 3, mb: 3, width: '100%' }}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Loại báo cáo</InputLabel>
                <Select
                  value={filterType}
                  label="Loại báo cáo"
                  onChange={(e) => {
                    setFilterType(e.target.value);
                    setSelectedValue('');
                  }}
                >
                  <MenuItem value="date">Theo ngày</MenuItem>
                  <MenuItem value="theater">Theo rạp</MenuItem>
                  <MenuItem value="theaterBrand">Theo chuỗi rạp</MenuItem>
                  <MenuItem value="movie">Theo phim</MenuItem>
                  <MenuItem value="genre">Theo thể loại</MenuItem>
                  <MenuItem value="seatType">Theo loại ghế</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <DatePicker
                label="Từ ngày"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <DatePicker
                label="Đến ngày"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Grid>
            {renderDropdown()}
            <Grid item xs={12} md={3} display="flex" alignItems="center">
              <Button variant="contained" fullWidth onClick={fetchRevenue}>
                Tìm kiếm
              </Button>
            </Grid>
          </Grid>
        </LocalizationProvider>
      </Paper>

      {/* Biểu đồ + danh sách */}
      {loading ? (
        <Box display="flex" justifyContent="center"><CircularProgress /></Box>
      ) : data && (
        <>
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            {/* Biểu đồ */}
            <Paper sx={{ flex: 1, minWidth: 400, height: 500, p: 2, overflow: 'auto' }}>
              <Box sx={{ height: '100%' }}>
                <Bar data={chartData} options={chartOptions} />
              </Box>
            </Paper>

            {/* Danh sách */}
            <Box sx={{ flex: 1, minWidth: 400 }}>
              <RevenueList data={data} />
            </Box>
          </Box>

          {/* Tổng doanh thu */}
          <Paper sx={{ p: 2, width: '100%' }}>
            <Typography variant="h6" fontWeight="bold">
              Tổng doanh thu:
            </Typography>
            <Typography variant="h5" color="primary">
              {formatMoney(data.totalRevenue)}
            </Typography>
          </Paper>
        </>
      )}
    </Container>
  );
};

export default RevenueForm;
