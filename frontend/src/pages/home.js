import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FilterButtons from '../components/FilterButtons';
import CountryCard from '../components/CountryCard';
import { Box, Typography, Grid, Fade } from '@mui/material';
import FlagCountryCard from '../components/FlagCountryCard';
import { useAuth } from '../auth/AuthContext';
const Home = () => {
    
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [showMap, setShowMap] = useState(false);
 const { logout } = useAuth();
   useEffect(() => {
  const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      setCountries(data);
      setFilteredCountries(data);
      setShowMap(true); 
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  fetchCountries(); 
}, []);


    const handleSearch = (searchTerm) => {
        const filtered = countries.filter((country) =>
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCountries(filtered);
    };

    const handleFilter = (region) => {
        if (!region) {
            setFilteredCountries(countries);
        } else {
            const filtered = countries.filter(
                (country) => country.region.toLowerCase() === region
            );
            setFilteredCountries(filtered);
        }
    };
 const { user } = useAuth();
    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f0f4f8' }}>
             
            <Box
                sx={{
                    position: 'relative',
                    backgroundColor: '#1565c0',
                    color: 'white',
                    textAlign: 'center',
                    py: 6,
                }}
            ><br></br><br></br>
                <Typography variant="h4" fontWeight="bold">
                        {user && (
            <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold' }}>
              Hi, {user.username}
            </Typography>
          )}
        
                    Discover 250+ countries across the planet

            </Typography>
            </Box>

            <SearchBar onSearch={handleSearch} />
            <FilterButtons onFilter={handleFilter} />

            <Fade in={showMap} timeout={1500}>
                <Box
                    component="img"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/2000px-World_map_-_low_resolution.svg.png"
                    alt="World Map"
                    sx={{
                        width: '100%',
                        maxHeight: 300,
                        objectFit: 'cover',
                        display: 'block',
                        my: 2,
                        borderRadius: 2,
                        boxShadow: 3,
                    }}
                />
            </Fade>

            <Grid container spacing={2} justifyContent="center" px={4} pb={4}>
            <Box
  sx={{
    display: 'grid',
    gridTemplateColumns: {
      xs: 'repeat(1, 1fr)',      
      sm: 'repeat(2, 1fr)',      
      md: 'repeat(3, 1fr)',     
      lg: 'repeat(5, 1fr)',      
      xl: 'repeat(5, 1fr)',      
    },
    gap: 2,
    px: 4,
    pb: 4,
  }}
>
  {filteredCountries.map((country) => (
    <FlagCountryCard country={country} key={country.cca3} />
  ))}
        </Box>
            </Grid>
        </Box>
    );
};

export default Home;
