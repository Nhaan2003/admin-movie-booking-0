import React, { useState } from 'react';
import { Container, Typography, Paper, Box, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import RevenueFilterForm from './RevenueFilterForm';
import RevenueList from './RevenueList';
import RevenueChart from './RevenueChart';
import revenueService from '../services/revenueService';

const RevenueManagement = () => {
  const [filterType, setFilterType] = useState('date');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (type, filter) => {
    setLoading(true);
    setFilterType(type);
    
    try {
      let response;
      
      switch (type) {
        case 'date':
          response = await revenueService.getRevenueByDate(filter);
          break;
        case 'theater':
          response = await revenueService.getRevenueByTheater(filter);
          break;
        case 'theaterBrand':
          response = await revenueService.getRevenueByTheaterBrand(filter);
          break;
        case 'movie':
          response = await revenueService.getRevenueByMovie(filter);
          break;
        case 'genre':
          response = await revenueService.getRevenueByGenre(filter);
          break;
        case 'seatType':
          response = await revenueService.getRevenueBySeatType(filter);
          break;
        default:
          response = await revenueService.getRevenueByDate(filter);
      }
      
      setData(response.data);
      toast.success('Đã tải dữ liệu doanh thu thành công');
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu doanh thu:', error);
      toast.error('Không thể tải dữ liệu doanh thu. Vui lòng thử lại sau.');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Quản lý doanh thu
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <RevenueFilterForm onSearch={handleSearch} />
      </Paper>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        data && (
          <>
            <RevenueChart data={data} filterType={filterType} />
            <RevenueList data={data} filterType={filterType} />
          </>
        )
      )}
    </Container>
  );
};

export default RevenueManagement;