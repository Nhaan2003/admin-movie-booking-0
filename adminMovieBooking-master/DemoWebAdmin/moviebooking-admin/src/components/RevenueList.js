import React from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography, Box
} from '@mui/material';

const RevenueList = ({ data, filterType }) => {
  if (!data || !data.details || data.details.length === 0) {
    return (
      <Box sx={{ my: 2 }}>
        <Typography variant="body1">Không có dữ liệu doanh thu phù hợp với điều kiện tìm kiếm.</Typography>
      </Box>
    );
  }

  const getColumnLabel = () => {
    switch (filterType) {
      case 'date': return 'Ngày';
      case 'theater': return 'Rạp';
      case 'theaterBrand': return 'Chuỗi rạp';
      case 'movie': return 'Phim';
      case 'genre': return 'Thể loại phim';
      case 'seatType': return 'Loại ghế';
      default: return 'Danh mục';
    }
  };

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" gutterBottom>Báo cáo doanh thu {getColumnLabel().toLowerCase()}</Typography>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="revenue table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell><strong>{getColumnLabel()}</strong></TableCell>
              <TableCell align="right"><strong>Doanh thu (VND)</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.details.map((row, index) => (
              <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
                <TableCell component="th" scope="row">
                  {row.label}
                </TableCell>
                <TableCell align="right">
                  {new Intl.NumberFormat('vi-VN').format(row.amount)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
              <TableCell><strong>Tổng doanh thu</strong></TableCell>
              <TableCell align="right">
                <strong>{new Intl.NumberFormat('vi-VN').format(data.totalRevenue)}</strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RevenueList;