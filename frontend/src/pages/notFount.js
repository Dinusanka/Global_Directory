import React from 'react';
import { Box, Typography } from '@mui/material';

function NotFound() {
  return (
    <Box sx={{ textAlign: 'center', padding: 5 }}>
      <Typography variant="h3" color="error" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="h6">
        Sorry, the page you are looking for does not exist.
      </Typography>
    </Box>
  );
}

export default NotFound;
