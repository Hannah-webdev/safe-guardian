import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Alert,
  Fab,
  Avatar,
  Drawer,
  Divider,
} from '@mui/material';
import {
  Warning,
  LocationOn,
  Phone,
  Person,
  Logout,
  Security,
  History,
  Info,
  Menu,
  CheckCircle,
  Campaign,
  Contacts,
  Settings,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import EmergencyContacts from './EmergencyContacts';
import EmergencyHistory from './EmergencyHistory';
import SafetyInfo from './SafetyInfo';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [emergencyDialog, setEmergencyDialog] = useState(false);
  const [emergencyMessage, setEmergencyMessage] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sessionInfo, setSessionInfo] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [contacts, setContacts] = useState([]);

  // Get current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          toast.error('Unable to get your location. Please enable location services.');
        }
      );
    }
  }, []);

  // Load session information
  useEffect(() => {
    const sessionData = localStorage.getItem('sessionData');
    if (sessionData) {
      try {
        const session = JSON.parse(sessionData);
        setSessionInfo(session);
      } catch (error) {
        console.error('Error parsing session data:', error);
      }
    }
  }, []);

  // Load emergency contacts
  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('emergencyContacts') || '[]');
    setContacts(savedContacts);
  }, []);

  const handleEmergencyAlert = async () => {
    if (!currentLocation) {
      toast.error('Location not available. Please enable location services.');
      return;
    }

    try {
      // Get security phone numbers from localStorage or use default
      const securityContacts = JSON.parse(localStorage.getItem('securityContacts') || '[]');
      const defaultSecurityNumbers = [
        '+2348023456789', // Ahmed Ibrahim
        '+2348023456790', // Fatima Usman
        '+2348034567890', // Dr. Adewumi
        '+2348029629012',
      ];

      const phoneNumbers = securityContacts.length > 0 
        ? securityContacts.map(contact => contact.phone)
        : defaultSecurityNumbers;

      // Check if user has emergency contacts
      if (securityContacts.length === 0) {
        toast.warning('⚠️ No emergency contacts found! Using default security numbers. Consider adding your emergency contacts in the Emergency Contacts tab.', {
          autoClose: 5000,
          position: "top-center"
        });
      }

      // Simulate sending emergency alert
      const emergencyData = {
        id: Date.now(),
        userId: user.id,
        userName: user.name,
        studentId: user.studentId,
        location: currentLocation,
        message: emergencyMessage || 'Emergency assistance needed',
        timestamp: new Date().toISOString(),
        status: 'active',
        phoneNumbers: phoneNumbers,
        sentTo: phoneNumbers.map(phone => ({ phone, status: 'sent', timestamp: new Date().toISOString() })),
      };

      // Store in localStorage for demo purposes
      const existingAlerts = JSON.parse(localStorage.getItem('emergencyAlerts') || '[]');
      existingAlerts.push(emergencyData);
      localStorage.setItem('emergencyAlerts', JSON.stringify(existingAlerts));

      // Simulate sending SMS to security numbers
      const smsPromises = phoneNumbers.map(async (phone) => {
        // Simulate SMS sending delay
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
        
        // In a real app, this would send actual SMS
        console.log(`SMS sent to ${phone}: Emergency alert from ${user.name} at ${currentLocation.latitude}, ${currentLocation.longitude}`);
        
        return { phone, status: 'delivered', timestamp: new Date().toISOString() };
      });

      // Wait for all SMS to be "sent"
      await Promise.all(smsPromises);

      toast.success(`Emergency alert sent! Notified ${phoneNumbers.length} security personnel.`);
      setEmergencyDialog(false);
      setEmergencyMessage('');
      
      // Simulate notification to security
      setTimeout(() => {
        toast.info('Security team is on their way to your location.');
      }, 2000);

      // Show location details
      setTimeout(() => {
        toast.info(`Location: ${currentLocation.latitude.toFixed(6)}, ${currentLocation.longitude.toFixed(6)}`);
      }, 3000);

    } catch (error) {
      console.error('Error sending emergency alert:', error);
      toast.error('Failed to send emergency alert. Please try again.');
    }
  };

  const handleQuickEmergency = () => {
    setEmergencyMessage('Quick emergency alert - immediate assistance needed');
    handleEmergencyAlert();
  };


  const renderGuardianAngelUI = () => (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 2, sm: 4 },
        py: 4,
      }}
    >
      {/* Main Title */}
      <Typography
        variant="h2"
        component="h1"
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          mb: 2,
          fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
          background: 'linear-gradient(45deg, #ff6b35, #f7931e)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Emergency Alert
      </Typography>

      {/* Description */}
      <Typography
        variant="h6"
        sx={{
          textAlign: 'center',
          mb: 4,
          maxWidth: 600,
          fontSize: { xs: '1rem', sm: '1.2rem' },
          color: '#e0e0e0',
          lineHeight: 1.6,
        }}
      >
        In case of an emergency, press the button below. Your location will be shared with campus security immediately. Stay safe.
      </Typography>

      {/* Emergency Contacts Status */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="body1" sx={{ color: '#b0b0b0', mb: 1 }}>
          Emergency Contacts: {contacts.length} configured
        </Typography>
        {contacts.length === 0 && (
          <Alert 
            severity="warning" 
            sx={{ 
              maxWidth: 400, 
              backgroundColor: 'rgba(255, 152, 0, 0.1)',
              border: '1px solid rgba(255, 152, 0, 0.3)',
              color: '#ff9800'
            }}
          >
            No emergency contacts found. Add contacts for faster response.
          </Alert>
        )}
      </Box>

      {/* Main Panic Button */}
      <Button
        variant="contained"
        onClick={handleQuickEmergency}
        sx={{
          width: { xs: 200, sm: 250, md: 300 },
          height: { xs: 200, sm: 250, md: 300 },
          borderRadius: '50%',
          backgroundColor: '#ff6b35',
          background: 'linear-gradient(45deg, #ff6b35, #f7931e)',
          boxShadow: '0 8px 32px rgba(255, 107, 53, 0.4)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          fontSize: { xs: '1.5rem', sm: '2rem' },
          fontWeight: 'bold',
          color: 'white',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#e55a2b',
            background: 'linear-gradient(45deg, #e55a2b, #e8821a)',
            boxShadow: '0 12px 40px rgba(255, 107, 53, 0.6)',
            transform: 'scale(1.05)',
          },
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%': {
              boxShadow: '0 8px 32px rgba(255, 107, 53, 0.4)',
            },
            '50%': {
              boxShadow: '0 8px 32px rgba(255, 107, 53, 0.8)',
            },
            '100%': {
              boxShadow: '0 8px 32px rgba(255, 107, 53, 0.4)',
            },
          },
        }}
      >
        <Campaign sx={{ fontSize: { xs: '2rem', sm: '3rem' } }} />
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          PANIC
        </Typography>
      </Button>

      {/* Status Indicators */}
      <Box
        sx={{
          display: 'flex',
          gap: { xs: 2, sm: 4 },
          mt: 4,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <Chip
          icon={<LocationOn />}
          label={currentLocation ? 'Location Active' : 'Location Disabled'}
          color={currentLocation ? 'success' : 'error'}
          variant="outlined"
          sx={{ 
            color: currentLocation ? '#4caf50' : '#f44336',
            borderColor: currentLocation ? '#4caf50' : '#f44336',
          }}
        />
      </Box>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Dark App Bar */}
      <AppBar 
        position="static" 
        sx={{ 
          backgroundColor: '#1a1a1a',
          borderBottom: '1px solid #333',
        }}
      >
        <Toolbar sx={{ flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          
          {/* Guardian Angel Logo */}
          <Box display="flex" alignItems="center" sx={{ mr: 2 }}>
            <Avatar
              sx={{
                backgroundColor: '#ff6b35',
                width: 32,
                height: 32,
                mr: 1,
              }}
            >
              <CheckCircle sx={{ color: 'white' }} />
            </Avatar>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                flexGrow: 1,
                fontSize: { xs: '1rem', sm: '1.25rem' },
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              Safe Guardian
            </Typography>
          </Box>

          <Box 
            display="flex" 
            alignItems="center" 
            gap={{ xs: 1, sm: 2 }}
            sx={{ 
              flexWrap: { xs: 'wrap', sm: 'nowrap' },
              justifyContent: { xs: 'flex-end', sm: 'flex-start' },
              ml: 'auto'
            }}
          >
            <Chip
              icon={<Person />}
              label={`${user.name}`}
              color="secondary"
              variant="outlined"
              sx={{ 
                display: { xs: 'none', sm: 'flex' },
                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                borderColor: 'rgba(255, 255, 255, 0.3)',
              }}
            />
            <IconButton color="inherit" onClick={logout} size="small">
              <Logout />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Navigation Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: '#1a1a1a',
            color: 'white',
            width: 280,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#ff6b35' }}>
            Navigation
          </Typography>
          <Divider sx={{ backgroundColor: '#333', mb: 2 }} />
          
          <List>
            {[
              { key: 'dashboard', label: 'Emergency Alert', icon: <Campaign /> },
              { key: 'contacts', label: 'Emergency Contacts', icon: <Contacts /> },
              { key: 'history', label: 'Alert History', icon: <History /> },
              { key: 'info', label: 'Safety Information', icon: <Info /> },
            ].map((tab) => (
              <ListItem
                key={tab.key}
                button
                onClick={() => {
                  setActiveTab(tab.key);
                  setDrawerOpen(false);
                }}
                sx={{
                  backgroundColor: activeTab === tab.key ? 'rgba(255, 107, 53, 0.2)' : 'transparent',
                  borderRadius: 1,
                  mb: 0.5,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 107, 53, 0.1)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: activeTab === tab.key ? '#ff6b35' : 'white' }}>
                  {tab.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={tab.label}
                  sx={{ color: activeTab === tab.key ? '#ff6b35' : 'white' }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      {activeTab === 'dashboard' && renderGuardianAngelUI()}
      {activeTab === 'contacts' && <EmergencyContacts />}
      {activeTab === 'history' && <EmergencyHistory />}
      {activeTab === 'info' && <SafetyInfo />}

      {/* Emergency Dialog */}
      <Dialog 
        open={emergencyDialog} 
        onClose={() => setEmergencyDialog(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#2d2d2d',
            color: 'white',
          }
        }}
      >
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Warning color="error" sx={{ mr: 1 }} />
            Send Emergency Alert
          </Box>
        </DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            This will immediately notify security personnel of your emergency.
          </Alert>
          {(() => {
            const securityContacts = JSON.parse(localStorage.getItem('securityContacts') || '[]');
            if (securityContacts.length === 0) {
              return (
                <Alert severity="info" sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    <strong>⚠️ No emergency contacts found!</strong><br />
                    This alert will be sent to default security numbers. 
                    Consider adding your emergency contacts in the Emergency Contacts tab for faster response.
                  </Typography>
                </Alert>
              );
            }
            return null;
          })()}
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Emergency Message (Optional)"
            value={emergencyMessage}
            onChange={(e) => setEmergencyMessage(e.target.value)}
            placeholder="Describe your emergency situation..."
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEmergencyDialog(false)}>Cancel</Button>
          <Button
            onClick={handleEmergencyAlert}
            variant="contained"
            color="error"
            startIcon={<Warning />}
          >
            Send Alert
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Buttons */}
      <Box sx={{ position: 'fixed', bottom: 16, right: 16, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Settings Button */}
        <Fab
          color="primary"
          aria-label="settings"
          onClick={() => setActiveTab('contacts')}
          sx={{
            backgroundColor: '#333',
            '&:hover': {
              backgroundColor: '#444',
            },
          }}
        >
          <Settings />
        </Fab>

        {/* Quick Emergency Button */}
        <Fab
          color="error"
          aria-label="quick emergency"
          onClick={handleQuickEmergency}
          sx={{
            backgroundColor: '#ff6b35',
            background: 'linear-gradient(45deg, #ff6b35, #f7931e)',
            boxShadow: '0 4px 20px rgba(255, 107, 53, 0.4)',
            '&:hover': {
              backgroundColor: '#e55a2b',
              background: 'linear-gradient(45deg, #e55a2b, #e8821a)',
              boxShadow: '0 6px 25px rgba(255, 107, 53, 0.6)',
              transform: 'scale(1.1)',
            },
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%': {
                boxShadow: '0 4px 20px rgba(255, 107, 53, 0.4)',
              },
              '50%': {
                boxShadow: '0 4px 20px rgba(255, 107, 53, 0.8)',
              },
              '100%': {
                boxShadow: '0 4px 20px rgba(255, 107, 53, 0.4)',
              },
            },
          }}
        >
          <Campaign />
        </Fab>
      </Box>
    </Box>
  );
};

export default StudentDashboard;
