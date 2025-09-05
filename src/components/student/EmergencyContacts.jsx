import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Chip,
  Alert,
  Fab,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Phone,
  Person,
  Email,
  Call,
  Message,
} from '@mui/icons-material';
import { toast } from 'react-toastify';

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    relationship: '',
    isPrimary: false,
  });

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = () => {
    const savedContacts = JSON.parse(localStorage.getItem('emergencyContacts') || '[]');
    setContacts(savedContacts);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      toast.error('Name and phone number are required');
      return;
    }

    const newContact = {
      id: editingContact ? editingContact.id : Date.now(),
      ...formData,
      createdAt: editingContact ? editingContact.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    let updatedContacts;
    if (editingContact) {
      updatedContacts = contacts.map(contact =>
        contact.id === editingContact.id ? newContact : contact
      );
    } else {
      updatedContacts = [...contacts, newContact];
    }

    // If this is set as primary, remove primary from others
    if (newContact.isPrimary) {
      updatedContacts = updatedContacts.map(contact => ({
        ...contact,
        isPrimary: contact.id === newContact.id ? true : false,
      }));
    }

    setContacts(updatedContacts);
    localStorage.setItem('emergencyContacts', JSON.stringify(updatedContacts));
    
    toast.success(editingContact ? 'Contact updated successfully' : 'Contact added successfully');
    handleCloseDialog();
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      phone: contact.phone,
      email: contact.email || '',
      relationship: contact.relationship || '',
      isPrimary: contact.isPrimary || false,
    });
    setDialogOpen(true);
  };

  const handleDelete = (contactId) => {
    const updatedContacts = contacts.filter(contact => contact.id !== contactId);
    setContacts(updatedContacts);
    localStorage.setItem('emergencyContacts', JSON.stringify(updatedContacts));
    toast.success('Contact deleted successfully');
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingContact(null);
    setFormData({
      name: '',
      phone: '',
      email: '',
      relationship: '',
      isPrimary: false,
    });
  };

  const handleCall = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleMessage = (phone) => {
    window.open(`sms:${phone}`, '_self');
  };

  const relationships = [
    'Parent',
    'Guardian',
    'Sibling',
    'Friend',
    'Roommate',
    'Classmate',
    'Other',
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" component="h2">
          Emergency Contacts
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setDialogOpen(true)}
        >
          Add Contact
        </Button>
      </Box>

      {contacts.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Person sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No Emergency Contacts
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Add emergency contacts who will be notified in case of an emergency.
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setDialogOpen(true)}
            >
              Add Your First Contact
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={2}>
          {contacts.map((contact) => (
            <Grid item xs={12} sm={6} md={4} key={contact.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {contact.name}
                        {contact.isPrimary && (
                          <Chip
                            label="Primary"
                            size="small"
                            color="primary"
                            sx={{ ml: 1 }}
                          />
                        )}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {contact.relationship}
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(contact)}
                        color="primary"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(contact.id)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>

                  <Box mb={2}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <Phone sx={{ mr: 1, fontSize: 16 }} />
                      <Typography variant="body2">{contact.phone}</Typography>
                    </Box>
                    {contact.email && (
                      <Box display="flex" alignItems="center">
                        <Email sx={{ mr: 1, fontSize: 16 }} />
                        <Typography variant="body2">{contact.email}</Typography>
                      </Box>
                    )}
                  </Box>

                  <Box display="flex" gap={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Call />}
                      onClick={() => handleCall(contact.phone)}
                      fullWidth
                    >
                      Call
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Message />}
                      onClick={() => handleMessage(contact.phone)}
                      fullWidth
                    >
                      SMS
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add/Edit Contact Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingContact ? 'Edit Emergency Contact' : 'Add Emergency Contact'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ pt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email (Optional)"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Relationship"
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleInputChange}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="">Select relationship</option>
                  {relationships.map((rel) => (
                    <option key={rel} value={rel}>
                      {rel}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                  <input
                    type="checkbox"
                    name="isPrimary"
                    checked={formData.isPrimary}
                    onChange={handleInputChange}
                    style={{ marginRight: 8 }}
                  />
                  <Typography variant="body2">
                    Set as primary emergency contact
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingContact ? 'Update' : 'Add'} Contact
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmergencyContacts;
