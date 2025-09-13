import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Chip,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Badge,
  Fab,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from '@mui/material';
import {
  Security,
  Warning,
  LocationOn,
  Person,
  Logout,
  CheckCircle,
  Pending,
  Cancel,
  AccessTime,
  Phone,
  Message,
  Directions,
  Refresh,
  Notifications,
  Map,
  History,
  Assignment,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const SecurityDashboard = () => {
  const { user, logout } = useAuth();
  const [emergencyAlerts, setEmergencyAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [alertDialog, setAlertDialog] = useState(false);
  const [responseNotes, setResponseNotes] = useState('');
  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    loadEmergencyAlerts();
    // Set up real-time updates (simulate with interval)
    const interval = setInterval(loadEmergencyAlerts, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadEmergencyAlerts = () => {
    try {
      const alerts = JSON.parse(localStorage.getItem('emergencyAlerts') || '[]');
      // Sort by timestamp (newest first)
      const sortedAlerts = alerts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setEmergencyAlerts(sortedAlerts);
    } catch (error) {
      console.error('Error loading emergency alerts:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved':
        return 'success';
      case 'in_progress':
        return 'warning';
      case 'pending':
        return 'info';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle />;
      case 'in_progress':
        return <Pending />;
      case 'pending':
        return <AccessTime />;
      case 'cancelled':
        return <Cancel />;
      default:
        return <Info />;
    }
  };

  const handleAlertResponse = (alertId, status) => {
    const updatedAlerts = emergencyAlerts.map(alert => {
      if (alert.id === alertId) {
        return {
          ...alert,
          status: status,
          responseTime: calculateResponseTime(alert.timestamp),
          securityNotes: responseNotes,
          respondedBy: user.name,
          respondedAt: new Date().toISOString(),
        };
      }
      return alert;
    });

    setEmergencyAlerts(updatedAlerts);
    localStorage.setItem('emergencyAlerts', JSON.stringify(updatedAlerts));
    
    toast.success(`Alert ${status.replace('_', ' ')} successfully`);
    setAlertDialog(false);
    setResponseNotes('');
    setSelectedAlert(null);
  };

  const calculateResponseTime = (timestamp) => {
    const start = new Date(timestamp);
    const end = new Date();
    const diffMs = end - start;
    const diffMins = Math.floor(diffMs / 60000);
    return `${diffMins} minutes`;
  };

  const formatTimestamp = (timestamp) => {
    try {
      return format(new Date(timestamp), 'MMM dd, yyyy - HH:mm:ss');
    } catch {
      return 'Invalid date';
    }
  };

  const handleViewAlert = (alert) => {
    setSelectedAlert(alert);
    setAlertDialog(true);
  };

  const generateSampleAlerts = () => {
    const sampleAlerts = [
      {
        id: Date.now() + 1,
        userId: 1,
        userName: 'Alice Johnson',
        studentId: 'SCI20CSC002',
        location: { lat: 7.8024, lng: 6.7430 },
        message: 'Feeling unsafe near the library area, someone is following me',
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
        status: 'pending',
        silent: false,
      },
      {
        id: Date.now() + 2,
        userId: 2,
        userName: 'Bob Smith',
        studentId: 'SCI20CSC003',
        location: { lat: 7.8025, lng: 6.7431 },
        message: 'Medical emergency - need immediate assistance',
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
        status: 'in_progress',
        silent: true,
      },
      {
        id: Date.now() + 3,
        userId: 3,
        userName: 'Carol Davis',
        studentId: 'SCI20CSC004',
        location: { lat: 7.8023, lng: 6.7429 },
        message: 'Suspicious activity near hostel block A',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
        status: 'resolved',
        silent: false,
        responseTime: '8 minutes',
        securityNotes: 'Patrol dispatched, area cleared, no threats found.',
      },
    ];

    const existingAlerts = JSON.parse(localStorage.getItem('emergencyAlerts') || '[]');
    const combinedAlerts = [...sampleAlerts, ...existingAlerts];
    localStorage.setItem('emergencyAlerts', JSON.stringify(combinedAlerts));
    loadEmergencyAlerts();
    toast.success('Sample emergency alerts generated');
  };

  const renderDashboard = () => (
    <Grid container spacing={3}>
      {/* Summary Cards */}
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h4" color="error" gutterBottom>
                  {emergencyAlerts.filter(alert => alert.status === 'pending').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pending Alerts
                </Typography>
              </Box>
              <Warning color="error" sx={{ fontSize: 40 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h4" color="warning.main" gutterBottom>
                  {emergencyAlerts.filter(alert => alert.status === 'in_progress').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  In Progress
                </Typography>
              </Box>
              <Pending color="warning" sx={{ fontSize: 40 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h4" color="success.main" gutterBottom>
                  {emergencyAlerts.filter(alert => alert.status === 'resolved').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Resolved Today
                </Typography>
              </Box>
              <CheckCircle color="success" sx={{ fontSize: 40 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h4" color="primary" gutterBottom>
                  {emergencyAlerts.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Alerts
                </Typography>
              </Box>
              <Notifications color="primary" sx={{ fontSize: 40 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Active Alerts */}
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Active Emergency Alerts</Typography>
              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={loadEmergencyAlerts}
                size="small"
              >
                Refresh
              </Button>
            </Box>
            
            {emergencyAlerts.filter(alert => alert.status === 'pending' || alert.status === 'in_progress').length === 0 ? (
              <Alert severity="success">
                No active emergency alerts at this time.
              </Alert>
            ) : (
              <List>
                {emergencyAlerts
                  .filter(alert => alert.status === 'pending' || alert.status === 'in_progress')
                  .map((alert) => (
                    <ListItem key={alert.id} divider>
                      <ListItemIcon>
                        <Badge color="error" variant="dot">
                          <Warning color="error" />
                        </Badge>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box display="flex" alignItems="center" gap={1}>
                            <Typography variant="subtitle1">
                              {alert.userName} ({alert.studentId})
                            </Typography>
                            <Chip
                              label={alert.status}
                              color={getStatusColor(alert.status)}
                              size="small"
                            />
                            {alert.silent && (
                              <Chip
                                label="Silent"
                                color="secondary"
                                size="small"
                              />
                            )}
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {alert.message || 'No message provided'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {formatTimestamp(alert.timestamp)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Location: {alert.location.lat.toFixed(4)}, {alert.location.lng.toFixed(4)}
                            </Typography>
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Box display="flex" gap={1}>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleViewAlert(alert)}
                          >
                            View
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => handleAlertResponse(alert.id, 'in_progress')}
                          >
                            Respond
                          </Button>
                        </Box>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
              </List>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Quick Actions */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              {/* <Button
                variant="contained"
                color="primary"
                startIcon={<Map />}
                fullWidth
              >
                View Campus Map
              </Button> */}
              <Button
                variant="outlined"
                startIcon={<Phone />}
                fullWidth
              >
                Call Emergency Services
              </Button>
              <Button
                variant="outlined"
                startIcon={<Assignment />}
                fullWidth
                onClick={generateSampleAlerts}
              >
                Generate Sample Alerts
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderAlertHistory = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Emergency Alert History
        </Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell>Student</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Response Time</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {emergencyAlerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>
                    <Typography variant="body2">
                      {formatTimestamp(alert.timestamp)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {alert.userName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {alert.studentId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {alert.message || 'No message'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={getStatusIcon(alert.status)}
                      label={alert.status.replace('_', ' ').toUpperCase()}
                      color={getStatusColor(alert.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {alert.responseTime || 'N/A'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleViewAlert(alert)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );

  const speedDialActions = [
    {
      icon: <Warning />,
      name: 'New Alert',
      action: () => generateSampleAlerts(),
      color: '#f44336',
    },
    // {
    //   icon: <Map />,
    //   name: 'View Map',
    //   action: () => setActiveTab('map'),
    // },
    {
      icon: <History />,
      name: 'Alert History',
      action: () => setActiveTab('history'),
    },
    {
      icon: <Refresh />,
      name: 'Refresh',
      action: loadEmergencyAlerts,
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* App Bar */}
      <AppBar 
        position="static" 
        sx={{ 
          backgroundColor: '#064e3b',
          background: 'linear-gradient(45deg, #064e3b, #065f46, #047857)',
        }}
      >
        <Toolbar sx={{ flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
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
            Safe Guardian - Security Dashboard
          </Typography>
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
              icon={<Security />}
              label={`${user.name} (Security Officer)`}
              color="secondary"
              variant="outlined"
              sx={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: 'white',
                borderColor: 'rgba(255, 255, 255, 0.4)',
                fontSize: { xs: '0.7rem', sm: '0.8rem' },
              }}
            />
            <IconButton color="inherit" onClick={logout} size="small">
              <Logout />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
        {/* Tab Navigation */}
        <Box sx={{ mb: 3 }}>
          <Box display="flex" gap={1} flexWrap="wrap">
            {[
              // { key: 'dashboard', label: 'Dashboard', icon: <Security /> },
              // { key: 'history', label: 'Alert History', icon: <History /> },
              // { key: 'map', label: 'Campus Map', icon: <Map /> },
            ].map((tab) => (
              <Button
                key={tab.key}
                variant={activeTab === tab.key ? 'contained' : 'outlined'}
                startIcon={tab.icon}
                onClick={() => setActiveTab(tab.key)}
                sx={{ mb: 1 }}
              >
                {tab.label}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Content */}
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'history' && renderAlertHistory()}
        {activeTab === 'map' && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Campus Map View
              </Typography>
              <Alert severity="info">
                Interactive campus map with real-time alert locations would be displayed here.
                This feature requires integration with mapping services like Google Maps or OpenStreetMap.
              </Alert>
            </CardContent>
          </Card>
        )}
      </Container>

      {/* Alert Details Dialog */}
      <Dialog open={alertDialog} onClose={() => setAlertDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Warning color="error" sx={{ mr: 1 }} />
            Emergency Alert Details
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedAlert && (
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Student Information
                  </Typography>
                  <Typography variant="body2">
                    <strong>Name:</strong> {selectedAlert.userName}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Student ID:</strong> {selectedAlert.studentId}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Alert Time:</strong> {formatTimestamp(selectedAlert.timestamp)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Location Information
                  </Typography>
                  <Typography variant="body2">
                    <strong>Coordinates:</strong> {selectedAlert.location.lat.toFixed(6)}, {selectedAlert.location.lng.toFixed(6)}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Alert Type:</strong> {selectedAlert.silent ? 'Silent' : 'Normal'}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Status:</strong> {selectedAlert.status}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Emergency Message
                  </Typography>
                  <Typography variant="body2">
                    {selectedAlert.message || 'No message provided'}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Response Notes"
                    value={responseNotes}
                    onChange={(e) => setResponseNotes(e.target.value)}
                    placeholder="Add notes about your response to this emergency..."
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAlertDialog(false)}>Close</Button>
          <Button
            onClick={() => handleAlertResponse(selectedAlert.id, 'in_progress')}
            variant="contained"
            color="warning"
          >
            Mark In Progress
          </Button>
          <Button
            onClick={() => handleAlertResponse(selectedAlert.id, 'resolved')}
            variant="contained"
            color="success"
          >
            Mark Resolved
          </Button>
        </DialogActions>
      </Dialog>

      {/* Speed Dial for Quick Actions */}
      <SpeedDial
        ariaLabel="Security actions"
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

export default SecurityDashboard;
