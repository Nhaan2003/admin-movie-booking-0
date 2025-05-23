import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Paper, Box, CircularProgress, Grid,
  TextField, Button, MenuItem, Card, CardContent, Divider,
  IconButton, Tooltip, Fade, useTheme, Chip, Stack,
  List, ListItem, ListItemText, ListItemIcon, Menu,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { vi } from 'date-fns/locale';
import { toast } from 'react-toastify';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement,
  Title, Tooltip as ChartTooltip, Legend
} from 'chart.js';
import {
  FilterAlt, Refresh, TrendingUp,
  LocalMovies, TheaterComedy, DateRange,
  KeyboardArrowDown, Search, Close, FormatListBulleted,
  PieChart, BarChart, ShowChart, MovieFilter
} from '@mui/icons-material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, Legend);

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Component RevenueList tích hợp sẵn
const RevenueList = ({ data }) => {
  const theme = useTheme();

  if (!data || !data.details || !data.details.length) {
    return (
      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderRadius: 2,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography color="text.secondary">
          Không có dữ liệu doanh thu để hiển thị
        </Typography>
      </Paper>
    );
  }

  const formatMoney = (amount) =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(amount);

  const parseLabel = (label) => {
    const parts = label.split(' - ');
    return {
      movie: parts[0] || '',
      theater: parts[1] || ''
    };
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          <FormatListBulleted sx={{ mr: 1, verticalAlign: 'middle' }} />
          Chi tiết doanh thu
        </Typography>
        <Box>
          <Chip
            label={`Tổng cộng: ${formatMoney(data.totalRevenue)}`}
            color="primary"
            variant="outlined"
          />
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <TableContainer sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Phim</TableCell>
              <TableCell>Rạp</TableCell>
              <TableCell align="right">Doanh thu</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.details.map((item, index) => {
              const { movie, theater } = parseLabel(item.label);
              return (
                <TableRow
                  key={index}
                  hover
                  sx={{
                    '&:nth-of-type(odd)': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{movie}</TableCell>
                  <TableCell>{theater}</TableCell>
                  <TableCell align="right">
                    <Typography
                      fontWeight={500}
                      color={theme.palette.success.dark}
                    >
                      {formatMoney(item.amount)}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

// Component RevenueForm chính
const RevenueForm = () => {
  const theme = useTheme();
  const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 30)));
  const [endDate, setEndDate] = useState(new Date());
  const [theaterId, setTheaterId] = useState('');
  const [movieId, setMovieId] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filterApplied, setFilterApplied] = useState(false);

  const [theaters, setTheaters] = useState([]);
  const [movies, setMovies] = useState([]);

  // Menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const [movieAnchorEl, setMovieAnchorEl] = useState(null);
  
  const open = Boolean(anchorEl);
  const movieMenuOpen = Boolean(movieAnchorEl);

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const response = await axios.get(`${API_URL}/admin/theaters`);
        const theaterData = Array.isArray(response.data) 
          ? response.data 
          : response.data?.data || [];
        setTheaters(theaterData);
      } catch (err) {
        console.error('Error fetching theaters:', err);
        toast.error('Lỗi khi tải danh sách rạp');
      }
    };

    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${API_URL}/admin/movies`);
        const movieData = response.data?.data || [];
        setMovies(movieData);
      } catch (err) {
        console.error('Error fetching movies:', err);
        toast.error('Lỗi khi tải danh sách phim');
      }
    };

    fetchTheaters();
    fetchMovies();
    
    // Tự động tải dữ liệu khi component được mount
    setTimeout(() => {
      if (!filterApplied) {
        fetchRevenue();
        setFilterApplied(true);
      }
    }, 500);
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
      const res = await axios.post(`${API_URL}/revenue/by-all`, filter);
      setData(res.data);
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
        icon: <ShowChart />,
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
    const movieTitle = movieId ? movies.find(m => (m.movieId || m.id) == movieId)?.title || 'Đã chọn phim' : 'Tất cả phim';

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

  const chartData = generateChartData();

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
            
            {/* Dropdown chọn rạp */}
            <Grid item xs={12} md={2.5}>
              <Button
                variant="outlined"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                fullWidth
                startIcon={<TheaterComedy />}
                endIcon={<KeyboardArrowDown />}
                sx={{
                  minWidth: 200,
                  justifyContent: 'space-between',
                  textTransform: 'none',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  height: '38px',
                  backgroundColor: 'white'
                }}
              >
                {theaterId
                  ? theaters.find(t => t.id == theaterId)?.name || 'Chọn rạp'
                  : 'Tất cả rạp'}
              </Button>
              <Menu 
                anchorEl={anchorEl} 
                open={open} 
                onClose={() => setAnchorEl(null)}
                PaperProps={{
                  style: {
                    maxHeight: 300,
                    width: 250,
                  },
                }}
              >
                <MenuItem onClick={() => { setTheaterId(''); setAnchorEl(null); }}>
                  <ListItemIcon><TheaterComedy fontSize="small" /></ListItemIcon>
                  <ListItemText>Tất cả rạp</ListItemText>
                </MenuItem>
                <Divider />
                {theaters.map(theater => (
                  <MenuItem key={theater.id} onClick={() => {
                    setTheaterId(theater.id.toString());
                    setAnchorEl(null);
                  }}>
                    <ListItemIcon><TheaterComedy fontSize="small" /></ListItemIcon>
                    <ListItemText>{theater.name}</ListItemText>
                  </MenuItem>
                ))}
              </Menu>
            </Grid>

            {/* Dropdown chọn phim */}
            <Grid item xs={12} md={2.5}>
              <Button
                variant="outlined"
                onClick={(e) => setMovieAnchorEl(e.currentTarget)}
                fullWidth
                startIcon={<MovieFilter />}
                endIcon={<KeyboardArrowDown />}
                sx={{
                  minWidth: 200,
                  justifyContent: 'space-between',
                  textTransform: 'none',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  height: '38px',
                  backgroundColor: 'white'
                }}
              >
                {movieId
                  ? movies.find(m => (m.movieId || m.id).toString() === movieId)?.title || 'Chọn phim'
                  : 'Tất cả phim'}
              </Button>
              <Menu 
                anchorEl={movieAnchorEl} 
                open={movieMenuOpen} 
                onClose={() => setMovieAnchorEl(null)}
                PaperProps={{
                  style: {
                    maxHeight: 300,
                    width: 250,
                  },
                }}
              >
                <MenuItem onClick={() => { setMovieId(''); setMovieAnchorEl(null); }}>
                  <ListItemIcon><MovieFilter fontSize="small" /></ListItemIcon>
                  <ListItemText>Tất cả phim</ListItemText>
                </MenuItem>
                <Divider />
                {movies.map(movie => (
                  <MenuItem key={movie.movieId || movie.id} onClick={() => {
                    setMovieId((movie.movieId || movie.id).toString());
                    setMovieAnchorEl(null);
                  }}>
                    <ListItemIcon><MovieFilter fontSize="small" /></ListItemIcon>
                    <ListItemText>{movie.title}</ListItemText>
                  </MenuItem>
                ))}
              </Menu>
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
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
                <BarChart sx={{ mr: 1, verticalAlign: 'middle' }} />
                Biểu đồ phân tích doanh thu
              </Typography>
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
              {/* Sử dụng component RevenueList tích hợp */}
              <RevenueList data={data} />
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
};

export default RevenueForm;