// RevenueList.js
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

  const parseLabel = (label) => {
    const [movie, theater] = label.split(' - ');
    return { movie, theater };
  };

  return (
    <Paper sx={{ p: 2, height: 500, overflow: 'auto', display: 'flex', flexDirection: 'column', width: '100%' }}>
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

      <Box sx={{ flexGrow: 1 }}>
        {filtered.length === 0 ? (
          <Typography align="center">Không có dữ liệu phù hợp.</Typography>
        ) : (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Phim</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Rạp</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>Doanh thu (VND)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((item, idx) => {
                  const { movie, theater } = parseLabel(item.label);
                  return (
                    <TableRow key={idx}>
                      <TableCell>{movie}</TableCell>
                      <TableCell>{theater}</TableCell>
                      <TableCell align="right">{formatMoney(item.amount)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {filtered.length > 0 && (
        <Box sx={{ mt: 2, textAlign: 'right' }}>
          <Typography variant="subtitle2" fontWeight="bold">Tổng doanh thu tìm kiếm:</Typography>
          <Typography variant="body1" color="primary">{formatMoney(totalFiltered)}</Typography>
        </Box>
      )}
    </Paper>
  );
};

export default RevenueList;
