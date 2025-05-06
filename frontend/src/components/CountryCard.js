import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useNavigate } from 'react-router-dom';

// Define region colors
const regionColors = {
  Asia: '#4CAF50',
  Americas: '#0D47A1',
  Europe: '#E53935',
  Africa: '#795548',
  Oceania: '#81D4FA',
  Antarctic: '#FFFFFF',
  default: '#E0E0E0',
};

const CountryCard = ({ country, isFavorite, toggleFavorite }) => {
  const navigate = useNavigate();
  const regionColor = regionColors[country.region] || regionColors.default;

  const handleCardClick = () => {
    navigate(`/country/${country.cca3}`, { state: { country } });
  };

  return (
    <Card
      sx={{
        width: 250,
        margin: 2,
        backgroundColor: regionColor,
        borderRadius: 2,
        boxShadow: 3,
        cursor: 'pointer',
        '&:hover': { boxShadow: 6 }
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        height="140"
        image={country.flags?.png || country.flags?.svg}
        alt={`${country.name.common} flag`}
        sx={{ objectFit: 'cover', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
      />
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            {country.name.common}
          </Typography>
          <IconButton
            onClick={(e) => {
              e.stopPropagation(); // prevent navigation when clicking star
              toggleFavorite(country);
            }}
          >
            {isFavorite ? <StarIcon color="warning" /> : <StarBorderIcon />}
          </IconButton>
        </Box>
        <Typography variant="body2">Region: {country.region}</Typography>
        <Typography variant="body2">
          Population: {country.population.toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CountryCard;
