'use client';

import { Box, Typography, Paper, Grid, Switch, FormControlLabel, Select, MenuItem, Button } from '@mui/material';
import { DarkMode, Notifications, Language, Speed, Thermostat } from '@mui/icons-material';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

export default function SettingsPage() {
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
        <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
          <Typography 
            variant="h3" 
            sx={{ 
              mb: 4,
              textAlign: 'center',
              fontWeight: 700,
              textShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
            }}
          >
            Settings
          </Typography>

          <Paper 
            sx={{ 
              p: 4,
              bgcolor: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.3)'
              }
            }}
          >
            {/* Display Settings */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Display Settings
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch 
                        defaultChecked
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: '#4DABF7',
                            '&:hover': {
                              backgroundColor: 'rgba(77, 171, 247, 0.1)',
                            },
                          },
                        }}
                      />
                    }
                    label="Dark Mode"
                    sx={{ color: 'white' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Show Temperature in Celsius"
                    sx={{ color: 'white' }}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Notification Settings */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Notification Settings
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Weather Alerts"
                    sx={{ color: 'white' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Daily Forecast"
                    sx={{ color: 'white' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Switch />}
                    label="Severe Weather Warnings"
                    sx={{ color: 'white' }}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Language Settings */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Language Settings
              </Typography>
              <Select
                defaultValue="en"
                fullWidth
                sx={{
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                }}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="tr">Türkçe</MenuItem>
                <MenuItem value="es">Español</MenuItem>
                <MenuItem value="fr">Français</MenuItem>
                <MenuItem value="de">Deutsch</MenuItem>
              </Select>
            </Box>

            {/* Units Settings */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Units Settings
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Select
                    defaultValue="celsius"
                    fullWidth
                    sx={{
                      color: 'white',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                      },
                    }}
                  >
                    <MenuItem value="celsius">Celsius (°C)</MenuItem>
                    <MenuItem value="fahrenheit">Fahrenheit (°F)</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Select
                    defaultValue="kmh"
                    fullWidth
                    sx={{
                      color: 'white',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                      },
                    }}
                  >
                    <MenuItem value="kmh">Kilometers per hour (km/h)</MenuItem>
                    <MenuItem value="mph">Miles per hour (mph)</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </Box>

            {/* Save Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button 
                variant="contained"
                sx={{ 
                  bgcolor: 'rgba(0, 0, 0, 0.3)',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.4)',
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Save Changes
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
} 