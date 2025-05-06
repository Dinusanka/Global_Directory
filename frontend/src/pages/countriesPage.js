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

const COLORS = ['#1565c0', '#2e7d32', '#f44336', '#ff9800', '#9c27b0', '#00bcd4', '#8bc34a'];

// Pie chart data: number of countries by region
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

// Pie chart data: top 5 countries by population
const getPopulationData = (countries) => {
  return [...countries]
    .sort((a, b) => b.population - a.population)
    .slice(0, 5)
    .map((country) => ({
      name: country.name.common,
      value: country.population,
    }));
};

// Population stats for summary
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

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Countries ({countries.length})
      </Typography>

      {/* Chart and Summary in One Row */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        {/* Charts Column */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>Country Count by Region</Typography>
              <Box sx={{ height: 300 }}>
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
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>Top 5 Populous Countries</Typography>
              <Box sx={{ height: 300 }}>
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
            </Grid>
          </Grid>
        </Grid>

        {/* Summary Column */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>Population Summary</Typography>
          <Typography><strong>Total Population:</strong> {popStats.total.toLocaleString()}</Typography>
          <Typography><strong>Average Population:</strong> {Math.round(popStats.average).toLocaleString()}</Typography>
          <Typography><strong>Most Populous:</strong> {popStats.mostPopulous.name?.common} ({popStats.mostPopulous.population.toLocaleString()})</Typography>
          <Typography><strong>Least Populous:</strong> {popStats.leastPopulous.name?.common} ({popStats.leastPopulous.population.toLocaleString()})</Typography>
        </Grid>
      </Grid>

      {/* All Country Cards */}
      <Box display="flex" flexWrap="wrap">
        {countries.map((country) => (
          <CountryCard
            key={country.cca3}
            country={country}
            isFavorite={false}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CountriesPage;
