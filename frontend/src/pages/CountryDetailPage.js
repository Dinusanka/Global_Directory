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

const CountryDetailPage = () => {
  const { state } = useLocation();
  const { code } = useParams();

  const country = state?.country;

  if (!country) {
    return <Typography variant="h6">No country data found for {code}.</Typography>;
  }

  return (
    <Box p={4} display="flex" justifyContent="center">
      <Box maxWidth="1080px" width="100%">
        <Typography variant="h4" gutterBottom>{country.name.common}</Typography>

        {/* Flag */}
        <Box mb={4} textAlign="center">
          <img
            src={country.flags?.png || country.flags?.svg}
            alt={`${country.name.common} flag`}
            style={{ maxHeight: 200, width: 'auto' }}
          />
        </Box>

        {/* Country Details */}
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Official Name" secondary={country.name.official} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Capital" secondary={country.capital?.[0] || 'N/A'} />
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

              <Grid item xs={12} sm={6}>
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
                      secondary={country.currencies
                        ? Object.values(country.currencies)
                            .map((cur) => `${cur.name} (${cur.symbol})`)
                            .join(', ')
                        : 'N/A'}
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
      </Box>
    </Box>
  );
};

export default CountryDetailPage;
