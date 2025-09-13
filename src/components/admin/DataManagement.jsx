import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Download,
  Upload,
  Refresh,
  DataObject,
  People,
  Warning,
  ContactPhone,
  School,
  CheckCircle,
  Info,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import {
  generateAllSampleData,
  exportAllDataToCSV,
  exportToCSV,
  campusLocations,
} from '../../utils/sampleDataGenerator';

const DataManagement = () => {
  const [loading, setLoading] = useState(false);
  const [previewDialog, setPreviewDialog] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [previewType, setPreviewType] = useState('');

  const handleGenerateSampleData = async () => {
    setLoading(true);
    try {
      const data = generateAllSampleData();
      toast.success('Sample data generated successfully!');
      console.log('Generated data:', data);
    } catch (error) {
      console.error('Error generating sample data:', error);
      toast.error('Error generating sample data');
    } finally {
      setLoading(false);
    }
  };

  const handleExportAllData = () => {
    try {
      exportAllDataToCSV();
      toast.success('All data exported to CSV files');
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error('Error exporting data');
    }
  };

  const handlePreviewData = (type) => {
    try {
      let data = [];
      let title = '';
      
      switch (type) {
        case 'users':
          data = JSON.parse(localStorage.getItem('sampleUsers') || '[]');
          title = 'Sample Users Data';
          break;
        case 'alerts':
          data = JSON.parse(localStorage.getItem('emergencyAlerts') || '[]');
          title = 'Emergency Alerts Data';
          break;
        case 'contacts':
          data = JSON.parse(localStorage.getItem('emergencyContacts') || '[]');
          title = 'Emergency Contacts Data';
          break;
        case 'locations':
          data = campusLocations;
          title = 'Campus Locations Data';
          break;
        default:
          return;
      }
      
      setPreviewData(data.slice(0, 10)); // Show first 10 records
      setPreviewType(title);
      setPreviewDialog(true);
    } catch (error) {
      console.error('Error loading preview data:', error);
      toast.error('Error loading preview data');
    }
  };

  const handleExportSpecificData = (type) => {
    try {
      let data = [];
      let filename = '';
      
      switch (type) {
        case 'users':
          data = JSON.parse(localStorage.getItem('sampleUsers') || '[]');
          filename = 'safe-guardian-users.csv';
          break;
        case 'alerts':
          data = JSON.parse(localStorage.getItem('emergencyAlerts') || '[]');
          filename = 'safe-guardian-emergency-alerts.csv';
          break;
        case 'contacts':
          data = JSON.parse(localStorage.getItem('emergencyContacts') || '[]');
          filename = 'safe-guardian-emergency-contacts.csv';
          break;
        case 'locations':
          data = campusLocations;
          filename = 'safe-guardian-campus-locations.csv';
          break;
        default:
          return;
      }
      
      if (data.length > 0) {
        exportToCSV(data, filename);
        toast.success(`${filename} exported successfully`);
      } else {
        toast.warning('No data available to export');
      }
    } catch (error) {
      console.error('Error exporting specific data:', error);
      toast.error('Error exporting data');
    }
  };

  const getDataStats = () => {
    const users = JSON.parse(localStorage.getItem('sampleUsers') || '[]');
    const alerts = JSON.parse(localStorage.getItem('emergencyAlerts') || '[]');
    const contacts = JSON.parse(localStorage.getItem('emergencyContacts') || '[]');
    
    return {
      users: users.length,
      alerts: alerts.length,
      contacts: contacts.length,
      locations: campusLocations.length,
    };
  };

  const stats = getDataStats();

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        Data Management
      </Typography>
      
      {/* <Alert severity="info" sx={{ mb: 3 }}>
        This section allows you to generate sample data for testing and demonstration purposes, 
        and export data to CSV files for analysis or backup.
      </Alert> */}

      <Grid container spacing={3}>
        {/* Data Generation */}
        {/* <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sample Data Generation
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Generate realistic sample data for testing the Safe Guardian application.
              </Typography>
              
              <Box display="flex" flexDirection="column" gap={2}>
                <Button
                  variant="contained"
                  startIcon={<DataObject />}
                  onClick={handleGenerateSampleData}
                  disabled={loading}
                  fullWidth
                >
                  {loading ? 'Generating...' : 'Generate All Sample Data'}
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<Download />}
                  onClick={handleExportAllData}
                  fullWidth
                >
                  Export All Data to CSV
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid> */}

        {/* Data Statistics */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Data Statistics
              </Typography>
              
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <People color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Users"
                    secondary={`${stats.users} total users`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Warning color="error" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Emergency Alerts"
                    secondary={`${stats.alerts} total alerts`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ContactPhone color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Emergency Contacts"
                    secondary={`${stats.contacts} total contacts`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <School color="info" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Campus Locations"
                    secondary={`${stats.locations} locations`}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Individual Data Management */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Individual Data Management
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <People sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h6" gutterBottom>
                      Users
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {stats.users} records
                    </Typography>
                    <Box display="flex" gap={1}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handlePreviewData('users')}
                      >
                        Preview
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleExportSpecificData('users')}
                      >
                        Export
                      </Button>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Warning sx={{ fontSize: 40, color: 'error.main', mb: 1 }} />
                    <Typography variant="h6" gutterBottom>
                      Alerts
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {stats.alerts} records
                    </Typography>
                    <Box display="flex" gap={1}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handlePreviewData('alerts')}
                      >
                        Preview
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleExportSpecificData('alerts')}
                      >
                        Export
                      </Button>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <ContactPhone sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                    <Typography variant="h6" gutterBottom>
                      Contacts
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {stats.contacts} records
                    </Typography>
                    <Box display="flex" gap={1}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handlePreviewData('contacts')}
                      >
                        Preview
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleExportSpecificData('contacts')}
                      >
                        Export
                      </Button>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <School sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                    <Typography variant="h6" gutterBottom>
                      Locations
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {stats.locations} records
                    </Typography>
                    <Box display="flex" gap={1}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handlePreviewData('locations')}
                      >
                        Preview
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleExportSpecificData('locations')}
                      >
                        Export
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Data Description */}
        {/* <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sample Data Description
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Generated Data Includes:
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="50+ Student Users"
                        secondary="With realistic names, departments, and contact information"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="100+ Emergency Alerts"
                        secondary="Various types of emergency situations with different statuses"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Emergency Contacts"
                        secondary="Multiple contacts per student with relationships"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Campus Locations"
                        secondary="Important locations around Federal University, Lokoja"
                      />
                    </ListItem>
                  </List>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Data Features:
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <Info color="info" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Realistic Nigerian Names"
                        secondary="Mix of traditional and modern names"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Info color="info" />
                      </ListItemIcon>
                      <ListItemText
                        primary="FULokoja Coordinates"
                        secondary="Accurate location data for the university"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Info color="info" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Various Alert Types"
                        secondary="Medical, security, and general emergency situations"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Info color="info" />
                      </ListItemIcon>
                      <ListItemText
                        primary="CSV Export Ready"
                        secondary="Formatted for easy analysis and reporting"
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid> */}
      </Grid>

      {/* Preview Dialog */}
      <Dialog open={previewDialog} onClose={() => setPreviewDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          {previewType} - Preview (First 10 Records)
        </DialogTitle>
        <DialogContent>
          {previewData && previewData.length > 0 ? (
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {Object.keys(previewData[0]).map((key) => (
                      <TableCell key={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {previewData.map((row, index) => (
                    <TableRow key={index}>
                      {Object.values(row).map((value, cellIndex) => (
                        <TableCell key={cellIndex}>
                          {typeof value === 'object' 
                            ? JSON.stringify(value) 
                            : String(value)
                          }
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Alert severity="warning">
              No data available for preview
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewDialog(false)}>Close</Button>
          <Button 
            variant="contained" 
            onClick={() => {
              const type = previewType.toLowerCase().includes('users') ? 'users' :
                          previewType.toLowerCase().includes('alerts') ? 'alerts' :
                          previewType.toLowerCase().includes('contacts') ? 'contacts' : 'locations';
              handleExportSpecificData(type);
            }}
          >
            Export to CSV
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DataManagement;
