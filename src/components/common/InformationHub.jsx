import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  ExpandMore,
  Security,
  Warning,
  School,
  LocalHospital,
  LocalPolice,
  FireTruck,
  Person,
  Info,
  Emergency,
  Shield,
  Description,
  CheckCircle,
} from '@mui/icons-material';

const InformationHub = () => {
  const [selectedTip, setSelectedTip] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const safetyTips = [
    {
      id: 1,
      title: "Personal Safety",
      icon: <Person />,
      color: "#1976d2",
      tips: [
        "Always inform someone of your whereabouts when going out",
        "Trust your instincts - if something feels wrong, leave immediately",
        "Keep your phone charged and easily accessible",
        "Avoid walking alone at night, especially in isolated areas",
        "Keep emergency contacts on speed dial",
        "Be aware of your surroundings at all times",
        "Don't share personal information with strangers",
        "Use well-lit and populated routes when possible"
      ]
    },
    {
      id: 2,
      title: "Campus Safety",
      icon: <School />,
      color: "#2e7d32",
      tips: [
        "Familiarize yourself with campus emergency exits and routes",
        "Report suspicious activities to security immediately",
        "Use campus escort services when available",
        "Keep your student ID with you at all times",
        "Know the location of campus security offices",
        "Participate in campus safety programs and workshops",
        "Use designated parking areas and well-lit spaces",
        "Report broken lights or security equipment"
      ]
    },
    {
      id: 3,
      title: "Emergency Preparedness",
      icon: <Emergency />,
      color: "#d32f2f",
      tips: [
        "Create an emergency contact list and keep it updated",
        "Know the location of nearest hospitals and police stations",
        "Keep a small emergency kit with basic first aid supplies",
        "Learn basic first aid and CPR techniques",
        "Have a plan for different emergency scenarios",
        "Keep important documents in a safe, accessible place",
        "Know how to use emergency equipment (fire extinguishers, etc.)",
        "Practice emergency evacuation routes"
      ]
    },
    {
      id: 4,
      title: "Digital Safety",
      icon: <Shield />,
      color: "#7b1fa2",
      tips: [
        "Use strong, unique passwords for all accounts",
        "Enable two-factor authentication where possible",
        "Be cautious when sharing location on social media",
        "Don't share personal information online",
        "Keep your devices updated with latest security patches",
        "Use secure Wi-Fi networks and avoid public networks for sensitive activities",
        "Be aware of phishing attempts and suspicious messages",
        "Regularly backup important data"
      ]
    }
  ];

  const emergencyProcedures = [
    {
      title: "Medical Emergency",
      icon: <LocalHospital />,
      color: "#d32f2f",
      steps: [
        "Call emergency services immediately (199 or 112)",
        "Stay calm and assess the situation",
        "Provide clear location information",
        "Follow dispatcher instructions",
        "If trained, provide first aid until help arrives",
        "Keep the victim comfortable and warm",
        "Do not move the victim unless in immediate danger",
        "Gather information for medical personnel"
      ]
    },
    {
      title: "Security Threat",
      icon: <LocalPolice />,
      color: "#1976d2",
      steps: [
        "Call campus security immediately",
        "Move to a safe location if possible",
        "Do not confront the threat directly",
        "Provide detailed description of the threat",
        "Follow security personnel instructions",
        "Evacuate the area if directed",
        "Report any suspicious behavior",
        "Cooperate with authorities"
      ]
    },
    {
      title: "Fire Emergency",
      icon: <FireTruck />,
      color: "#ff5722",
      steps: [
        "Pull the fire alarm immediately",
        "Call emergency services (199 or 112)",
        "Evacuate the building using nearest exit",
        "Do not use elevators during fire",
        "Stay low if there's smoke",
        "Feel doors before opening them",
        "Meet at designated assembly point",
        "Do not re-enter building until cleared"
      ]
    },
    {
      title: "Natural Disaster",
      icon: <Warning />,
      color: "#ff9800",
      steps: [
        "Follow official emergency alerts",
        "Move to designated safe areas",
        "Stay indoors during severe weather",
        "Avoid windows and exterior walls",
        "Have emergency supplies ready",
        "Listen to weather updates",
        "Follow evacuation orders if issued",
        "Check on others when safe to do so"
      ]
    }
  ];


  const handleTipClick = (tip) => {
    setSelectedTip(tip);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTip(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          <Info sx={{ mr: 2, verticalAlign: 'middle' }} />
          Information Hub
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          Your comprehensive safety resource center
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Access essential safety information, emergency procedures, and important contacts
        </Typography>
      </Box>

      {/* Safety Tips Section */}
      <Box mb={6}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
          <Security sx={{ mr: 2, verticalAlign: 'middle' }} />
          Safety Tips
        </Typography>
        <Grid container spacing={3}>
          {safetyTips.map((category) => (
            <Grid item xs={12} sm={6} md={3} key={category.id}>
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                }}
                onClick={() => handleTipClick(category)}
              >
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      backgroundColor: category.color,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    {category.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {category.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.tips.length} safety tips
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Emergency Procedures Section */}
      <Box mb={6}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
          <Emergency sx={{ mr: 2, verticalAlign: 'middle' }} />
          Emergency Procedures
        </Typography>
        <Grid container spacing={3}>
          {emergencyProcedures.map((procedure, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Accordion sx={{ boxShadow: 2 }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        backgroundColor: procedure.color,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                      }}
                    >
                      {procedure.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {procedure.title}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {procedure.steps.map((step, stepIndex) => (
                      <ListItem key={stepIndex} sx={{ py: 0.5 }}>
                        <ListItemIcon>
                          <CheckCircle sx={{ color: procedure.color, fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText primary={step} />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      </Box>


      {/* Quick Actions */}
      <Box>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
          <Description sx={{ mr: 2, verticalAlign: 'middle' }} />
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              startIcon={<Emergency />}
              sx={{ py: 2 }}
              href="tel:199"
            >
              Call Emergency (199)
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              fullWidth
              size="large"
              startIcon={<Security />}
              sx={{ py: 2 }}
              href="tel:+234-803-456-7890"
            >
              Campus Security
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              fullWidth
              size="large"
              startIcon={<LocalHospital />}
              sx={{ py: 2 }}
              href="tel:+234-803-456-7893"
            >
              Health Center
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              fullWidth
              size="large"
              startIcon={<Person />}
              sx={{ py: 2 }}
              href="tel:+234-803-456-7896"
            >
              Student Affairs
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Safety Tips Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: selectedTip?.color,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}
            >
              {selectedTip?.icon}
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {selectedTip?.title} Safety Tips
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <List>
            {selectedTip?.tips.map((tip, index) => (
              <ListItem key={index} sx={{ py: 1 }}>
                <ListItemIcon>
                  <CheckCircle sx={{ color: selectedTip?.color }} />
                </ListItemIcon>
                <ListItemText primary={tip} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default InformationHub;
