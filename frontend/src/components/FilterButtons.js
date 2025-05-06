import React, { useState } from 'react';
import { Box, Button } from '@mui/material';

const FilterButtons = ({ onFilter }) => {
  const regions = ['All Regions', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctica'];
  const [selectedRegion, setSelectedRegion] = useState('All Regions');

  const handleClick = (region) => {
    setSelectedRegion(region);
    onFilter(region === 'All Regions' ? '' : region.toLowerCase());
  };

  return (
    <Box
      sx={{
        backgroundColor: '#1565c0',
        padding: 2,
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      {regions.map((region) => {
        const isSelected = selectedRegion === region;
        return (
          <Button
            key={region}
            variant="contained"
            onClick={() => handleClick(region)}
            sx={{
              backgroundColor: isSelected ? '#2e7d32' : '#1e88e5',
              '&:hover': {
                backgroundColor: isSelected ? '#388e3c' : '#1976d2',
              },
              color: '#fff',
              borderRadius: '999px',
              textTransform: 'none',
              paddingX: 2.5,
              paddingY: 1,
              fontWeight: 'bold',
            }}
          >
            {region}
          </Button>
        );
      })}
    </Box>
  );
};

export default FilterButtons;
