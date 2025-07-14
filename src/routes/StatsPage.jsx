import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";

const StatsPage = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("shortURLs") || "[]");
    setUrls(data);
  }, []);

  const formatDate = (ms) => new Date(ms).toLocaleString();
  const isExpired = (created, mins) => Date.now() > created + mins * 60000;

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        URL Stats
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Original</TableCell>
              <TableCell>Shortcode</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Expiry</TableCell>
              <TableCell>Clicks</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {urls.map((u, i) => (
              <TableRow key={i}>
                <TableCell>{u.original}</TableCell>
                <TableCell>
                  <a href={`/${u.shortcode}`} target="_blank" rel="noreferrer">
                    {u.shortcode}
                  </a>
                </TableCell>
                <TableCell>{formatDate(u.createdAt)}</TableCell>
                <TableCell>{u.expiresIn} min</TableCell>
                <TableCell>{u.clicks}</TableCell>
                <TableCell>
                  <Chip
                    label={
                      isExpired(u.createdAt, u.expiresIn) ? "Expired" : "Active"
                    }
                    color={
                      isExpired(u.createdAt, u.expiresIn) ? "error" : "success"
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default StatsPage;
