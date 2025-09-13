import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Security,
  School,
  AdminPanelSettings,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    const result = await login(formData.email, formData.password, formData.role);
    
    if (result.success) {
      // Navigate based on user role
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.role === 'student') {
        navigate('/student');
      } else if (user.role === 'security') {
        navigate('/security');
      } else if (user.role === 'admin') {
        navigate('/admin');
      }
    } else {
      setError(result.message);
    }
  };

  const demoAccounts = [
    {
      role: 'Student',
      roleValue: 'student',
      email: 'john.doe@student.fulokoja.edu.ng',
      password: 'password123',
      icon: <School />,
      color: 'var(--student-color)',
      name: 'John Doe (Student)',
    },
    {
      role: 'Student',
      roleValue: 'student',
      email: 'mary.smith@student.fulokoja.edu.ng',
      password: 'student456',
      icon: <School />,
      color: 'var(--student-color)',
      name: 'Mary Smith (Student)',
    },
    {
      role: 'Security',
      roleValue: 'security',
      email: 'ahmed.ibrahim@staff.fulokoja.edu.ng',
      password: 'security123',
      icon: <Security />,
      color: 'var(--security-color)',
      name: 'Ahmed Ibrahim (Security)',
    },
    {
      role: 'Security',
      roleValue: 'security',
      email: 'fatima.usman@staff.fulokoja.edu.ng',
      password: 'security456',
      icon: <Security />,
      color: 'var(--security-color)',
      name: 'Fatima Usman (Security)',
    },
    {
      role: 'Admin',
      roleValue: 'admin',
      email: 'admin@fulokoja.edu.ng',
      password: 'admin123',
      icon: <AdminPanelSettings />,
      color: 'var(--admin-color)',
      name: 'Dr. Adewumi (Admin)',
    },
    {
      role: 'Admin',
      roleValue: 'admin',
      email: 'ict.admin@fulokoja.edu.ng',
      password: 'admin456',
      icon: <AdminPanelSettings />,
      color: 'var(--admin-color)',
      name: 'Prof. Ogunbiyi (Admin)',
    },
  ];

  const handleDemoLogin = (email, password, role) => {
    setFormData({ email, password, role });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, var(--primary-gradient-start) 0%, var(--primary-gradient-end) 25%, var(--primary-dark) 50%, var(--primary-main) 100%)',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 2, sm: 4 },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2 } }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
        <Box sx={{ 
          width: '100%', 
          display: 'flex', 
          gap: { xs: 2, sm: 4 }, 
          flexWrap: 'wrap',
          flexDirection: { xs: 'column', md: 'row' }
        }}>
          {/* Login Form */}
          <Paper
            elevation={8}
            sx={{
              flex: 1,
              minWidth: { xs: '100%', sm: 400 },
              p: { xs: 2, sm: 4 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <Box textAlign="center" mb={4}>
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                sx={{
                  background: 'linear-gradient(45deg, var(--primary-gradient-start), var(--primary-gradient-end))',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold',
                }}
              >
                Safe Guardian
              </Typography>
              <Typography variant="h6" sx={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                Federal University, Lokoja
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--text-disabled)', mt: 1 }}>
                Personal Students' Safety Application
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
                disabled={loading}
              />

              <FormControl fullWidth margin="normal" required disabled={loading}>
                <InputLabel>Select Your Role</InputLabel>
                <Select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  label="Select Your Role"
                >
                  <MenuItem value="student">
                    <Box display="flex" alignItems="center" gap={1}>
                      <School />
                      <Box>
                        <Typography variant="body1" fontWeight="medium">
                          Student
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Login as a student
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                  <MenuItem value="security">
                    <Box display="flex" alignItems="center" gap={1}>
                      <Security />
                      <Box>
                        <Typography variant="body1" fontWeight="medium">
                          Security Personnel
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Login as security staff
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                  <MenuItem value="admin">
                    <Box display="flex" alignItems="center" gap={1}>
                      <AdminPanelSettings />
                      <Box>
                        <Typography variant="body1" fontWeight="medium">
                          Administrator
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Login as system administrator
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                disabled={loading}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2, py: 1.5 }}
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>

              <Box textAlign="center" mt={2}>
                <Typography variant="body2">
                  Don't have an account?{' '}
                  <Link to="/register" style={{ textDecoration: 'none', color: 'var(--primary-main)' }}>
                    Sign up here
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Demo Accounts */}
          <Box sx={{ 
            flex: 1, 
            minWidth: 300,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            p: 3,
            border: '1px solid var(--border-light)',
          }}>
            <Typography 
              variant="h5" 
              gutterBottom 
              textAlign="center" 
              mb={3}
              sx={{ 
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              Demo Accounts
            </Typography>
            <Typography 
              variant="body2" 
              textAlign="center" 
              mb={3}
              sx={{ 
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              Click on any account below to auto-fill the login form
            </Typography>
            
            {demoAccounts.map((account, index) => (
              <Card
                key={index}
                sx={{
                  mb: 2,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(5px)',
                  border: '1px solid var(--border-light)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(14, 165, 233, 0.3)',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
                onClick={() => handleDemoLogin(account.email, account.password, account.roleValue)}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: 1,
                        backgroundColor: account.color,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {account.icon}
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {account.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {account.email}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}

            <Divider sx={{ my: 3 }} />

            <Box textAlign="center">
              <Typography variant="h6" gutterBottom>
                About Safe Guardian
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                A comprehensive safety application designed specifically for students at Federal University, Lokoja. 
                Features include real-time location tracking, emergency alerts, and centralized security monitoring.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Developed by: AIKOYE HANNAH OJOCHEGBE (SCI20CSC021)
              </Typography>
            </Box>
          </Box>
        </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
