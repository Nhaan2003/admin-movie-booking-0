import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Divider
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";

const RevenueStatisticPage = () => {
  const [params, setParams] = useState({
    startDate: "2025-03-01T00:00:00",
    endDate: "2025-03-20T23:59:59",
    theaterBrand: "",
    theater: "",
    movie: "",
    seatType: ""
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const [theaterBrands, setTheaterBrands] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [movies, setMovies] = useState([]);
  const [seatTypes, setSeatTypes] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [brandRes, theaterRes, movieRes, seatTypeRes] = await Promise.all([
          axios.get("http://localhost:8080/api/theater-brands"),
          axios.get("http://localhost:8080/api/theaters"),
          axios.get("http://localhost:8080/api/movies"),
          axios.get("http://localhost:8080/api/seat-types")
        ]);

        setTheaterBrands(brandRes.data);
        setTheaters(theaterRes.data);
        setMovies(movieRes.data);
        setSeatTypes(seatTypeRes.data);
      } catch (err) {
        console.error("Lỗi khi load dữ liệu lọc:", err);
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/api/statistics/revenue", {
        params: params
      });
      setResults(res.data);
    } catch (err) {
      console.error(err);
      alert("Đã xảy ra lỗi khi truy vấn doanh thu.");
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = results.reduce((sum, item) => sum + (item.total || 0), 0);

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Quản lý Doanh thu
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }} elevation={3}>
        <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center">
          <TextField
            name="startDate"
            label="Từ ngày"
            type="datetime-local"
            value={params.startDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="endDate"
            label="Đến ngày"
            type="datetime-local"
            value={params.endDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />

          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>Thương hiệu rạp</InputLabel>
            <Select
              name="theaterBrand"
              value={params.theaterBrand}
              label="Thương hiệu rạp"
              onChange={handleChange}
            >
              <MenuItem value="">Tất cả</MenuItem>
              {theaterBrands.map((b) => (
                <MenuItem key={b.id} value={b.theaterBrandName}>{b.theaterBrandName}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>Tên rạp</InputLabel>
            <Select
              name="theater"
              value={params.theater}
              label="Tên rạp"
              onChange={handleChange}
            >
              <MenuItem value="">Tất cả</MenuItem>
              {theaters.map((t) => (
                <MenuItem key={t.id} value={t.name}>{t.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>Tên phim</InputLabel>
            <Select
              name="movie"
              value={params.movie}
              label="Tên phim"
              onChange={handleChange}
            >
              <MenuItem value="">Tất cả</MenuItem>
              {movies.map((m) => (
                <MenuItem key={m.id} value={m.title}>{m.title}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>Loại ghế</InputLabel>
            <Select
              name="seatType"
              value={params.seatType}
              label="Loại ghế"
              onChange={handleChange}
            >
              <MenuItem value="">Tất cả</MenuItem>
              {seatTypes.map((s) => (
                <MenuItem key={s.id} value={s.typeName}>{s.typeName}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" color="primary" onClick={handleSearch} disabled={loading}>
            {loading ? "Đang tải..." : "Tìm kiếm"}
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Kết quả: {results.length} dòng
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Ngày</strong></TableCell>
              <TableCell><strong>Thương hiệu</strong></TableCell>
              <TableCell><strong>Rạp</strong></TableCell>
              <TableCell><strong>Phim</strong></TableCell>
              <TableCell><strong>Loại ghế</strong></TableCell>
              <TableCell align="right"><strong>Doanh thu</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((r, idx) => (
              <TableRow key={idx}>
                <TableCell>{dayjs(r.date).format("DD/MM/YYYY")}</TableCell>
                <TableCell>{r.theaterBrand}</TableCell>
                <TableCell>{r.theater}</TableCell>
                <TableCell>{r.movie}</TableCell>
                <TableCell>{r.seatType}</TableCell>
                <TableCell align="right">{r.total?.toLocaleString()} VND</TableCell>
              </TableRow>
            ))}
            {results.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {results.length > 0 && (
          <Box mt={2} textAlign="right">
            <Divider sx={{ mb: 1 }} />
            <Typography variant="subtitle1">
              <strong>Tổng doanh thu:</strong> {totalRevenue.toLocaleString()} VND
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default RevenueStatisticPage;
