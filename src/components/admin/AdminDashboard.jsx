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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from '@mui/material';
import {
  AdminPanelSettings,
  Person,
  Logout,
  Security,
  Warning,
  TrendingUp,
  TrendingDown,
  Assessment,
  People,
  Notifications,
  Settings,
  Download,
  DataObject,
  Upload,
  Refresh,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import DataManagement from './DataManagement';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [emergencyAlerts, setEmergencyAlerts] = useState([]);
  const [users, setUsers] = useState([]);
  const [systemStats, setSystemStats] = useState({
    totalUsers: 0,
    activeAlerts: 0,
    resolvedAlerts: 0,
    averageResponseTime: '0 minutes',
  });
  const [activeTab, setActiveTab] = useState('overview');
  const [userDialog, setUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    loadEmergencyAlerts();
    loadUsers();
    calculateSystemStats();
  };

  const loadEmergencyAlerts = () => {
    try {
      const alerts = JSON.parse(localStorage.getItem('emergencyAlerts') || '[]');
      setEmergencyAlerts(alerts);
    } catch (error) {
      console.error('Error loading emergency alerts:', error);
    }
  };

  const loadUsers = () => {
    try {
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const mockUsers = [
        {
          id: 1,
          name: 'John Doe',
          email: 'student@fulokoja.edu.ng',
          studentId: 'SCI20CSC001',
          department: 'Computer Science',
          level: '400',
          role: 'student',
          status: 'active',
          lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          emergencyAlerts: 3,
        },
        {
          id: 2,
          name: 'Alice Johnson',
          email: 'alice@fulokoja.edu.ng',
          studentId: 'SCI20CSC002',
          department: 'Mathematics',
          level: '300',
          role: 'student',
          status: 'active',
          lastLogin: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          emergencyAlerts: 1,
        },
        {
          id: 3,
          name: 'Bob Smith',
          email: 'bob@fulokoja.edu.ng',
          studentId: 'SCI20CSC003',
          department: 'Physics',
          level: '200',
          role: 'student',
          status: 'active',
          lastLogin: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          emergencyAlerts: 2,
        },
        {
          id: 4,
          name: 'Security Officer',
          email: 'security@fulokoja.edu.ng',
          employeeId: 'SEC001',
          department: 'Security',
          role: 'security',
          status: 'active',
          lastLogin: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
          emergencyAlerts: 0,
        },
      ];
      setUsers([...mockUsers, ...registeredUsers]);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const calculateSystemStats = () => {
    const totalUsers = users.length;
    const activeAlerts = emergencyAlerts.filter(alert => 
      alert.status === 'pending' || alert.status === 'in_progress'
    ).length;
    const resolvedAlerts = emergencyAlerts.filter(alert => 
      alert.status === 'resolved'
    ).length;
    
    // Calculate average response time
    const alertsWithResponseTime = emergencyAlerts.filter(alert => alert.responseTime);
    const totalResponseTime = alertsWithResponseTime.reduce((sum, alert) => {
      const timeStr = alert.responseTime;
      const minutes = parseInt(timeStr.split(' ')[0]) || 0;
      return sum + minutes;
    }, 0);
    const averageResponseTime = alertsWithResponseTime.length > 0 
      ? Math.round(totalResponseTime / alertsWithResponseTime.length)
      : 0;

    setSystemStats({
      totalUsers,
      activeAlerts,
      resolvedAlerts,
      averageResponseTime: `${averageResponseTime} minutes`,
    });
  };

  const generateSystemReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      systemStats,
      totalAlerts: emergencyAlerts.length,
      usersByRole: {
        students: users.filter(u => u.role === 'student').length,
        security: users.filter(u => u.role === 'security').length,
        admin: users.filter(u => u.role === 'admin').length,
      },
      alertsByStatus: {
        pending: emergencyAlerts.filter(a => a.status === 'pending').length,
        in_progress: emergencyAlerts.filter(a => a.status === 'in_progress').length,
        resolved: emergencyAlerts.filter(a => a.status === 'resolved').length,
        cancelled: emergencyAlerts.filter(a => a.status === 'cancelled').length,
      },
    };

    // Create and download CSV
    const csvContent = generateCSVReport(report);
    downloadCSV(csvContent, 'safe-guardian-system-report.csv');
    toast.success('System report generated and downloaded');
  };

  const generateCSVReport = (report) => {
    let csv = 'Safe Guardian System Report\n';
    csv += `Generated: ${format(new Date(report.generatedAt), 'yyyy-MM-dd HH:mm:ss')}\n\n`;
    
    csv += 'System Statistics\n';
    csv += 'Metric,Value\n';
    csv += `Total Users,${report.systemStats.totalUsers}\n`;
    csv += `Active Alerts,${report.systemStats.activeAlerts}\n`;
    csv += `Resolved Alerts,${report.systemStats.resolvedAlerts}\n`;
    csv += `Average Response Time,${report.systemStats.averageResponseTime}\n\n`;
    
    csv += 'Users by Role\n';
    csv += 'Role,Count\n';
    csv += `Students,${report.usersByRole.students}\n`;
    csv += `Security,${report.usersByRole.security}\n`;
    csv += `Admin,${report.usersByRole.admin}\n\n`;
    
    csv += 'Alerts by Status\n';
    csv += 'Status,Count\n';
    csv += `Pending,${report.alertsByStatus.pending}\n`;
    csv += `In Progress,${report.alertsByStatus.in_progress}\n`;
    csv += `Resolved,${report.alertsByStatus.resolved}\n`;
    csv += `Cancelled,${report.alertsByStatus.cancelled}\n\n`;
    
    csv += 'Emergency Alerts Details\n';
    csv += 'ID,Student Name,Student ID,Message,Status,Timestamp,Response Time\n';
    emergencyAlerts.forEach(alert => {
      csv += `${alert.id},${alert.userName},${alert.studentId},"${alert.message || ''}",${alert.status},${format(new Date(alert.timestamp), 'yyyy-MM-dd HH:mm:ss')},${alert.responseTime || 'N/A'}\n`;
    });
    
    return csv;
  };

  const downloadCSV = (content, filename) => {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const renderOverview = () => (
    <Grid container spacing={3}>
      {/* System Statistics */}
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h4" color="primary" gutterBottom>
                  {systemStats.totalUsers}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Users
                </Typography>
              </Box>
              <People color="primary" sx={{ fontSize: 40 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h4" color="error" gutterBottom>
                  {systemStats.activeAlerts}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Alerts
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
                <Typography variant="h4" color="success.main" gutterBottom>
                  {systemStats.resolvedAlerts}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Resolved Today
                </Typography>
              </Box>
              <Assessment color="success" sx={{ fontSize: 40 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h4" color="info.main" gutterBottom>
                  {systemStats.averageResponseTime}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Avg Response Time
                </Typography>
              </Box>
              <TrendingUp color="info" sx={{ fontSize: 40 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Recent Activity */}
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Emergency Alerts
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {emergencyAlerts.slice(0, 5).map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell>
                        <Typography variant="body2">
                          {format(new Date(alert.timestamp), 'MMM dd, HH:mm')}
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
                          label={alert.status}
                          color={alert.status === 'resolved' ? 'success' : 'warning'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {alert.responseTime || 'N/A'}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Quick Actions */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              System Management
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <Button
                variant="contained"
                startIcon={<Download />}
                onClick={generateSystemReport}
                fullWidth
              >
                Generate Report
              </Button>
              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={loadData}
                fullWidth
              >
                Refresh Data
              </Button>
              <Button
                variant="outlined"
                startIcon={<Settings />}
                fullWidth
              >
                System Settings
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderUsers = () => (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">User Management</Typography>
          <Button
            variant="contained"
            startIcon={<Person />}
            onClick={() => setUserDialog(true)}
          >
            Add User
          </Button>
        </Box>
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Last Login</TableCell>
                <TableCell>Emergency Alerts</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Typography variant="body2">
                      {user.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {user.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {user.studentId || user.employeeId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {user.department}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      color={user.role === 'admin' ? 'error' : user.role === 'security' ? 'warning' : 'primary'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      color={user.status === 'active' ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {format(new Date(user.lastLogin), 'MMM dd, HH:mm')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {user.emergencyAlerts || 0}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        setSelectedUser(user);
                        setUserDialog(true);
                      }}
                    >
                      Edit
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* App Bar */}
      <AppBar 
        position="static" 
        sx={{ 
          backgroundColor: 'var(--primary-dark)',
          background: 'linear-gradient(45deg, var(--primary-dark), var(--primary-main), var(--primary-light))',
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
            Safe Guardian - Admin Dashboard
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
              icon={<AdminPanelSettings />}
              label={`${user.name} (Administrator)`}
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
              { key: 'overview', label: 'System Overview', icon: <Assessment /> },
              { key: 'users', label: 'User Management', icon: <People /> },
              // { key: 'alerts', label: 'Alert Management', icon: <Warning /> },
              { key: 'data', label: 'Data Management', icon: <DataObject /> },
              // { key: 'settings', label: 'System Settings', icon: <Settings /> },
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
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'alerts' && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Alert Management
              </Typography>
              <Alert severity="info">
                Advanced alert management features would be implemented here, including 
                alert filtering, bulk actions, and detailed analytics.
              </Alert>
            </CardContent>
          </Card>
        )}
        {activeTab === 'data' && <DataManagement />}
        {activeTab === 'settings' && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                System Settings
              </Typography>
              <Alert severity="info">
                System configuration options would be available here, including 
                notification settings, security policies, and system maintenance tools.
              </Alert>
            </CardContent>
          </Card>
        )}
      </Container>

      {/* User Management Dialog */}
      <Dialog open={userDialog} onClose={() => setUserDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedUser ? 'Edit User' : 'Add New User'}
        </DialogTitle>
        <DialogContent>
          <Alert severity="info">
            User management functionality would be implemented here with form fields 
            for creating and editing user accounts.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUserDialog(false)}>Cancel</Button>
          <Button variant="contained">
            {selectedUser ? 'Update' : 'Create'} User
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;
