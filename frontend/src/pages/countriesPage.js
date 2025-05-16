import React from 'react';
import CountryCard from '../components/CountryCard';
import {
  Box,
  Typography,
  Grid
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useAuth } from '../auth/AuthContext';

const COLORS = ['#1565c0', '#2e7d32', '#f44336', '#ff9800', '#9c27b0', '#00bcd4', '#8bc34a'];

const getRegionData = (countries) => {
  const regionCount = countries.reduce((acc, country) => {
    const region = country.region || 'Unknown';
    acc[region] = (acc[region] || 0) + 1;
    return acc;
  }, {});
  return Object.keys(regionCount).map((region) => ({
    name: region,
    value: regionCount[region],
  }));
};

const getPopulationData = (countries) => {
  return [...countries]
    .sort((a, b) => b.population - a.population)
    .slice(0, 5)
    .map((country) => ({
      name: country.name.common,
      value: country.population,
    }));
};

const getPopulationStats = (countries) => {
  const total = countries.reduce((sum, c) => sum + c.population, 0);
  const average = total / countries.length;
  const mostPopulous = countries.reduce((max, c) => (c.population > max.population ? c : max), countries[0]);
  const leastPopulous = countries.reduce((min, c) => (c.population < min.population ? c : min), countries[0]);

  return { total, average, mostPopulous, leastPopulous };
};

const CountriesPage = ({ countries, toggleFavorite }) => {
  const regionData = getRegionData(countries);
  const populationData = getPopulationData(countries);
  const popStats = getPopulationStats(countries);

  const { user } = useAuth();

   
  const isFavorite = (code) => {
    return user?.favorites?.includes(code);
  };

  return (
    <Box
      p={4}
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #e0e0e0, #bbdefb)',
      }}
    ><br></br><br></br>
      <Typography variant="h4" gutterBottom align="center">
        Countries ({countries.length})
      </Typography>

      <Grid container spacing={6} justifyContent="center" alignItems="center" sx={{ mb: 6 }}>
        <Grid item xs={12} md={7}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: 3,
                  p: 2,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
              >
                <Typography variant="h6" gutterBottom align="center">
                  Country Count by Region
                </Typography>
                <Box sx={{ height: 300, width: 500 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={regionData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {regionData.map((entry, index) => (
                          <Cell key={`region-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: 3,
                  p: 2,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
              >
                <Typography variant="h6" gutterBottom align="center">
                  Top 5 Populous Countries
                </Typography>
                <Box sx={{ height: 300, width: 500 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={populationData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={({ name }) => name}
                      >
                        {populationData.map((entry, index) => (
                          <Cell key={`pop-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => value.toLocaleString()} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* ✅ Country Cards */}
      <Box display="flex" flexWrap="wrap" justifyContent="center">
        {countries.map((country) => (
          <CountryCard
            key={country.cca3}
            country={country}
            isFavorite={isFavorite(country.cca3)} // ✅ Fix here
            toggleFavorite={toggleFavorite}
            showStar={!!user}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CountriesPage;
