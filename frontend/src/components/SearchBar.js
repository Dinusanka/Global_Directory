import React, { useState } from 'react';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term); // Real-time search
  };

  return (
    <Box sx={{ backgroundColor: '#1565c0', padding: 2, display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: 500 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search countries..."
          value={searchTerm}
          onChange={handleChange}
          InputProps={{
            sx: {
              backgroundColor: '#ffffff',
              borderRadius: 1,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#2e7d32',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#1e88e5',
              },
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" sx={{ color: '#2e7d32' }}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default SearchBar;
