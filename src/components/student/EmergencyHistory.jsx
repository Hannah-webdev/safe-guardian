import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Alert,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Warning,
  LocationOn,
  AccessTime,
  CheckCircle,
  Pending,
  Cancel,
  Info,
  Refresh,
} from '@mui/icons-material';
import { format } from 'date-fns';

const EmergencyHistory = () => {
  const [emergencyAlerts, setEmergencyAlerts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadEmergencyHistory();
  }, []);

  const loadEmergencyHistory = () => {
    setLoading(true);
    try {
      const alerts = JSON.parse(localStorage.getItem('emergencyAlerts') || '[]');
      // Sort by timestamp (newest first)
      const sortedAlerts = alerts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setEmergencyAlerts(sortedAlerts);
    } catch (error) {
      console.error('Error loading emergency history:', error);
    } finally {
      setLoading(false);
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

  const formatTimestamp = (timestamp) => {
    try {
      return format(new Date(timestamp), 'MMM dd, yyyy - HH:mm:ss');
    } catch (error) {
      return 'Invalid date';
    }
  };

  const generateSampleData = () => {
    const sampleAlerts = [
      {
        id: 1,
        userId: 1,
        userName: 'John Doe',
        studentId: 'SCI20CSC001',
        location: { lat: 7.8024, lng: 6.7430 },
        message: 'Quick emergency alert - immediate assistance needed',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        status: 'resolved',
        silent: false,
        responseTime: '5 minutes',
        securityNotes: 'Incident resolved. Student was safe.',
      },
      {
        id: 2,
        userId: 1,
        userName: 'John Doe',
        studentId: 'SCI20CSC001',
        location: { lat: 7.8025, lng: 6.7431 },
        message: 'Feeling unsafe near the library area',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        status: 'resolved',
        silent: true,
        responseTime: '3 minutes',
        securityNotes: 'Security patrol dispatched. Area cleared.',
      },
      {
        id: 3,
        userId: 1,
        userName: 'John Doe',
        studentId: 'SCI20CSC001',
        location: { lat: 7.8023, lng: 6.7429 },
        message: 'Suspicious activity near hostel',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
        status: 'resolved',
        silent: false,
        responseTime: '7 minutes',
        securityNotes: 'False alarm. Student was testing the system.',
      },
    ];

    const existingAlerts = JSON.parse(localStorage.getItem('emergencyAlerts') || '[]');
    const combinedAlerts = [...sampleAlerts, ...existingAlerts];
    localStorage.setItem('emergencyAlerts', JSON.stringify(combinedAlerts));
    loadEmergencyHistory();
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Typography>Loading emergency history...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" component="h2">
          Emergency History
        </Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={loadEmergencyHistory}
            sx={{ mr: 1 }}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            onClick={generateSampleData}
            color="secondary"
          >
            Generate Sample Data
          </Button>
        </Box>
      </Box>

      {emergencyAlerts.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Warning sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No Emergency History
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Your emergency alerts and responses will appear here.
            </Typography>
            <Button
              variant="contained"
              onClick={generateSampleData}
              color="secondary"
            >
              Generate Sample Data
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {/* Summary Cards */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="primary" gutterBottom>
                  {emergencyAlerts.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Alerts
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="success.main" gutterBottom>
                  {emergencyAlerts.filter(alert => alert.status === 'resolved').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Resolved
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="warning.main" gutterBottom>
                  {emergencyAlerts.filter(alert => alert.status === 'in_progress').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  In Progress
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="info.main" gutterBottom>
                  {emergencyAlerts.filter(alert => alert.status === 'pending').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pending
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Emergency History Table */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Emergency Alert History
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date & Time</TableCell>
                        <TableCell>Message</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Response Time</TableCell>
                        <TableCell>Type</TableCell>
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
                              {alert.message || 'No message provided'}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <LocationOn sx={{ mr: 0.5, fontSize: 16 }} />
                              <Typography variant="body2">
                                {alert.location.lat.toFixed(4)}, {alert.location.lng.toFixed(4)}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              icon={getStatusIcon(alert.status || 'pending')}
                              label={(alert.status || 'pending').replace('_', ' ').toUpperCase()}
                              color={getStatusColor(alert.status || 'pending')}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {alert.responseTime || 'N/A'}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={alert.silent ? 'Silent' : 'Normal'}
                              color={alert.silent ? 'secondary' : 'primary'}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Tooltip title="View Details">
                              <IconButton size="small">
                                <Info />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Alerts List */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Emergency Alerts
                </Typography>
                <List>
                  {emergencyAlerts.slice(0, 5).map((alert) => (
                    <ListItem key={alert.id} divider>
                      <ListItemIcon>
                        <Warning color={getStatusColor(alert.status)} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box display="flex" alignItems="center" gap={1}>
                            <Typography variant="subtitle1">
                              {alert.message || 'Emergency Alert'}
                            </Typography>
                            <Chip
                              label={alert.status || 'pending'}
                              color={getStatusColor(alert.status || 'pending')}
                              size="small"
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {formatTimestamp(alert.timestamp)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Response Time: {alert.responseTime || 'N/A'}
                            </Typography>
                            {alert.securityNotes && (
                              <Typography variant="body2" color="text.secondary">
                                Notes: {alert.securityNotes}
                              </Typography>
                            )}
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default EmergencyHistory;
