# Safe Guardian - Personal Students' Safety Application

**Federal University, Lokoja**

A comprehensive web application designed to enhance student safety and emergency response on campus through real-time location tracking, emergency alerts, and centralized security monitoring.

## Project Information

- **Developer**: AIKOYE HANNAH OJOCHEGBE (SCI20CSC021)
- **Supervisor**: PROF. ADEWUMI S.E.
- **Department**: Computer Science, Faculty of Science
- **Institution**: Federal University, Lokoja, Kogi State, Nigeria
- **Date**: June 2025

## Features

### Student Features

- **SOS Panic Button**: One-tap emergency alert system
- **Real-time Location Tracking**: GPS-based location sharing
- **Silent Alert Mode**: Discreet emergency notifications
- **Emergency Contact Management**: Manage personal emergency contacts
- **Emergency History**: View past emergency incidents
- **Safety Information Hub**: Access to safety tips and resources
- **Offline Functionality**: Works even without internet connection

### Security Personnel Features

- **Centralized Dashboard**: Real-time monitoring of all emergency alerts
- **Alert Management**: Respond to and manage emergency incidents
- **Location Visualization**: View student locations on interactive maps
- **Response Tracking**: Monitor response times and incident resolution
- **Communication Tools**: Direct communication with students in distress

### Admin Features

- **System Overview**: Comprehensive system statistics and analytics
- **User Management**: Manage student and security personnel accounts
- **Data Management**: Generate sample data and export reports
- **System Settings**: Configure application settings and policies

## Technology Stack

- **Frontend**: React 19.1.1 with Material-UI (MUI) 5.15.0
- **Build Tool**: Vite 7.1.2
- **Routing**: React Router DOM 6.20.1
- **HTTP Client**: Axios 1.6.2
- **Maps**: Leaflet 1.9.4 with React-Leaflet 4.2.1
- **Real-time Communication**: Socket.IO Client 4.7.4
- **Forms**: React Hook Form 7.48.2
- **Date Handling**: date-fns 2.30.0
- **Charts**: Recharts 2.8.0
- **Notifications**: React Toastify 9.1.3

## Installation & Setup

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd safe-guardian
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Demo Accounts

The application includes pre-configured demo accounts for testing:

### Student Account

- **Email**: student@fulokoja.edu.ng
- **Password**: password123
- **Features**: Full student dashboard with emergency features

### Security Account

- **Email**: security@fulokoja.edu.ng
- **Password**: security123
- **Features**: Security dashboard with alert monitoring

### Admin Account

- **Email**: admin@fulokoja.edu.ng
- **Password**: admin123
- **Features**: Administrative dashboard with system management

## Sample Data Generation

The application includes a comprehensive sample data generator that creates:

- **50+ Student Users**: With realistic Nigerian names and university information
- **100+ Emergency Alerts**: Various types of emergency situations
- **Emergency Contacts**: Multiple contacts per student
- **Campus Locations**: Important locations around Federal University, Lokoja

### Generating Sample Data

1. Login as an admin user
2. Navigate to "Data Management" tab
3. Click "Generate All Sample Data"
4. Export data to CSV files for analysis

## Project Structure

```
src/
├── components/
│   ├── admin/
│   │   ├── AdminDashboard.jsx
│   │   └── DataManagement.jsx
│   ├── auth/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── ProtectedRoute.jsx
│   ├── security/
│   │   └── SecurityDashboard.jsx
│   └── student/
│       ├── StudentDashboard.jsx
│       ├── EmergencyContacts.jsx
│       ├── EmergencyHistory.jsx
│       └── SafetyInfo.jsx
├── contexts/
│   └── AuthContext.jsx
├── utils/
│   └── sampleDataGenerator.js
├── App.jsx
├── main.jsx
└── index.css
```

## Key Features Implementation

### Real-time Location Tracking

- Uses browser's Geolocation API
- Fallback to network-based location
- Automatic location updates during emergencies

### Emergency Alert System

- One-tap SOS button
- Silent mode for discreet alerts
- Automatic notification to security personnel
- Integration with emergency contacts

### Offline Functionality

- Local storage for data persistence
- Queue system for offline actions
- Automatic sync when connection restored

### Data Export

- CSV export functionality
- Comprehensive reporting system
- Sample data generation for testing

## Security Considerations

- User authentication and authorization
- Secure data storage in localStorage
- Input validation and sanitization
- HTTPS enforcement in production
- Regular security updates

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Optimization

- Lazy loading of components
- Optimized bundle size with Vite
- Efficient state management
- Minimal re-renders with React hooks

## Future Enhancements

- Real-time chat functionality
- Push notifications
- Mobile app development
- Integration with university systems
- Advanced analytics and reporting
- Multi-language support

## Contributing

This is an academic project for Federal University, Lokoja. For contributions or suggestions, please contact the developer.

## License

This project is developed for academic purposes at Federal University, Lokoja. All rights reserved.

## Contact Information

- **Developer**: AIKOYE HANNAH OJOCHEGBE
- **Student ID**: SCI20CSC021
- **Email**: [Contact through university]
- **Institution**: Federal University, Lokoja, Kogi State, Nigeria

---

**Note**: This application is designed specifically for Federal University, Lokoja and includes features tailored to the university's campus layout and security requirements.
