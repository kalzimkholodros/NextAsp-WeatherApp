'use client';

import { AppBar, Toolbar, IconButton, Typography, Box, Button } from '@mui/material';
import { Cloud, LocationOn, Settings, VpnKey, Lock, Logout } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, username, logout } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!mounted) {
    return null;
  }

  return (
    <Box 
      sx={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '100px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: '40px'
      }}
    >
      <Link href="/" style={{ textDecoration: 'none' }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          position: 'relative'
        }}>
          <Box sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}>
            <Cloud 
              sx={{ 
                fontSize: 40,
                color: '#4DABF7',
                filter: 'drop-shadow(0 0 10px rgba(77, 171, 247, 0.5))',
                animation: 'float 3s ease-in-out infinite'
              }} 
            />
            <Typography 
              variant="h4" 
              sx={{ 
                color: 'white',
                fontWeight: 700,
                letterSpacing: '1px',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
                fontFamily: '"Poppins", sans-serif'
              }}
            >
              WeatherApp
            </Typography>
          </Box>
        </Box>
      </Link>
      
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Link href="/location" style={{ textDecoration: 'none' }}>
          <IconButton 
            sx={{ 
              color: pathname === '/location' ? '#4DABF7' : 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                transform: 'scale(1.1)',
                transition: 'all 0.3s ease'
              }
            }}
          >
            <LocationOn sx={{ fontSize: 28 }} />
          </IconButton>
        </Link>
        <Link href="/settings" style={{ textDecoration: 'none' }}>
          <IconButton 
            sx={{ 
              color: pathname === '/settings' ? '#4DABF7' : 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                transform: 'scale(1.1)',
                transition: 'all 0.3s ease'
              }
            }}
          >
            <Settings sx={{ fontSize: 28 }} />
          </IconButton>
        </Link>
        
        {isLoggedIn ? (
          <>
            <Typography
              sx={{
                color: 'white',
                mr: 2,
                fontWeight: 500
              }}
            >
              {username}
            </Typography>
            <Button
              startIcon={<Logout />}
              onClick={handleLogout}
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'scale(1.05)',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/login" style={{ textDecoration: 'none' }}>
              <Button
                startIcon={<VpnKey />}
                sx={{
                  color: pathname === '/login' ? '#4DABF7' : 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'scale(1.05)',
                    transition: 'all 0.3s ease'
                  }
                }}
              >
                Login
              </Button>
            </Link>
            <Link href="/signup" style={{ textDecoration: 'none' }}>
              <Button
                startIcon={<Lock />}
                variant="contained"
                sx={{
                  bgcolor: 'rgba(77, 171, 247, 0.3)',
                  '&:hover': {
                    bgcolor: 'rgba(77, 171, 247, 0.4)',
                    transform: 'scale(1.05)',
                    transition: 'all 0.3s ease'
                  }
                }}
              >
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </Box>
    </Box>
  );
} 