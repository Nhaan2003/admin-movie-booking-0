import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TextField, Paper
} from '@mui/material';
import { Search } from '@mui/icons-material';

const RevenueList = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (!data?.details) return;
    const term = searchTerm.toLowerCase();
    const result = data.details.filter(item =>
      typeof item.label === 'string' && item.label.toLowerCase().includes(term)
    );
    setFiltered(result);
  }, [searchTerm, data]);

  const formatMoney = (amount) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

  const totalFiltered = filtered.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Paper sx={{ p: 2, height: 500, overflow: 'auto', display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* Tìm kiếm */}
      <TextField
        placeholder="Tìm kiếm theo tên..."
        variant="outlined"
        size="small"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: <Search sx={{ mr: 1, color: 'gray' }} />
        }}
      />

      {/* Bảng dữ liệu */}
      <Box sx={{ flexGrow: 1 }}>
        {filtered.length === 0 ? (
          <Typography align="center">Không có dữ liệu phù hợp.</Typography>
        ) : (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Tên</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>Doanh thu (VND)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{item.label}</TableCell>
                    <TableCell align="right">{formatMoney(item.amount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Tổng doanh thu sau lọc */}
      {filtered.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" fontWeight="bold">
            Tổng doanh thu tìm kiếm:
          </Typography>
          <Typography variant="body1" color="primary">
            {formatMoney(totalFiltered)}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default RevenueList;
