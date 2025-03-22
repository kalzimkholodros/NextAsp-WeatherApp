'use client';

import { Box, Typography, Link, Grid } from '@mui/material';
import { GitHub, Twitter, LinkedIn, Email } from '@mui/icons-material';

export default function Footer() {
  return (
    <Box 
      sx={{ 
        py: 4,
        position: 'relative',
        zIndex: 1
      }}
    >
      <Box sx={{ 
        maxWidth: '1200px', 
        mx: 'auto', 
        px: { xs: 2, sm: 4, md: 8 }
      }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'white',
                mb: 2,
                fontWeight: 600
              }}
            >
              WeatherApp
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                mb: 2
              }}
            >
              Your trusted source for accurate weather information worldwide. Stay informed with real-time updates and forecasts.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Link href="#" sx={{ color: 'white', '&:hover': { color: '#4DABF7' } }}>
                <GitHub />
              </Link>
              <Link href="#" sx={{ color: 'white', '&:hover': { color: '#4DABF7' } }}>
                <Twitter />
              </Link>
              <Link href="#" sx={{ color: 'white', '&:hover': { color: '#4DABF7' } }}>
                <LinkedIn />
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'white',
                mb: 2,
                fontWeight: 600
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" sx={{ color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: '#4DABF7' } }}>
                About Us
              </Link>
              <Link href="#" sx={{ color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: '#4DABF7' } }}>
                Features
              </Link>
              <Link href="#" sx={{ color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: '#4DABF7' } }}>
                API Documentation
              </Link>
              <Link href="#" sx={{ color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: '#4DABF7' } }}>
                Blog
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'white',
                mb: 2,
                fontWeight: 600
              }}
            >
              Contact
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  support@weatherapp.com
                </Typography>
              </Box>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                123 Weather Street
                <br />
                Climate City, WC 12345
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ 
          mt: 4, 
          pt: 2, 
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            © 2024 WeatherApp. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="#" sx={{ color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: '#4DABF7' } }}>
              Privacy Policy
            </Link>
            <Link href="#" sx={{ color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: '#4DABF7' } }}>
              Terms of Service
            </Link>
            <Link href="#" sx={{ color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: '#4DABF7' } }}>
              Cookie Policy
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
} 