'use client';

import { Box, Typography, Paper, Grid, TextField, Button } from '@mui/material';
import { LocationOn, Search, MyLocation } from '@mui/icons-material';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { markerIcon } from './marker-icons';

// Component to handle map updates
function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function LocationPage() {
  const [mapCenter, setMapCenter] = useState<[number, number]>([41.0082, 28.9784]); // Istanbul coordinates
  const [searchQuery, setSearchQuery] = useState('');
  const [savedLocations, setSavedLocations] = useState([
    { name: 'Istanbul', coordinates: [41.0082, 28.9784] },
    { name: 'London', coordinates: [51.5074, -0.1278] },
    { name: 'New York', coordinates: [40.7128, -74.0060] },
    { name: 'Tokyo', coordinates: [35.6762, 139.6503] }
  ]);

  const handleSearch = () => {
    // Here you would typically call a geocoding API
    // For now, we'll just simulate with Istanbul coordinates
    setMapCenter([41.0082, 28.9784]);
  };

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter([latitude, longitude]);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const handleRemoveLocation = (index: number) => {
    setSavedLocations(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      position: 'relative',
      color: 'white',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Background Image */}
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
        pt: '120px',
        px: { xs: 2, sm: 4, md: 8 },
        pb: 4,
        position: 'relative',
        zIndex: 1
      }}>
        <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
          <Typography 
            variant="h3" 
            sx={{ 
              mb: 4,
              textAlign: 'center',
              fontWeight: 700,
              textShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
            }}
          >
            Location Settings
          </Typography>

          <Grid container spacing={3}>
            {/* Map Section */}
            <Grid item xs={12} md={8}>
              <Paper 
                sx={{ 
                  p: 2,
                  height: '600px',
                  bgcolor: 'rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.3)'
                  }
                }}
              >
                <MapContainer
                  center={mapCenter}
                  zoom={13}
                  style={{ height: '100%', width: '100%', borderRadius: '8px' }}
                >
                  <ChangeView center={mapCenter} zoom={13} />
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {savedLocations.map((location, index) => (
                    <Marker
                      key={index}
                      position={location.coordinates as [number, number]}
                      icon={markerIcon}
                    >
                      <Popup>
                        {location.name}
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </Paper>
            </Grid>

            {/* Controls Section */}
            <Grid item xs={12} md={4}>
              <Paper 
                sx={{ 
                  p: 4,
                  height: '100%',
                  bgcolor: 'rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.3)'
                  }
                }}
              >
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Search Location
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                      fullWidth
                      placeholder="Enter city name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          color: 'white',
                          '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                          },
                        },
                        '& .MuiOutlinedInput-input': {
                          '&::placeholder': {
                            color: 'rgba(255, 255, 255, 0.5)',
                          },
                        },
                      }}
                    />
                    <Button 
                      variant="contained" 
                      startIcon={<Search />}
                      onClick={handleSearch}
                      sx={{ 
                        bgcolor: 'rgba(0, 0, 0, 0.3)',
                        '&:hover': {
                          bgcolor: 'rgba(0, 0, 0, 0.4)',
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Search
                    </Button>
                  </Box>
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Use Current Location
                  </Typography>
                  <Button 
                    variant="outlined" 
                    startIcon={<MyLocation />}
                    onClick={handleDetectLocation}
                    sx={{ 
                      color: 'white',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      '&:hover': {
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Detect Location
                  </Button>
                </Box>

                <Box>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Saved Locations
                  </Typography>
                  <Grid container spacing={2}>
                    {savedLocations.map((location, index) => (
                      <Grid item xs={12} key={index}>
                        <Paper 
                          sx={{ 
                            p: 2,
                            bgcolor: 'rgba(255, 255, 255, 0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              bgcolor: 'rgba(255, 255, 255, 0.1)',
                              transform: 'translateX(5px)'
                            }
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LocationOn sx={{ color: '#4DABF7' }} />
                            <Typography>{location.name}</Typography>
                          </Box>
                          <Button 
                            size="small"
                            onClick={() => handleRemoveLocation(index)}
                            sx={{ 
                              color: '#FF6B6B',
                              '&:hover': {
                                bgcolor: 'rgba(255, 107, 107, 0.1)'
                              }
                            }}
                          >
                            Remove
                          </Button>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
} 