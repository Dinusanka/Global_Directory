import React from 'react';
import CountryCard from '../components/CountryCard';
import { Typography, Box } from '@mui/material';
import { useAuth } from '../auth/AuthContext';

const FavoritesPage = ({ favorites, toggleFavorite }) => {
  const { user } = useAuth(); 

  return (
    <Box p={4}><br></br><br></br>
      <Typography variant="h4" gutterBottom>Favorites</Typography>
      <Box display="flex" flexWrap="wrap">
        {favorites.map((country) => (
          <CountryCard
            key={country.cca3}
            country={country}
            isFavorite={true}
            toggleFavorite={toggleFavorite}
            showStar={!!user}  
          />
        ))}
      </Box>
    </Box>
  );
};

export default FavoritesPage;
