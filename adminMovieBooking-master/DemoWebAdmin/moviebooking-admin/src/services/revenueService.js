import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const revenueService = {
  getRevenueByDate: (filter) => {
    return axios.post(`${API_URL}/revenue/by-date`, filter);
  },
  
  getRevenueByTheater: (filter) => {
    return axios.post(`${API_URL}/revenue/by-theater`, filter);
  },
  
  getRevenueByTheaterBrand: (filter) => {
    return axios.post(`${API_URL}/revenue/by-theater-brand`, filter);
  },
  
  getRevenueByMovie: (filter) => {
    return axios.post(`${API_URL}/revenue/by-movie`, filter);
  },
  
  getRevenueByGenre: (filter) => {
    return axios.post(`${API_URL}/revenue/by-genre`, filter);
  },
  
  getRevenueBySeatType: (filter) => {
    return axios.post(`${API_URL}/revenue/by-seat-type`, filter);
  }
};

export default revenueService;