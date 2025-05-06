import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FlagCountryCard = ({ country }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/country/${country.cca3}`, { state: { country } }); // Pass data via state
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        width: 240,
        margin: 2,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: '#ffffff',
        cursor: 'pointer',
        '&:hover': { boxShadow: 6 }
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={country.flags.png}
        alt={`${country.name.common} flag`}
        sx={{ objectFit: 'cover', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
      />
      <CardContent>
        <Typography variant="h6" component="div" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
          {country.name.common}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Capital: {country.capital?.[0] || 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Region: {country.region}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FlagCountryCard;
