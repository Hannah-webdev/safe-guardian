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
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from '@mui/material';
import {
  Warning,
  LocationOn,
  Phone,
  Person,
  Logout,
  Add,
  Edit,
  Delete,
  Notifications,
  Security,
  History,
  Info,
  PanTool,
  VolumeOff,
  VolumeUp,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import EmergencyContacts from './EmergencyContacts';
import EmergencyHistory from './EmergencyHistory';
import SafetyInfo from './SafetyInfo';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [silentMode, setSilentMode] = useState(false);
  const [emergencyDialog, setEmergencyDialog] = useState(false);
  const [emergencyMessage, setEmergencyMessage] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [speedDialOpen, setSpeedDialOpen] = useState(false);

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

      // Simulate sending emergency alert
      const emergencyData = {
        id: Date.now(),
        userId: user.id,
        userName: user.name,
        studentId: user.studentId,
        location: currentLocation,
        message: emergencyMessage || 'Emergency assistance needed',
        timestamp: new Date().toISOString(),
        silent: silentMode,
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

  const speedDialActions = [
    {
      icon: <Warning />,
      name: 'Quick SOS',
      action: handleQuickEmergency,
      color: '#f44336',
    },
    {
      icon: <Add />,
      name: 'Add Contact',
      action: () => setActiveTab('contacts'),
    },
    {
      icon: <History />,
      name: 'Emergency History',
      action: () => setActiveTab('history'),
    },
    {
      icon: <Info />,
      name: 'Safety Info',
      action: () => setActiveTab('info'),
    },
  ];

  const renderDashboard = () => (
    <Grid container spacing={{ xs: 2, sm: 3 }}>
      {/* Emergency Status Card */}
      <Grid item xs={12} md={6}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              <Warning color="error" sx={{ mr: 1 }} />
              <Typography variant="h6">Emergency Status</Typography>
            </Box>
            <Alert severity="success" sx={{ mb: 2 }}>
              You are currently safe. No active emergencies.
            </Alert>
            <Typography variant="body2" color="text.secondary">
              Last location update: {currentLocation ? 'Active' : 'Not available'}
            </Typography>
            {currentLocation && (
              <Typography variant="body2" color="text.secondary">
                Coordinates: {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Quick Actions */}
      <Grid item xs={12} md={6}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <Button
                variant="contained"
                color="error"
                size="large"
                startIcon={<Warning />}
                onClick={() => setEmergencyDialog(true)}
                sx={{ 
                  py: { xs: 1, sm: 1.5 },
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  fontWeight: 'bold',
                  boxShadow: '0 4px 15px rgba(244, 67, 54, 0.3)',
                  '&:hover': {
                    boxShadow: '0 6px 20px rgba(244, 67, 54, 0.4)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Send Emergency Alert
              </Button>
              <Button
                variant="contained"
                color="error"
                size="large"
                onClick={handleQuickEmergency}
                sx={{ 
                  py: { xs: 1, sm: 1.5 },
                  fontSize: { xs: '1rem', sm: '1.2rem' },
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #f44336, #d32f2f)',
                  boxShadow: '0 4px 15px rgba(244, 67, 54, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #d32f2f, #b71c1c)',
                    boxShadow: '0 6px 20px rgba(244, 67, 54, 0.5)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                🚨 IMMEDIATE SOS 🚨
              </Button>
              <Button
                variant="outlined"
                startIcon={silentMode ? <VolumeOff /> : <VolumeUp />}
                onClick={() => setSilentMode(!silentMode)}
                color={silentMode ? 'error' : 'primary'}
              >
                {silentMode ? 'Silent Mode ON' : 'Silent Mode OFF'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Location Status */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              <LocationOn color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Location Status</Typography>
            </Box>
            <Typography variant="body1" gutterBottom>
              Current Status: {currentLocation ? 'Tracking Active' : 'Location Disabled'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your location is {currentLocation ? 'being tracked' : 'not available'} for emergency response.
            </Typography>
            {!currentLocation && (
              <Button
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
                onClick={() => window.location.reload()}
              >
                Enable Location
              </Button>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Recent Activity */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <Security color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="System Check"
                  secondary="Last checked: 2 minutes ago"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocationOn color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Location Updated"
                  secondary="GPS coordinates refreshed"
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* App Bar */}
      <AppBar position="static" color="primary">
        <Toolbar sx={{ flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontSize: { xs: '1rem', sm: '1.25rem' },
              minWidth: 0
            }}
          >
            Safe Guardian - Student Portal
          </Typography>
          <Box 
            display="flex" 
            alignItems="center" 
            gap={{ xs: 1, sm: 2 }}
            sx={{ 
              flexWrap: { xs: 'wrap', sm: 'nowrap' },
              justifyContent: { xs: 'flex-end', sm: 'flex-start' }
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={handleQuickEmergency}
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                px: { xs: 1.5, sm: 2 },
                py: 1,
                background: 'linear-gradient(45deg, #f44336, #d32f2f)',
                boxShadow: '0 2px 10px rgba(244, 67, 54, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #d32f2f, #b71c1c)',
                  boxShadow: '0 4px 15px rgba(244, 67, 54, 0.4)',
                },
              }}
            >
              🚨 SOS
            </Button>
            <Chip
              icon={<Person />}
              label={`${user.name} (${user.studentId})`}
              color="secondary"
              variant="outlined"
              sx={{ 
                display: { xs: 'none', sm: 'flex' },
                fontSize: { xs: '0.7rem', sm: '0.8rem' }
              }}
            />
            <IconButton color="inherit" onClick={logout} size="small">
              <Logout />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: { xs: 2, sm: 3 }, mb: { xs: 2, sm: 3 }, px: { xs: 1, sm: 2 } }}>
        {/* Tab Navigation */}
        <Box sx={{ mb: 3 }}>
          <Box 
            display="flex" 
            gap={{ xs: 0.5, sm: 1 }} 
            flexWrap="wrap"
            sx={{ 
              justifyContent: { xs: 'center', sm: 'flex-start' },
              '& .MuiButton-root': {
                fontSize: { xs: '0.7rem', sm: '0.875rem' },
                px: { xs: 1, sm: 2 },
                py: { xs: 0.5, sm: 1 },
                minWidth: { xs: 'auto', sm: 120 },
                flex: { xs: '1 1 auto', sm: 'none' },
                maxWidth: { xs: '48%', sm: 'none' }
              }
            }}
          >
            {[
              { key: 'dashboard', label: 'Dashboard', icon: <Security /> },
              { key: 'contacts', label: 'Emergency Contacts', icon: <Phone /> },
              { key: 'history', label: 'History', icon: <History /> },
              { key: 'info', label: 'Safety Info', icon: <Info /> },
            ].map((tab) => (
              <Button
                key={tab.key}
                variant={activeTab === tab.key ? 'contained' : 'outlined'}
                startIcon={tab.icon}
                onClick={() => setActiveTab(tab.key)}
                sx={{ mb: 1 }}
              >
                <Box sx={{ display: { xs: 'none', sm: 'inline' } }}>
                  {tab.label}
                </Box>
                <Box sx={{ display: { xs: 'inline', sm: 'none' } }}>
                  {tab.label.split(' ')[0]}
                </Box>
              </Button>
            ))}
          </Box>
        </Box>

        {/* Content */}
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'contacts' && <EmergencyContacts />}
        {activeTab === 'history' && <EmergencyHistory />}
        {activeTab === 'info' && <SafetyInfo />}
      </Container>

      {/* Emergency Dialog */}
      <Dialog open={emergencyDialog} onClose={() => setEmergencyDialog(false)} maxWidth="sm" fullWidth>
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
          <Box display="flex" alignItems="center" mt={2}>
            <Chip
              icon={silentMode ? <VolumeOff /> : <VolumeUp />}
              label={silentMode ? 'Silent Mode ON' : 'Silent Mode OFF'}
              color={silentMode ? 'error' : 'primary'}
              onClick={() => setSilentMode(!silentMode)}
            />
          </Box>
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

      {/* Emergency SOS Button - Always Visible (Left Side) */}
      <Fab
        color="error"
        aria-label="Emergency SOS"
        sx={{
          position: 'fixed',
          bottom: 80,
          left: 16,
          width: { xs: 80, sm: 90 },
          height: { xs: 80, sm: 90 },
          fontSize: { xs: '1.1rem', sm: '1.3rem' },
          fontWeight: 'bold',
          zIndex: 1000,
          background: 'linear-gradient(45deg, #f44336, #d32f2f)',
          boxShadow: '0 6px 25px rgba(244, 67, 54, 0.5)',
          '&:hover': {
            boxShadow: '0 8px 30px rgba(244, 67, 54, 0.7)',
            transform: 'scale(1.1)',
            background: 'linear-gradient(45deg, #d32f2f, #b71c1c)',
          },
          animation: 'pulse 1.5s infinite',
          '@keyframes pulse': {
            '0%': {
              boxShadow: '0 0 0 0 rgba(244, 67, 54, 0.8)',
            },
            '70%': {
              boxShadow: '0 0 0 15px rgba(244, 67, 54, 0)',
            },
            '100%': {
              boxShadow: '0 0 0 0 rgba(244, 67, 54, 0)',
            },
          },
        }}
        onClick={handleQuickEmergency}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white' }}>
          🚨
        </Typography>
      </Fab>

      {/* Speed Dial for Quick Actions */}
      <SpeedDial
        ariaLabel="Emergency actions"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={() => setSpeedDialOpen(false)}
        onOpen={() => setSpeedDialOpen(true)}
        open={speedDialOpen}
      >
        {speedDialActions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => {
              action.action();
              setSpeedDialOpen(false);
            }}
            sx={{ color: action.color }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default StudentDashboard;
