import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const URLTable = ({ refresh }) => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("shortURLs") || "[]");
    setUrls(stored);
  }, [refresh]);

  return (
    <Paper sx={{ mt: 4, p: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Recently Shortened URLs
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Original URL</TableCell>
              <TableCell>Shortcode</TableCell>
              <TableCell>Expires In</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {urls.map((url, index) => (
              <TableRow key={index}>
                <TableCell>{url.original}</TableCell>
                <TableCell>
                  <a
                    href={`/${url.shortcode}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {url.shortcode}
                  </a>
                </TableCell>
                <TableCell>{url.expiresIn} min</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default URLTable;
