import React from 'react';
import { AppBar, Toolbar, Box, Button, Typography } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(to right, #1565c0, #2e7d32)' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PublicIcon sx={{ color: '#a5d6a7', mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => navigate('/')}>
            Global Directory
          </Typography>
        </Box>
        <Box>
          <Button color="inherit" onClick={() => navigate('/')}>Explore</Button>
          <Button color="inherit" onClick={() => navigate('/countries')}>Countries</Button>
          <Button color="inherit" onClick={() => navigate('/search')}>Search</Button>
          <Button color="inherit" onClick={() => navigate('/favorites')}>Favorites</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Header;