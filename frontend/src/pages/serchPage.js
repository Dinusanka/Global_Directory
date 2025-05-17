import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Autocomplete,
} from '@mui/material';
import FlagCountryCard from '../components/FlagCountryCard';

const SearchPage = () => {
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]); // For autocomplete country name search
  const [filters, setFilters] = useState({
    currency: '',
    language: '',
    timezone: '',
    callingCode: '',
    capital: '',
    independent: false,
    cca2: '', // new filter for country ISO2 code
  });

  const [timezones, setTimezones] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [callingCodes, setCallingCodes] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        setAllCountries(data); // save all countries for autocomplete

        setTimezones(
          Array.from(new Set(data.flatMap((c) => c.timezones || []))).sort()
        );
        setLanguages(
          Array.from(
            new Set(data.flatMap((c) => Object.values(c.languages || {})))
          ).sort()
        );

        const codeList = data.flatMap((c) => {
          const root = c.idd?.root?.replace('+', '') || '';
          const suffixes = c.idd?.suffixes || [];
          const name = c.name?.common || '';
          return suffixes.map((s) => ({
            code: `${root}${s}`.replace(/^0+/, ''),
            label: `${name} (${root}${s})`,
          }));
        });

        const uniqueCodes = Array.from(
          new Map(codeList.map((item) => [item.code + item.label, item])).values()
        );
        setCallingCodes(uniqueCodes.sort((a, b) => a.code.localeCompare(b.code)));
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        // Collect promises for each filter
        const promises = [];

        // If capital filter
        if (filters.capital) {
          promises.push(
            fetch(`https://restcountries.com/v3.1/capital/${filters.capital}`).then(
              (res) => res.json()
            )
          );
        }

        // If currency filter
        if (filters.currency) {
          promises.push(
            fetch(`https://restcountries.com/v3.1/currency/${filters.currency}`).then(
              (res) => res.json()
            )
          );
        }

        // If language filter
        if (filters.language) {
          promises.push(
            fetch(`https://restcountries.com/v3.1/lang/${filters.language}`).then(
              (res) => res.json()
            )
          );
        }

        // If no filters, fetch all
        if (promises.length === 0) {
          const res = await fetch('https://restcountries.com/v3.1/all');
          const data = await res.json();
          setCountries(Array.isArray(data) ? data : []);
          return;
        }

        // Wait all API calls
        const results = await Promise.all(promises);

        // Filter out any non-array or error responses
        const validResults = results.filter(Array.isArray);

        if (validResults.length === 0) {
          setCountries([]); // no valid results at all
          return;
        }

        // Intersect results by cca3 (unique country code)
        // Start from first result set
        let intersected = validResults[0];

        for (let i = 1; i < validResults.length; i++) {
          const set = new Set(validResults[i].map((c) => c.cca3));
          intersected = intersected.filter((c) => set.has(c.cca3));
        }

        setCountries(intersected);
      } catch (err) {
        console.error('Error fetching countries:', err);
        setCountries([]);
      }
    };

    fetchCountries();
  }, [filters.capital, filters.currency, filters.language]);

  const filteredCountries = countries.filter((c) => {
    if (filters.cca2 && c.cca2 !== filters.cca2) {
      return false;
    }

    if (filters.timezone && !(c.timezones || []).includes(filters.timezone)) {
      return false;
    }

    if (filters.callingCode) {
      const codes = (c.idd?.suffixes || []).map((s) =>
        `${c.idd?.root || ''}${s}`.replace('+', '')
      );
      if (!codes.some((code) => code.includes(filters.callingCode))) {
        return false;
      }
    }

    if (filters.independent && !c.independent) {
      return false;
    }

    return true;
  });

  const anyFilterActive = Object.entries(filters).some(
    ([, v]) => (typeof v === 'boolean' ? v : v !== '')
  );

  const handleChange = (field) => (e) => {
    const value = field === 'independent' ? e.target.checked : e.target.value;
    setFilters((f) => ({ ...f, [field]: value }));
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f0f4f8' }}>
      <br />
      <br />
      <Box
        sx={{
          backgroundColor: '#1565c0',
          color: 'white',
          textAlign: 'center',
          py: 6,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Advanced Search
        </Typography>
      </Box>

      <Box sx={{ px: 4, py: 3, display: 'grid', gap: 2 }}>
        
        <Autocomplete
          options={allCountries}
          getOptionLabel={(option) => `${option.name.common} (${option.cca2})`}
          value={
            filters.cca2
              ? allCountries.find((c) => c.cca2 === filters.cca2) || null
              : null
          }
          onChange={(event, newValue) => {
            setFilters((prev) => ({
              ...prev,
              cca2: newValue ? newValue.cca2 : '',
            }));
          }}
          renderInput={(params) => (
            <TextField {...params} label="Country Name (ISO2)" variant="outlined" />
          )}
          clearOnEscape
        />
        <TextField
          label="Currency (code or name)"
          variant="outlined"
          value={filters.currency}
          onChange={handleChange('currency')}
        />
        <TextField
          label="Language"
          variant="outlined"
          value={filters.language}
          onChange={handleChange('language')}
          helperText="Use language codes or names"
        />
        <FormControl>
          <InputLabel>Time Zone</InputLabel>
          <Select
            value={filters.timezone}
            onChange={handleChange('timezone')}
            label="Time Zone"
          >
            <MenuItem value="">All</MenuItem>
            {timezones.map((tz) => (
              <MenuItem key={tz} value={tz}>
                {tz}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Autocomplete
          options={callingCodes}
          getOptionLabel={(option) => option.label}
          value={
            filters.callingCode
              ? callingCodes.find((c) => c.code === filters.callingCode) || null
              : null
          }
          onChange={(event, newValue) => {
            setFilters((prev) => ({
              ...prev,
              callingCode: newValue ? newValue.code : '',
            }));
          }}
          renderInput={(params) => (
            <TextField {...params} label="Calling Code" variant="outlined" />
          )}
        />

        <TextField
          label="Capital City"
          variant="outlined"
          value={filters.capital}
          onChange={handleChange('capital')}
        />

        
      </Box>

      <Grid container spacing={2} justifyContent="center" sx={{ px: 4, pb: 4 }}>
        {filteredCountries.map((country) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={country.cca3}>
            <FlagCountryCard country={country} />
          </Grid>
        ))}
      </Grid>

      {anyFilterActive && filteredCountries.length === 0 && (
        <Typography
          variant="h6"
          color="textSecondary"
          align="center"
          sx={{ py: 4 }}
        >
          No countries found with the applied filters.
        </Typography>
      )}
    </Box>
  );
};

export default SearchPage;
