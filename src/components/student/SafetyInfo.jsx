import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Button,
  Alert,
  Paper,
  Divider,
} from '@mui/material';
import {
  ExpandMore,
  Security,
  Phone,
  LocationOn,
  Warning,
  Info,
  School,
  Home,
  Directions,
  ContactPhone,
  Shield,
} from '@mui/icons-material';

const SafetyInfo = () => {
  const [expandedPanel, setExpandedPanel] = useState('emergency-contacts');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : false);
  };

  const emergencyContacts = [
    {
      name: 'Campus Security',
      phone: '+234-803-123-4567',
      description: '24/7 Emergency Response',
      type: 'Security',
    },
    {
      name: 'University Health Center',
      phone: '+234-803-123-4568',
      description: 'Medical Emergencies',
      type: 'Medical',
    },
    {
      name: 'Student Affairs',
      phone: '+234-803-123-4569',
      description: 'Student Support Services',
      type: 'Administration',
    },
    {
      name: 'IT Support',
      phone: '+234-803-123-4570',
      description: 'Technical Issues',
      type: 'Technical',
    },
  ];

  const safetyTips = [
    {
      category: 'General Safety',
      tips: [
        'Always be aware of your surroundings',
        'Avoid walking alone at night',
        'Keep your phone charged and accessible',
        'Trust your instincts - if something feels wrong, it probably is',
        'Stay in well-lit areas',
        'Let someone know where you are going',
      ],
    },
    {
      category: 'Emergency Situations',
      tips: [
        'Stay calm and assess the situation',
        'Use the Safe Guardian app to send an alert',
        'Call emergency services if needed',
        'Move to a safe location if possible',
        'Follow instructions from security personnel',
        'Document the incident if safe to do so',
      ],
    },
    {
      category: 'Technology Safety',
      tips: [
        'Keep your app updated',
        'Enable location services',
        'Test the emergency alert feature regularly',
        'Keep your emergency contacts updated',
        'Report any app issues immediately',
        'Use strong passwords for your account',
      ],
    },
  ];

  const campusLocations = [
    {
      name: 'Main Security Office',
      location: 'Near Main Gate',
      hours: '24/7',
      services: ['Emergency Response', 'Incident Reporting', 'Lost & Found'],
    },
    {
      name: 'Health Center',
      location: 'Behind Admin Block',
      hours: '8:00 AM - 6:00 PM',
      services: ['Medical Emergencies', 'First Aid', 'Health Consultations'],
    },
    {
      name: 'Student Affairs Office',
      location: 'Admin Block, 2nd Floor',
      hours: '8:00 AM - 4:00 PM',
      services: ['Student Support', 'Complaints', 'Guidance & Counseling'],
    },
    {
      name: 'IT Help Desk',
      location: 'Computer Center',
      hours: '8:00 AM - 5:00 PM',
      services: ['Technical Support', 'App Issues', 'Network Problems'],
    },
  ];

  const handleCall = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        Safety Information & Resources
      </Typography>

      <Grid container spacing={3}>
        {/* Emergency Contacts */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <ContactPhone color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Emergency Contacts</Typography>
              </Box>
              <List>
                {emergencyContacts.map((contact, index) => (
                  <ListItem key={index} divider>
                    <ListItemIcon>
                      <Phone color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="subtitle1">{contact.name}</Typography>
                          <Chip
                            label={contact.type}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {contact.description}
                          </Typography>
                          <Typography variant="body2" color="primary">
                            {contact.phone}
                          </Typography>
                        </Box>
                      }
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleCall(contact.phone)}
                    >
                      Call
                    </Button>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Safety Tips */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Shield color="success" sx={{ mr: 1 }} />
                <Typography variant="h6">Quick Safety Tips</Typography>
              </Box>
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  <strong>Remember:</strong> Your safety is our priority. Use the Safe Guardian app 
                  whenever you feel unsafe or need immediate assistance.
                </Typography>
              </Alert>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <Warning color="warning" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Trust your instincts"
                    secondary="If something feels wrong, it probably is"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocationOn color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Stay in well-lit areas"
                    secondary="Avoid dark or isolated locations"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Phone color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Keep your phone charged"
                    secondary="Always have a way to call for help"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Warning color="error" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Use the SOS button"
                    secondary="For immediate emergency assistance"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Detailed Information */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Detailed Safety Information
              </Typography>
              
              {/* Safety Tips Accordion */}
              <Accordion
                expanded={expandedPanel === 'safety-tips'}
                onChange={handleChange('safety-tips')}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box display="flex" alignItems="center">
                    <Info color="primary" sx={{ mr: 1 }} />
                    <Typography variant="subtitle1">Safety Tips & Guidelines</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    {safetyTips.map((category, index) => (
                      <Grid item xs={12} md={4} key={index}>
                        <Paper sx={{ p: 2, height: '100%' }}>
                          <Typography variant="h6" gutterBottom color="primary">
                            {category.category}
                          </Typography>
                          <List dense>
                            {category.tips.map((tip, tipIndex) => (
                              <ListItem key={tipIndex}>
                                <ListItemText
                                  primary={tip}
                                  primaryTypographyProps={{ variant: 'body2' }}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>

              {/* Campus Locations Accordion */}
              <Accordion
                expanded={expandedPanel === 'campus-locations'}
                onChange={handleChange('campus-locations')}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box display="flex" alignItems="center">
                    <School color="primary" sx={{ mr: 1 }} />
                    <Typography variant="subtitle1">Important Campus Locations</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    {campusLocations.map((location, index) => (
                      <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card variant="outlined">
                          <CardContent>
                            <Typography variant="h6" gutterBottom>
                              {location.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              <LocationOn sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                              {location.location}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              <Info sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                              Hours: {location.hours}
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="body2" fontWeight="bold" gutterBottom>
                              Services:
                            </Typography>
                            {location.services.map((service, serviceIndex) => (
                              <Chip
                                key={serviceIndex}
                                label={service}
                                size="small"
                                sx={{ mr: 0.5, mb: 0.5 }}
                              />
                            ))}
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>

              {/* App Usage Guide */}
              <Accordion
                expanded={expandedPanel === 'app-guide'}
                onChange={handleChange('app-guide')}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box display="flex" alignItems="center">
                    <Security color="primary" sx={{ mr: 1 }} />
                    <Typography variant="subtitle1">How to Use Safe Guardian</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom>
                        Emergency Alert Process
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemText
                            primary="1. Press the SOS button"
                            secondary="Located prominently on the main dashboard"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="2. Add emergency message (optional)"
                            secondary="Describe your situation if possible"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="3. Choose alert type"
                            secondary="Normal or silent mode"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="4. Confirm and send"
                            secondary="Security will be notified immediately"
                          />
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom>
                        Features Available
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemText
                            primary="Real-time Location Tracking"
                            secondary="Automatic GPS location sharing"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Emergency Contacts"
                            secondary="Manage personal emergency contacts"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Silent Mode"
                            secondary="Discreet emergency alerts"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="History Tracking"
                            secondary="View past emergency incidents"
                          />
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SafetyInfo;
