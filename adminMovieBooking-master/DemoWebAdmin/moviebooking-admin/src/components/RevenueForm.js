// RevenueForm.js
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Paper, Box, CircularProgress, Grid,
  TextField, Button, MenuItem
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
  CategoryScale, LinearScale, BarElement,
  Title, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const RevenueForm = () => {
  const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 30)));
  const [endDate, setEndDate] = useState(new Date());
  const [theaterId, setTheaterId] = useState('');
  const [movieId, setMovieId] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [theaters, setTheaters] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [theaterRes, movieRes] = await Promise.all([
          fetch(`${API_URL}/admin/theaters`).then(res => res.json()),
          fetch(`${API_URL}/movie/all`).then(res => res.json()),
        ]);
        setTheaters(Array.isArray(theaterRes) ? theaterRes : theaterRes?.data || []);
        setMovies(Array.isArray(movieRes) ? movieRes : movieRes?.data || []);
      } catch (err) {
        toast.error('Lỗi khi tải danh sách rạp/phim');
      }
    };
    fetchDropdowns();
  }, []);

  const fetchRevenue = async () => {
    setLoading(true);
    const filter = {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      theaterId: theaterId ? parseInt(theaterId) : null,
      movieId: movieId ? parseInt(movieId) : null
    };

    try {
      const res = await fetch(`${API_URL}/revenue/by-all`, {
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
    labels: data?.details?.map(item => item.label),
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

  const formatMoney = (amount) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>Quản lý doanh thu</Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={2.5}>
              <DatePicker
                label="Từ ngày"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Grid>
            <Grid item xs={12} md={2.5}>
              <DatePicker
                label="Đến ngày"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Grid>
            <Grid item xs={12} md={2.5}>
              <TextField
                select
                label="Rạp"
                fullWidth
                value={theaterId}
                onChange={(e) => setTheaterId(e.target.value)}
              >
                <MenuItem value="">Tất cả rạp</MenuItem>
                {theaters.map(theater => (
                  <MenuItem key={theater.id} value={theater.id}>{theater.name}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={2.5}>
              <TextField
                select
                label="Phim"
                fullWidth
                value={movieId}
                onChange={(e) => setMovieId(e.target.value)}
              >
                <MenuItem value="">Tất cả phim</MenuItem>
                {movies.map(movie => (
                  <MenuItem key={movie.movieId || movie.id} value={movie.movieId || movie.id}>{movie.title}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button variant="contained" onClick={fetchRevenue} fullWidth>Lọc doanh thu</Button>
            </Grid>
            {data && (
              <Grid item xs={12} md={12} sx={{ textAlign: 'right', mt: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">Tổng doanh thu:</Typography>
                <Typography variant="h6" color="primary">{formatMoney(data.totalRevenue)}</Typography>
              </Grid>
            )}
          </Grid>
        </LocalizationProvider>
      </Paper>

      {loading ? (
        <Box display="flex" justifyContent="center"><CircularProgress /></Box>
      ) : data && (
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <Paper sx={{ flex: 1, minWidth: 400, height: 500, p: 2 }}>
            <Bar data={chartData} options={chartOptions} />
          </Paper>
          <Box sx={{ flex: 1, minWidth: 400 }}>
            <RevenueList data={data} />
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default RevenueForm;
