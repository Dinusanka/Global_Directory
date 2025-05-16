import React, { useState, useEffect } from 'react';
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
import CountryCard from '../components/CountryCard';
import FlagCountryCard from '../components/FlagCountryCard';

const SearchPage = () => {
  const [countries, setCountries] = useState([]);
  const [filters, setFilters] = useState({
    currency: '',
    language: '',
    timezone: '',
    callingCode: '',
    capital: '',
    independent: false,
  });
  const [timezones, setTimezones] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [callingCodes, setCallingCodes] = useState([]);

  // Fetch data once
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);

        // Extract unique timezones
        setTimezones(Array.from(new Set(data.flatMap((c) => c.timezones || []))).sort());

        // Extract unique languages
        setLanguages(Array.from(new Set(data.flatMap((c) => Object.values(c.languages || {})))).sort());

        // Extract unique calling codes (roots + suffixes) along with country names
        const codeList = data.flatMap((c) => {
          const root = c.idd?.root?.replace('+', '') || '';
          const suffixes = c.idd?.suffixes || [];
          const name = c.name?.common || '';
          return suffixes.map((s) => ({
            code: `${root}${s}`.replace(/^0+/, ''),
            label: `${name} (${root}${s})`, // display country name and calling code
          }));
        });

        // Set unique calling codes
        const uniqueCodes = Array.from(
          new Map(codeList.map((item) => [item.code + item.label, item])).values()
        );
        setCallingCodes(uniqueCodes.sort((a, b) => a.code.localeCompare(b.code)));
      })
      .catch(console.error);
  }, []);

  // Apply filters
  const filtered = countries.filter((c) => {
    // currency
    if (filters.currency) {
      const currs = c.currencies || {};
      if (
        !Object.entries(currs).some(
          ([code, obj]) =>
            code.toLowerCase().includes(filters.currency.toLowerCase()) ||
            (obj.name || '').toLowerCase().includes(filters.currency.toLowerCase())
        )
      )
        return false;
    }
    // language
    if (filters.language) {
      const langs = Object.values(c.languages || {});
      if (!langs.some((l) => l.toLowerCase().includes(filters.language.toLowerCase())))
        return false;
    }
    // timezone
    if (filters.timezone && !(c.timezones || []).includes(filters.timezone)) return false;
    // calling code
    if (filters.callingCode) {
      const fullCodes = (c.idd?.suffixes || []).map((s) =>
        `${c.idd?.root || ''}${s}`.replace('+', '')
      );
      if (!fullCodes.some((code) => code.includes(filters.callingCode))) return false;
    }
    
    // capital
    if (
      filters.capital &&
      !((c.capital?.[0] || '').toLowerCase().includes(filters.capital.toLowerCase()))
    )
      return false;
    // independent
    if (filters.independent && !c.independent) return false;

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
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f0f4f8' }}><br></br><br></br>
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
          helperText="Start typing to get suggestions"
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

        <FormControl>
          <InputLabel> </InputLabel>
          <Autocomplete
            options={callingCodes}
            getOptionLabel={(option) => option.label}
            value={
              filters.callingCode
                ? { label: filters.callingCode, value: filters.callingCode }
                : null
            }
            onChange={(event, newValue) => {
              setFilters((prev) => ({
                ...prev,
                callingCode: newValue ? newValue.code : ''
              }));
            }}
            renderInput={(params) => (
              <TextField {...params} label="Calling Code" variant="outlined" />
            )}
          />
        </FormControl>

        <TextField
          label="Capital City"
          variant="outlined"
          value={filters.capital}
          onChange={handleChange('capital')}
        />
      </Box>

      <Grid container spacing={2} justifyContent="center" sx={{ px: 4, pb: 4 }}>
        {filtered.map((country) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={country.cca3}>
           <FlagCountryCard country={country} key={country.cca3} />
          </Grid>
        ))}
      </Grid>

      {anyFilterActive && filtered.length === 0 && (
        <Typography
          variant="h6"
          color="textSecondary"
          align="center"
          sx={{ py: 4 }}
        >
          No countries found matching your criteria.
        </Typography>
      )}
    </Box>
  );
};

export default SearchPage;
