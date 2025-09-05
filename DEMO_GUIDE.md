# Safe Guardian - Demo Guide

## Quick Start Demo

### 1. Access the Application

- Open your browser and navigate to: **http://localhost:5173**
- The application should load with the login screen

### 2. Demo Accounts

Use any of these pre-configured accounts to test different user roles:

#### Student Account

- **Email**: `student@fulokoja.edu.ng`
- **Password**: `password123`
- **Features**: Full student dashboard with emergency features

#### Security Account

- **Email**: `security@fulokoja.edu.ng`
- **Password**: `security123`
- **Features**: Security dashboard with alert monitoring

#### Admin Account

- **Email**: `admin@fulokoja.edu.ng`
- **Password**: `admin123`
- **Features**: Administrative dashboard with system management

### 3. Demo Scenarios

#### Scenario 1: Student Emergency Alert

1. Login as a student
2. Click the red "Send Emergency Alert" button
3. Add an emergency message (optional)
4. Choose silent mode if needed
5. Click "Send Alert"
6. Notice the success notification

#### Scenario 2: Security Response

1. Login as security personnel
2. View the "Active Emergency Alerts" section
3. Click "Respond" on any pending alert
4. Add response notes
5. Mark as "In Progress" or "Resolved"

#### Scenario 3: Admin Data Management

1. Login as admin
2. Go to "Data Management" tab
3. Click "Generate All Sample Data"
4. Preview the generated data
5. Export to CSV files

#### Scenario 4: Emergency Contacts

1. Login as student
2. Go to "Emergency Contacts" tab
3. Add a new emergency contact
4. Edit existing contacts
5. Test the call/SMS functionality

### 4. Key Features to Test

#### Student Features

- ✅ SOS Panic Button
- ✅ Silent Alert Mode
- ✅ Emergency Contact Management
- ✅ Emergency History
- ✅ Safety Information
- ✅ Location Tracking

#### Security Features

- ✅ Alert Monitoring Dashboard
- ✅ Real-time Alert Updates
- ✅ Response Management
- ✅ Alert History
- ✅ Quick Actions

#### Admin Features

- ✅ System Overview
- ✅ User Management
- ✅ Data Generation
- ✅ CSV Export
- ✅ System Statistics

### 5. Sample Data Features

#### Generated Data Includes:

- **50+ Students**: With realistic Nigerian names
- **100+ Emergency Alerts**: Various emergency types
- **Emergency Contacts**: Multiple contacts per student
- **Campus Locations**: 8 important locations

#### Data Export:

- Users data: `safe-guardian-users.csv`
- Emergency alerts: `safe-guardian-emergency-alerts.csv`
- Emergency contacts: `safe-guardian-emergency-contacts.csv`
- Campus locations: `safe-guardian-campus-locations.csv`

### 6. Testing Checklist

#### Authentication

- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Registration form validation
- [ ] Role-based access control
- [ ] Logout functionality

#### Student Dashboard

- [ ] SOS button functionality
- [ ] Location tracking
- [ ] Silent mode toggle
- [ ] Emergency contact management
- [ ] Emergency history view
- [ ] Safety information access

#### Security Dashboard

- [ ] Alert monitoring
- [ ] Alert response
- [ ] Status updates
- [ ] Response time tracking
- [ ] Alert history
- [ ] Quick actions

#### Admin Dashboard

- [ ] System statistics
- [ ] User management
- [ ] Data generation
- [ ] CSV export
- [ ] Data preview
- [ ] System settings

#### Responsive Design

- [ ] Desktop view (1920x1080)
- [ ] Tablet view (768x1024)
- [ ] Mobile view (375x667)
- [ ] Navigation on mobile
- [ ] Touch interactions

### 7. Performance Testing

#### Load Testing

- [ ] Page load times
- [ ] Data generation speed
- [ ] CSV export performance
- [ ] Large dataset handling

#### Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### 8. Error Handling

#### Test Error Scenarios

- [ ] Network connectivity issues
- [ ] Invalid form inputs
- [ ] Missing location permissions
- [ ] Browser compatibility issues

### 9. Demo Tips

#### For Presentations

1. Start with the login screen
2. Show the demo accounts
3. Demonstrate student emergency flow
4. Show security response process
5. Display admin data management
6. Highlight the professional UI design

#### For Testing

1. Test all user roles
2. Generate sample data first
3. Try different emergency scenarios
4. Test responsive design
5. Export and verify CSV files

### 10. Troubleshooting

#### Common Issues

- **Dependencies not found**: Run `npm install --legacy-peer-deps`
- **Server not starting**: Check if port 5173 is available
- **Location not working**: Enable location permissions in browser
- **CSV not downloading**: Check browser download settings

#### Browser Requirements

- Modern browser with ES6+ support
- Location services enabled
- JavaScript enabled
- Local storage enabled

---

**Happy Testing!** 🚀

The Safe Guardian application is ready for demonstration and testing. All features have been implemented and are fully functional.
