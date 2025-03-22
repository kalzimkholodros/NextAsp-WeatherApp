'use client';

import { Box, Typography, Paper, TextField, Button, Link as MuiLink, Alert } from '@mui/material';
import { VpnKey } from '@mui/icons-material';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(formData.username);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const textFieldStyles = {
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
    '& .MuiInputLabel-root': {
      color: 'rgba(255, 255, 255, 0.7)',
      '&.Mui-focused': {
        color: '#4DABF7',
      },
    },
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
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Paper 
          sx={{ 
            p: 4,
            maxWidth: 400,
            width: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: 'rgba(255, 255, 255, 0.3)'
            }
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <VpnKey sx={{ fontSize: 48, color: '#4DABF7', mb: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Welcome Back
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Please login to your account
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              disabled={loading}
              sx={{ ...textFieldStyles, mb: 3 }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              sx={{ ...textFieldStyles, mb: 4 }}
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              startIcon={<VpnKey />}
              disabled={loading}
              sx={{ 
                mb: 3,
                bgcolor: 'rgba(77, 171, 247, 0.3)',
                '&:hover': {
                  bgcolor: 'rgba(77, 171, 247, 0.4)',
                  transform: 'scale(1.02)',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
              Don't have an account?
            </Typography>
            <MuiLink
              href="/signup"
              sx={{
                color: '#4DABF7',
                textDecoration: 'none',
                '&:hover': {
                  color: '#339AF0',
                  textDecoration: 'underline'
                }
              }}
            >
              Sign Up
            </MuiLink>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
} 