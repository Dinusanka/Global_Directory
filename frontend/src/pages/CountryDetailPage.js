import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Link,
  Grid,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAuth } from '../auth/AuthContext'; // 🔹 Make sure this path is correct

const backgroundImage =
  'https://t3.ftcdn.net/jpg/08/22/43/50/360_F_822435027_KAkPbZA0au36KkOdmL1EHRNH5ajkVKv0.jpg';

const CountryDetailPage = () => {
  const { state } = useLocation();
  const { code } = useParams();
  const { user } = useAuth(); // 🔹 Access user from AuthContext

  const country = state?.country;

  if (!country) {
    return (
      <Box p={4} textAlign="center">
        <Typography variant="h6">No country data found for {code}.</Typography>
      </Box>
    );
  }

  // 🔸 Check if this country is a favorite
  const isFavorite = user?.favorites?.includes(country.cca2); // Adjust to your data structure

  return (
    
    <Box
      p={4}
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    ><br></br><br></br>
      <Box marginTop={8} maxWidth="1200px" width="100%" borderRadius={3} boxShadow={4} p={4}>
        <Grid container spacing={4}>
          {/* Left Column: Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Details
            </Typography>
            <Card elevation={2}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <List dense>
                      <ListItem>
                        <ListItemText
                          primary="Official Name"
                          secondary={country.name.official}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Capital"
                          secondary={country.capital?.[0] || 'N/A'}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Region" secondary={country.region} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Subregion" secondary={country.subregion} />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Population"
                          secondary={country.population.toLocaleString()}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Area"
                          secondary={`${country.area.toLocaleString()} km²`}
                        />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Right column: more details */}
          <Grid item xs={12} md={6}>
            <Box mt={4} />
            <Card elevation={2}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <List dense>
                      <ListItem>
                        <ListItemText
                          primary="Languages"
                          secondary={Object.values(country.languages || {}).join(', ') || 'N/A'}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Timezones"
                          secondary={country.timezones?.join(', ') || 'N/A'}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Calling Code"
                          secondary={`+${country.idd?.root || ''}${(country.idd?.suffixes || []).join(', +')}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Currencies"
                          secondary={
                            country.currencies
                              ? Object.values(country.currencies)
                                  .map((cur) => `${cur.name} (${cur.symbol})`)
                                  .join(', ')
                              : 'N/A'
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Borders"
                          secondary={country.borders?.join(', ') || 'None'}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Google Maps"
                          secondary={
                            <Link href={country.maps?.googleMaps} target="_blank" rel="noopener">
                              View on Google Maps
                            </Link>
                          }
                        />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Centered Flag and Country Name */}
          <Grid item xs={12}>
            <Box textAlign="center" mt={4}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                {country.name.common}
                {isFavorite && <FavoriteIcon sx={{ color: 'red' }} />}
              </Typography>

              <Box
                sx={{
                  height: 300,
                  width: 460,
                  margin: '0 auto',
                  marginTop: 2,
                }}
              >
                <img
                  src={country.flags?.png || country.flags?.svg}
                  alt={`${country.name.common} flag`}
                  style={{ maxHeight: 600, width: '100%', objectFit: 'contain' }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CountryDetailPage;
