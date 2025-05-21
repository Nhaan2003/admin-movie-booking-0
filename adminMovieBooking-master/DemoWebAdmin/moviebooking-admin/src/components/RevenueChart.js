import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
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

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = ({ data, filterType }) => {
  if (!data || !data.details || data.details.length === 0) {
    return null;
  }

  const getChartTitle = () => {
    switch (filterType) {
      case 'date': return 'Doanh thu theo ngày';
      case 'theater': return 'Doanh thu theo rạp';
      case 'theaterBrand': return 'Doanh thu theo chuỗi rạp';
      case 'movie': return 'Doanh thu theo phim';
      case 'genre': return 'Doanh thu theo thể loại phim';
      case 'seatType': return 'Doanh thu theo loại ghế';
      default: return 'Biểu đồ doanh thu';
    }
  };

  // Prepare data for the chart
  const chartData = {
    labels: data.details.map(item => item.label),
    datasets: [
      {
        label: 'Doanh thu (VND)',
        data: data.details.map(item => item.amount),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: getChartTitle(),
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return new Intl.NumberFormat('vi-VN').format(context.parsed.y) + ' VND';
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return new Intl.NumberFormat('vi-VN', { 
              notation: 'compact',
              compactDisplay: 'short'
            }).format(value);
          }
        }
      }
    }
  };

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" gutterBottom>{getChartTitle()}</Typography>
      
      <Paper sx={{ p: 2 }}>
        <Box sx={{ height: 400 }}>
          <Bar data={chartData} options={options} />
        </Box>
      </Paper>
    </Box>
  );
};

export default RevenueChart;