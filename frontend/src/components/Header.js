import React from 'react';
import { AppBar, Toolbar, Box, Button, Typography } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="fixed" sx={{ background: 'linear-gradient(to right, #1565c0, #2e7d32)' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left: Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PublicIcon sx={{ color: '#a5d6a7', mr: 1 }} />
          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            Global Directory
          </Typography>
        </Box>

     

        {/* Right: Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button color="inherit" onClick={() => navigate('/')}>Explore</Button>
          <Button color="inherit" onClick={() => navigate('/countries')}>Countries</Button>
          <Button color="inherit" onClick={() => navigate('/search')}>Search</Button>

          {user && (
            <Button color="inherit" onClick={() => navigate('/favorites')}>Favorites</Button>
          )}

          {user ? (
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/signup')}>Signup</Button>
              <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
