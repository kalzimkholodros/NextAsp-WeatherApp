'use client';

import { Box, Typography, Button, Grid, Paper, CircularProgress } from '@mui/material';
import { Search, LocationOn, Thermostat, WaterDrop, Air, TrendingUp, TrendingDown } from '@mui/icons-material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { WeatherData, getWeatherByCity, getHottestCities, getColdestCities } from '@/services/weatherApi';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [hottestCities, setHottestCities] = useState<WeatherData[]>([]);
  const [coldestCities, setColdestCities] = useState<WeatherData[]>([]);
  const [searchCity, setSearchCity] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!mounted) return;

      try {
        setLoading(true);
        setError(null);

        const [istanbulWeather, hotCities, coldCities] = await Promise.all([
          getWeatherByCity('Istanbul'),
          getHottestCities(),
          getColdestCities()
        ]);

        setWeatherData(istanbulWeather);
        setHottestCities(hotCities);
        setColdestCities(coldCities);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mounted]);

  const handleSearch = async () => {
    if (!searchCity.trim()) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await getWeatherByCity(searchCity);
      setWeatherData(data);
    } catch (err) {
      console.error('Error searching city:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}>
        <Paper sx={{ p: 3, bgcolor: 'error.light', color: 'error.contrastText' }}>
          <Typography variant="h6">Error:</Typography>
          <Typography>{error}</Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      position: 'relative',
      color: 'white',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1
      }}>
        <Image
          src="/weather.webp"
          alt="Weather background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </Box>

      <Navbar />
      
      <Box sx={{ 
        flex: 1,
        pt: '100px',
        px: { xs: 2, sm: 4, md: 8 },
        pb: 4,
        position: 'relative',
        zIndex: 1
      }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8, maxWidth: '800px', mx: 'auto' }}>
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
            Weather Around the World
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 4 }}>
            Get real-time weather updates for any location on Earth
          </Typography>
        </Box>

        {/* Search Section */}
        <Box sx={{ display: 'flex', gap: 2, mb: 8, maxWidth: '600px', mx: 'auto' }}>
          <Paper sx={{ flex: 1, display: 'flex', alignItems: 'center', p: 1, bgcolor: 'rgba(0, 0, 0, 0.3)' }}>
            <Search sx={{ color: 'white', mr: 1 }} />
            <input
              type="text"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              placeholder="Search city..."
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                width: '100%',
                outline: 'none'
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </Paper>
          <Button 
            variant="contained"
            onClick={handleSearch}
            disabled={loading}
          >
            Search
          </Button>
        </Box>

        {/* Current Weather */}
        {weatherData && (
          <Grid container spacing={3} sx={{ maxWidth: '1200px', mx: 'auto', mb: 8 }}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, bgcolor: 'rgba(0, 0, 0, 0.3)' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOn sx={{ mr: 1 }} />
                  <Typography variant="h5">
                    {weatherData.cityName}, {weatherData.country}
                  </Typography>
                </Box>
                <Typography variant="h2" sx={{ mb: 2 }}>
                  {Math.round(weatherData.temperature)}°C
                </Typography>
                <Typography variant="h6" sx={{ mb: 3 }}>
                  {weatherData.description}
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Thermostat sx={{ mb: 1 }} />
                      <Typography>Feels Like</Typography>
                      <Typography variant="h6">{Math.round(weatherData.feelsLike)}°C</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <WaterDrop sx={{ mb: 1 }} />
                      <Typography>Humidity</Typography>
                      <Typography variant="h6">{weatherData.humidity}%</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Air sx={{ mb: 1 }} />
                      <Typography>Wind</Typography>
                      <Typography variant="h6">{Math.round(weatherData.windSpeed)} km/h</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* Hot and Cold Cities */}
        <Grid container spacing={3} sx={{ maxWidth: '1200px', mx: 'auto', mb: 8 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, bgcolor: 'rgba(0, 0, 0, 0.3)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp sx={{ color: '#FF6B6B', mr: 1 }} />
                <Typography variant="h6">Hottest Cities</Typography>
              </Box>
              {hottestCities.map((city, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography>{city.cityName}, {city.country}</Typography>
                  <Typography sx={{ color: '#FF6B6B' }}>
                    {Math.round(city.temperature)}°C
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, bgcolor: 'rgba(0, 0, 0, 0.3)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingDown sx={{ color: '#4DABF7', mr: 1 }} />
                <Typography variant="h6">Coldest Cities</Typography>
              </Box>
              {coldestCities.map((city, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography>{city.cityName}, {city.country}</Typography>
                  <Typography sx={{ color: '#4DABF7' }}>
                    {Math.round(city.temperature)}°C
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </Box>
  );
}
