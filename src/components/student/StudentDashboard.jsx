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
import InformationHub from '../common/InformationHub';

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
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
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
          background: 'linear-gradient(45deg, #dc2626, #ef4444, #b91c1c)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        PANIC
            </Typography>

      {/* Description */}
      <Typography
        variant="h6"
        sx={{
          textAlign: 'center',
          mb: 4,
          maxWidth: 600,
          fontSize: { xs: '1rem', sm: '1.2rem' },
          color: 'var(--text-white)',
          lineHeight: 1.6,
        }}
      >
        In case of an emergency, press the button below. Your location will be shared with campus security immediately. Stay safe.
              </Typography>

      {/* Emergency Contacts Status */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="body1" sx={{ color: 'var(--text-disabled)', mb: 1 }}>
          Emergency Contacts: {contacts.length} configured
            </Typography>
        {contacts.length === 0 && (
          <Alert 
            severity="warning" 
                sx={{ 
              maxWidth: 400, 
              backgroundColor: 'rgba(255, 107, 53, 0.15)',
              border: '1px solid rgba(255, 107, 53, 0.4)',
              color: 'var(--accent-emerald)'
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
          backgroundColor: '#dc2626',
          background: 'linear-gradient(45deg, #dc2626, #ef4444, #b91c1c)',
          boxShadow: '0 8px 32px rgba(220, 38, 38, 0.6)',
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
            backgroundColor: '#b91c1c',
            background: 'linear-gradient(45deg, #b91c1c, #dc2626, #991b1b)',
            boxShadow: '0 12px 40px rgba(220, 38, 38, 0.8)',
            transform: 'scale(1.05)',
          },
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%': {
              boxShadow: '0 8px 32px rgba(220, 38, 38, 0.4)',
            },
            '50%': {
              boxShadow: '0 8px 32px rgba(220, 38, 38, 0.8)',
            },
            '100%': {
              boxShadow: '0 8px 32px rgba(220, 38, 38, 0.4)',
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
            color: currentLocation ? 'var(--success-main)' : 'var(--error-main)',
            borderColor: currentLocation ? 'var(--success-main)' : 'var(--error-main)',
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
          backgroundColor: 'var(--background-dark)',
          borderBottom: '1px solid var(--text-secondary)',
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
            {/* <Avatar
              sx={{
                backgroundColor: 'var(--accent-emerald)',
                width: 32,
                height: 32,
                mr: 1,
              }}
            >
              <CheckCircle sx={{ color: 'white' }} />
            </Avatar> */}
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
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: 'white',
                borderColor: 'rgba(255, 255, 255, 0.4)',
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
            backgroundColor: 'var(--background-dark)',
            color: 'white',
            width: 280,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'var(--warning-main)' }}>
            Navigation
          </Typography>
          <Divider sx={{ backgroundColor: 'var(--text-secondary)', mb: 2 }} />
          
          <List>
            {[
              { key: 'dashboard', label: 'Emergency Alert', icon: <Campaign /> },
              { key: 'contacts', label: 'Emergency Contacts', icon: <Contacts /> },
              { key: 'history', label: 'Alert History', icon: <History /> },
              { key: 'info', label: 'Safety Information', icon: <Info /> },
              { key: 'hub', label: 'Information Hub', icon: <Security /> },
            ].map((tab) => (
              <ListItem
                key={tab.key}
                button
                onClick={() => {
                  setActiveTab(tab.key);
                  setDrawerOpen(false);
                }}
                sx={{
                  backgroundColor: activeTab === tab.key ? 'rgba(255, 107, 53, 0.25)' : 'transparent',
                  borderRadius: 1,
                  mb: 0.5,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 107, 53, 0.1)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: activeTab === tab.key ? 'var(--warning-main)' : 'white' }}>
                  {tab.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={tab.label}
                  sx={{ color: activeTab === tab.key ? 'var(--warning-main)' : 'white' }}
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
        {activeTab === 'hub' && <InformationHub />}

      {/* Emergency Dialog */}
      <Dialog 
        open={emergencyDialog} 
        onClose={() => setEmergencyDialog(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: 'var(--background-card-dark)',
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
            backgroundColor: 'var(--text-secondary)',
            '&:hover': {
              backgroundColor: 'var(--text-disabled)',
            },
          }}
        >
          <Settings />
        </Fab>

        {/* Quick Emergency Button */}
      {/* <Fab
        color="error"
          aria-label="quick emergency"
          onClick={handleQuickEmergency}
        sx={{
            backgroundColor: 'var(--accent-emerald)',
            background: 'linear-gradient(45deg, var(--accent-emerald), var(--accent-emerald-light))',
            boxShadow: '0 4px 20px rgba(255, 107, 53, 0.4)',
          '&:hover': {
            backgroundColor: 'var(--accent-emerald-dark)',
            background: 'linear-gradient(45deg, var(--accent-emerald-dark), var(--accent-emerald-light), var(--accent-emerald-dark))',
            boxShadow: '0 6px 25px rgba(255, 107, 53, 0.7)',
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
      </Fab> */}
      
      </Box>
    </Box>
  );
};

export default StudentDashboard;
