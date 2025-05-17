import React from 'react';
import { Box, Typography, IconButton, Container } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PublicIcon from '@mui/icons-material/Public';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'linear-gradient(to right, #1565c0, #2e7d32)',
        background: '#0d47a1',
        color: '#fff',
        py: 4,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
       
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <PublicIcon sx={{ mr: 1, fontSize: 30, color: '#a5d6a7' }} />
          <Typography variant="h6" fontWeight="bold">
            Global Directory
          </Typography>
        </Box>

        
        <Typography variant="body2" align="center" sx={{ mb: 2 }}>
          Explore the world with ease — find countries, details, and more in one global place.
        </Typography>

      

       
        <Typography variant="body2" align="center" sx={{ color: '#ccc' }}>
          © {new Date().getFullYear()} Global Directory. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
