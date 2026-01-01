import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
} from '@mui/material';
import { resumeAPI } from '../services/api';

interface User {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  employeeStatus: string;
  referredBy?: string;
  referralPaid?: boolean;
}

export default function PayrollDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await resumeAPI.getAllUsers();
      // Filter users who were referred and have completed probation
      const referredUsers = response.data.filter(
        (user: User) => user.referredBy && user.employeeStatus === 'permanent'
      );
      setUsers(referredUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 2, sm: 3, md: 4 }, mb: { xs: 2, sm: 3, md: 4 }, px: { xs: 1, sm: 2, md: 3 } }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom
        sx={{ 
          mb: { xs: 1, sm: 2 },
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
        }}
      >
        Payroll Dashboard - Referral Payments
      </Typography>

      <Typography 
        variant="body1" 
        color="text.secondary" 
        gutterBottom
        sx={{ 
          mb: { xs: 2, sm: 3 },
          fontSize: { xs: '0.875rem', sm: '1rem' },
        }}
      >
        Employees who completed probation and are eligible for referral payments
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 3, overflowX: 'auto' }}>
        <Table sx={{ minWidth: { xs: 500, sm: 650 } }}>
          <TableHead>
            <TableRow>
              <TableCell>Employee Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Referred By</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Payment Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No referral payments pending
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.referredBy}</TableCell>
                  <TableCell>
                    <Chip label={user.employeeStatus} color="success" size="small" />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.referralPaid ? 'Paid' : 'Pending'}
                      color={user.referralPaid ? 'default' : 'warning'}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
