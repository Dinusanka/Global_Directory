import React from 'react';
import CountryCard from '../components/CountryCard';
import { Typography, Box } from '@mui/material';

const FavoritesPage = ({ favorites, toggleFavorite }) => (
  <Box p={4}>
    <Typography variant="h4" gutterBottom>Favorites</Typography>
    <Box display="flex" flexWrap="wrap">
      {favorites.map((country) => (
        <CountryCard key={country.cca3} country={country} isFavorite={true} toggleFavorite={toggleFavorite} />
      ))}
    </Box>
  </Box>
);

export default FavoritesPage;
