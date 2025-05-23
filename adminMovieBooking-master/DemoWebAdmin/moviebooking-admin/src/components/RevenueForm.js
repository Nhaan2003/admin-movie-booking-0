import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Paper, Box, CircularProgress, Grid,
  TextField, Button, MenuItem, Card, CardContent, Divider,
  IconButton, Tooltip, Fade, useTheme, Chip, Stack,
  Select, FormControl, InputLabel, OutlinedInput
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
  Title, Tooltip as ChartTooltip, Legend
} from 'chart.js';
import { 
  FilterAlt, Refresh, TrendingUp, 
  LocalMovies, TheaterComedy, DateRange,
  KeyboardArrowDown, Search
} from '@mui/icons-material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, Legend);

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const RevenueForm = () => {
  const theme = useTheme();
  const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 30)));
  const [endDate, setEndDate] = useState(new Date());
  const [theaterId, setTheaterId] = useState('');
  const [movieId, setMovieId] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filterApplied, setFilterApplied] = useState(false);
  const [movieSearchTerm, setMovieSearchTerm] = useState('');
  const [movieDropdownOpen, setMovieDropdownOpen] = useState(false);

  const [theaters, setTheaters] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        setLoading(true);
        const [theaterRes, movieRes] = await Promise.all([
          fetch(`${API_URL}/admin/theaters`).then(res => res.json()),
          fetch(`${API_URL}/movie/all`).then(res => res.json()),
        ]);
        
        const theaterData = Array.isArray(theaterRes) ? theaterRes : theaterRes?.data || [];
        const movieData = Array.isArray(movieRes) ? movieRes : movieRes?.data || [];
        
        setTheaters(theaterData);
        setMovies(movieData);
      } catch (err) {
        console.error('Error fetching data:', err);
        toast.error('Lỗi khi tải danh sách rạp/phim');
      } finally {
        setLoading(false);
      }
    };
    fetchDropdowns();
  }, []);

  useEffect(() => {
    // Load data automatically on initial render
    if (!filterApplied && theaters.length > 0 && movies.length > 0) {
      fetchRevenue();
      setFilterApplied(true);
    }
  }, [theaters, movies]);

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
      toast.success('Tải dữ liệu doanh thu thành công');
    } catch (err) {
      toast.error('Lỗi khi tải dữ liệu doanh thu');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setStartDate(new Date(new Date().setDate(new Date().getDate() - 30)));
    setEndDate(new Date());
    setTheaterId('');
    setMovieId('');
    setTimeout(() => {
      fetchRevenue();
    }, 100);
  };

  const generateChartData = () => {
    if (!data?.details?.length) return null;

    const backgroundColor = data.details.map((_, index) => {
      const hue = (index * 37) % 360; // Use golden ratio for color distribution
      return `hsla(${hue}, 70%, 60%, 0.8)`;
    });

    return {
      labels: data.details.map(item => {
        // Shorten long labels and reorder to show theater first
        const { movie, theater } = parseLabel(item.label);
        const label = `${theater} - ${movie}`; // Theater first, then movie
        return label.length > 25 ? label.substring(0, 23) + '...' : label;
      }),
      datasets: [{
        label: 'Doanh thu (VND)',
        data: data.details.map(item => item.amount),
        backgroundColor,
        borderColor: backgroundColor.map(color => color.replace('0.8', '1')),
        borderWidth: 1,
        borderRadius: 4,
        barThickness: 30,
      }]
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1500,
      easing: 'easeOutQuart'
    },
    plugins: {
      legend: { 
        position: 'top',
        labels: {
          font: {
            family: theme.typography.fontFamily
          }
        }
      },
      title: { 
        display: true, 
        text: 'Biểu đồ doanh thu',
        color: theme.palette.text.primary,
        font: {
          family: theme.typography.fontFamily,
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('vi-VN', {
                style: 'currency', currency: 'VND', 
                maximumFractionDigits: 0
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: theme.palette.divider,
        },
        ticks: {
          font: {
            family: theme.typography.fontFamily
          },
          callback: value => new Intl.NumberFormat('vi-VN', {
            notation: 'compact', 
            compactDisplay: 'short',
            style: 'currency',
            currency: 'VND',
            maximumFractionDigits: 0
          }).format(value)
        }
      },
      x: {
        grid: {
          color: theme.palette.divider,
          display: false
        },
        ticks: {
          font: {
            family: theme.typography.fontFamily
          },
        }
      }
    }
  };

  const formatMoney = (amount) =>
    new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(amount);

  // Calculate quick stats
  const getQuickStats = () => {
    if (!data?.details?.length) return [];

    // Get top movie
    const movieRevenues = {};
    data.details.forEach(item => {
      const { movie } = parseLabel(item.label);
      if (!movieRevenues[movie]) movieRevenues[movie] = 0;
      movieRevenues[movie] += item.amount;
    });
    const topMovie = Object.entries(movieRevenues)
      .sort((a, b) => b[1] - a[1])[0];

    // Get top theater
    const theaterRevenues = {};
    data.details.forEach(item => {
      const { theater } = parseLabel(item.label);
      if (!theaterRevenues[theater]) theaterRevenues[theater] = 0;
      theaterRevenues[theater] += item.amount;
    });
    const topTheater = Object.entries(theaterRevenues)
      .sort((a, b) => b[1] - a[1])[0];

    return [
      {
        title: 'Tổng doanh thu',
        value: formatMoney(data.totalRevenue),
        icon: <TrendingUp />,
        color: '#4caf50'
      },
      {
        title: 'Rạp doanh thu cao nhất',
        value: topTheater ? formatMoney(topTheater[1]) : 'N/A',
        subtitle: topTheater ? topTheater[0] : '',
        icon: <TheaterComedy />,
        color: '#ff9800'
      },
      {
        title: 'Phim doanh thu cao nhất',
        value: topMovie ? formatMoney(topMovie[1]) : 'N/A',
        subtitle: topMovie ? topMovie[0] : '',
        icon: <LocalMovies />,
        color: '#2196f3'
      },
      {
        title: 'Khoảng thời gian',
        value: `${data.details.length} ngày`,
        subtitle: `${formatDate(startDate)} - ${formatDate(endDate)}`,
        icon: <DateRange />,
        color: '#9c27b0'
      }
    ];
  };

  const parseLabel = (label) => {
    const parts = label.split(' - ');
    return {
      movie: parts[0] || '',
      theater: parts[1] || ''
    };
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getFilterDescription = () => {
    const theaterName = theaterId ? theaters.find(t => t.id == theaterId)?.name || '' : 'Tất cả rạp';
    const movieTitle = movieId ? movies.find(m => (m.movieId || m.id) == movieId)?.title || '' : 'Tất cả phim';

    return (
      <Box sx={{ mt: 1, mb: 2 }}>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Chip
            label={`Thời gian: ${formatDate(startDate)} → ${formatDate(endDate)}`}
            variant="outlined"
            size="small"
            icon={<DateRange fontSize="small" />}
          />
          <Chip
            label={`Rạp: ${theaterName}`}
            variant="outlined"
            size="small"
            icon={<TheaterComedy fontSize="small" />}
          />
          <Chip
            label={`Phim: ${movieTitle}`}
            variant="outlined"
            size="small"
            icon={<LocalMovies fontSize="small" />}
          />
        </Stack>
      </Box>
    );
  };

  // Lọc phim theo từ khóa tìm kiếm
  const filteredMovies = movies.filter(movie => {
    if (!movieSearchTerm) return true;
    const title = movie.title || '';
    return title.toLowerCase().includes(movieSearchTerm.toLowerCase());
  });
  
  // Xử lý khi người dùng chọn phim từ dropdown
  const handleMovieSelect = (id) => {
    setMovieId(id);
    setMovieDropdownOpen(false);
  };

  const chartData = generateChartData();

  // Custom style cho dropdown phim
  const CustomMovieDropdown = () => {
    const selectedMovie = movieId 
      ? movies.find(m => (m.movieId || m.id) == movieId)?.title 
      : 'Tất cả phim';
    
    return (
      <Box 
        sx={{
          position: 'relative',
          width: '100%',
          zIndex: movieDropdownOpen ? 10 : 1
        }}
      >
        <Box 
          onClick={() => setMovieDropdownOpen(!movieDropdownOpen)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: '4px',
            padding: '8px 12px',
            cursor: 'pointer',
            backgroundColor: theme.palette.background.paper,
            '&:hover': {
              borderColor: theme.palette.action.active
            }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocalMovies color="action" sx={{ mr: 1 }} />
            <Typography 
              variant="body1" 
              noWrap
              sx={{ 
                maxWidth: '200px',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {selectedMovie}
            </Typography>
          </Box>
          <KeyboardArrowDown 
            sx={{ 
              transform: movieDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s'
            }} 
          />
        </Box>
        
        {movieDropdownOpen && (
          <Paper 
            sx={{ 
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              mt: 0.5,
              maxHeight: '300px',
              overflow: 'auto',
              boxShadow: 3,
              zIndex: 100
            }}
          >
            <Box sx={{ p: 1, borderBottom: `1px solid ${theme.palette.divider}` }}>
              <TextField
                placeholder="Tìm kiếm phim..."
                size="small"
                fullWidth
                value={movieSearchTerm}
                onChange={(e) => setMovieSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Search fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Box>
            
            <Box onClick={() => handleMovieSelect('')} sx={{ p: 1.5, borderBottom: `1px solid ${theme.palette.divider}` }}>
              <Typography 
                sx={{ 
                  cursor: 'pointer',
                  fontWeight: movieId === '' ? 'bold' : 'normal',
                  '&:hover': { backgroundColor: theme.palette.action.hover },
                  p: 1,
                  borderRadius: 1
                }}
              >
                Tất cả phim
              </Typography>
            </Box>
            
            {filteredMovies.map((movie) => (
              <Box 
                key={movie.movieId || movie.id}
                onClick={() => handleMovieSelect(movie.movieId || movie.id)}
                sx={{ 
                  p: 1,
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: theme.palette.action.hover }
                }}
              >
                <Typography 
                  sx={{ 
                    p: 1,
                    borderRadius: 1,
                    fontWeight: movieId == (movie.movieId || movie.id) ? 'bold' : 'normal',
                  }}
                >
                  {movie.title}
                </Typography>
              </Box>
            ))}
            
            {filteredMovies.length === 0 && (
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography color="text.secondary">Không tìm thấy phim nào</Typography>
              </Box>
            )}
          </Paper>
        )}
      </Box>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 3, mb: 5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <TrendingUp sx={{ fontSize: 32, mr: 2, color: theme.palette.primary.main }} />
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 600, 
            background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Dashboard quản lý doanh thu
        </Typography>
      </Box>

      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          mb: 3, 
          borderRadius: 2,
          background: `linear-gradient(to right, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          }
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>Bộ lọc doanh thu</Typography>
        
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={2.5}>
              <DatePicker
                label="Từ ngày"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                renderInput={(params) => <TextField fullWidth {...params} />}
                maxDate={endDate}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} md={2.5}>
              <DatePicker
                label="Đến ngày"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                renderInput={(params) => <TextField fullWidth {...params} />}
                minDate={startDate}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} md={2.5}>
              <TextField
                select
                label="Rạp chiếu phim"
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
              {/* Custom movie dropdown để phù hợp với hình ảnh đã cung cấp */}
              <CustomMovieDropdown />
            </Grid>
            <Grid item xs={12} md={2}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button 
                  variant="contained" 
                  onClick={fetchRevenue} 
                  fullWidth
                  startIcon={<FilterAlt />}
                  sx={{
                    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
                    boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 10px 4px rgba(33, 150, 243, .3)',
                    }
                  }}
                >
                  Lọc doanh thu
                </Button>
                <Tooltip title="Đặt lại bộ lọc">
                  <IconButton onClick={resetFilters} color="secondary">
                    <Refresh />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
          </Grid>
        </LocalizationProvider>

        {data && getFilterDescription()}
      </Paper>

      {loading ? (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            height: 400,
            flexDirection: 'column',
            gap: 2
          }}
        >
          <CircularProgress size={60} thickness={4} />
          <Typography variant="body1" color="text.secondary">Đang tải dữ liệu doanh thu...</Typography>
        </Box>
      ) : data && (
        <>
          {/* Quick Stats Cards */}
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2}>
              {getQuickStats().map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Fade in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                    <Card 
                      sx={{ 
                        height: '100%', 
                        borderLeft: `4px solid ${stat.color}`,
                        transition: 'all 0.3s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: `0 8px 16px rgba(0,0,0,0.1)`,
                        }
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="subtitle2" color="text.secondary">
                            {stat.title}
                          </Typography>
                          <Box sx={{ 
                            backgroundColor: `${stat.color}20`, 
                            borderRadius: '50%',
                            p: 1,
                            display: 'flex',
                            color: stat.color
                          }}>
                            {stat.icon}
                          </Box>
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {stat.value}
                        </Typography>
                        {stat.subtitle && (
                          <Typography variant="body2" color="text.secondary" noWrap title={stat.subtitle}>
                            {stat.subtitle}
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <Paper 
              elevation={3} 
              sx={{ 
                flex: 1, 
                minWidth: 400, 
                height: 500, 
                p: 2,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>Biểu đồ phân tích doanh thu</Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ flexGrow: 1, position: 'relative' }}>
                {chartData ? (
                  <Bar data={chartData} options={chartOptions} />
                ) : (
                  <Box sx={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography color="text.secondary">Không có dữ liệu để hiển thị</Typography>
                  </Box>
                )}
              </Box>
            </Paper>
            
            <Box sx={{ flex: 1, minWidth: 400 }}>
              <RevenueList data={data} />
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
};

export default RevenueForm;