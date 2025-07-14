import React, { useState } from "react";
import { Box, TextField, Button, Typography, Grid, Paper } from "@mui/material";
import { nanoid } from "nanoid";
import { logEvent } from "../Logger/logEvent";

const accessToken = "your-access-token"; // Replace securely

const ShortenerForm = ({ onShorten }) => {
  const [urls, setUrls] = useState([
    { original: "", validity: "", shortcode: "" },
  ]);

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const handleAdd = () => {
    if (urls.length < 5) {
      setUrls([...urls, { original: "", validity: "", shortcode: "" }]);
    }
  };

  const handleSubmit = () => {
    const entries = [];
    const usedShortcodes = JSON.parse(
      localStorage.getItem("shortURLs") || "[]"
    ).map((u) => u.shortcode);

    for (let i = 0; i < urls.length; i++) {
      const { original, validity, shortcode } = urls[i];

      // Basic validations
      try {
        new URL(original);
      } catch {
        logEvent(
          "frontend",
          "error",
          "validation",
          `Invalid URL at row ${i + 1}`,
          accessToken
        );
        alert(`Invalid URL at row ${i + 1}`);
        return;
      }

      if (validity && isNaN(Number(validity))) {
        alert(`Validity must be a number at row ${i + 1}`);
        return;
      }

      let code = shortcode.trim() || nanoid(6);
      if (!/^[a-zA-Z0-9]+$/.test(code)) {
        alert(`Shortcode must be alphanumeric at row ${i + 1}`);
        return;
      }

      if (usedShortcodes.includes(code)) {
        alert(`Shortcode "${code}" already used.`);
        logEvent(
          "frontend",
          "error",
          "shortener",
          `Duplicate shortcode "${code}"`,
          accessToken
        );
        return;
      }

      entries.push({
        original,
        shortcode: code,
        createdAt: Date.now(),
        expiresIn: Number(validity) || 30,
        clicks: 0,
      });

      logEvent(
        "frontend",
        "info",
        "shortener",
        `Shortened: ${original} to ${code}`,
        accessToken
      );
    }

    const existing = JSON.parse(localStorage.getItem("shortURLs") || "[]");
    localStorage.setItem(
      "shortURLs",
      JSON.stringify([...existing, ...entries])
    );
    onShorten(); // callback to refresh table
    setUrls([{ original: "", validity: "", shortcode: "" }]);
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Shorten URLs
      </Typography>
      {urls.map((url, index) => (
        <Grid container spacing={2} key={index} sx={{ mb: 1 }}>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Original URL"
              value={url.original}
              onChange={(e) => handleChange(index, "original", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Validity (min)"
              value={url.validity}
              onChange={(e) => handleChange(index, "validity", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Custom Shortcode (optional)"
              value={url.shortcode}
              onChange={(e) => handleChange(index, "shortcode", e.target.value)}
            />
          </Grid>
        </Grid>
      ))}
      <Box sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          onClick={handleAdd}
          disabled={urls.length >= 5}
        >
          Add More
        </Button>
        <Button variant="contained" onClick={handleSubmit} sx={{ ml: 2 }}>
          Shorten
        </Button>
      </Box>
    </Paper>
  );
};

export default ShortenerForm;
