import { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Alert,
  Stack,
  Divider,
  CircularProgress,
  Backdrop,
  Fade,
  Slide,
  IconButton,
} from '@mui/material';
import { CloudUpload, CheckCircle, Person, Email, Phone, Badge, Logout } from '@mui/icons-material';
import { resumeAPI } from '../services/api';
import { useAuth } from '../hooks/useAuth';

export default function UserDashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const { user, logout } = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file');
      return;
    }

    setUploading(true);
    setMessage('');
    setUploadSuccess(false);
    try {
      await resumeAPI.uploadResume(file);
      setMessage('Resume uploaded successfully! Our HR team will review it shortly.');
      setUploadSuccess(true);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload resume';
      setMessage(errorMessage);
      setUploadSuccess(false);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      {/* Loading Backdrop */}
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: 'blur(5px)',
        }}
        open={uploading}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress color="inherit" size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Uploading your resume...
          </Typography>
        </Box>
      </Backdrop>

      {/* Header */}
      <Box
        component="header"
        sx={{
          py: 2,
          px: 3,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            variant="h6"
            sx={{
              color: 'white',
              fontWeight: 700,
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
            }}
          >
            Resume Evaluator
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography
              variant="body2"
              sx={{
                color: 'white',
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                display: { xs: 'none', sm: 'block' },
              }}
            >
              {user?.fullName}
            </Typography>
            <IconButton
              onClick={logout}
              sx={{
                color: 'white',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
              title="Logout"
            >
              <Logout />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          py: { xs: 2, sm: 3, md: 4 },
          px: { xs: 2, sm: 3 },
          overflowY: 'auto',
        }}
      >
        <Container maxWidth="xl">
          <Fade in={true} timeout={800}>
            <Box sx={{ mb: { xs: 3, sm: 4 } }}>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                  color: 'white',
                  fontWeight: 700,
                  fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                  mb: 1,
                }}
              >
                Welcome, {user?.fullName}! 👋
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                }}
              >
                Manage your profile and upload your resume for evaluation
              </Typography>
            </Box>
          </Fade>

          <Stack
            direction={{ xs: 'column', lg: 'row' }}
            spacing={{ xs: 2, sm: 3 }}
            sx={{ width: '100%' }}
          >
            {/* Upload Resume Section */}
            <Box sx={{ flex: 1 }}>
              <Slide direction="right" in={true} timeout={600}>
                <Paper
                  elevation={10}
                  sx={{
                    p: { xs: 2.5, sm: 3, md: 4 },
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 3,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 20,
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
                    <CloudUpload sx={{ fontSize: { xs: 40, sm: 50 }, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, fontSize: { xs: '1.25rem', sm: '1.5rem' }, mb: 0.5 }}>
                        Upload Your Resume
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                        PDF format, max 5MB
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {message && (
                    <Fade in={true}>
                      <Alert severity={uploadSuccess ? 'success' : 'error'} sx={{ mb: 2, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                        {message}
                      </Alert>
                    </Fade>
                  )}

                  {uploadSuccess && (
                    <Fade in={true}>
                      <Alert severity="info" icon={<CheckCircle />} sx={{ mb: 2, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                        Your resume has been sent to HR for review. You will be contacted if your profile matches our requirements.
                      </Alert>
                    </Fade>
                  )}

                  <Box sx={{ mt: 3 }}>
                    <Button
                      variant="outlined"
                      component="label"
                      fullWidth
                      startIcon={<CloudUpload />}
                      sx={{
                        mb: 2,
                        py: { xs: 1.2, sm: 1.5 },
                        fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          borderColor: 'primary.dark',
                          background: 'rgba(102, 126, 234, 0.04)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      Choose PDF File
                      <input
                        hidden
                        accept=".pdf"
                        type="file"
                        onChange={handleFileChange}
                      />
                    </Button>

                    {file && (
                      <Fade in={true}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                          Selected: {file.name}
                        </Typography>
                      </Fade>
                    )}

                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleUpload}
                      disabled={!file || uploading}
                      sx={{
                        py: { xs: 1.2, sm: 1.5 },
                        fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                          transform: 'translateY(-2px)',
                          boxShadow: 6,
                        },
                        '&:active': {
                          transform: 'translateY(0)',
                        },
                      }}
                    >
                      {uploading ? 'Uploading...' : 'Upload Resume'}
                    </Button>
                  </Box>

                  {user?.employeeStatus && (
                    <Fade in={true} timeout={1000}>
                      <Box sx={{ mt: 3, p: { xs: 1.5, sm: 2 }, bgcolor: 'primary.50', borderRadius: 2, border: '1px solid', borderColor: 'primary.200' }}>
                        <Typography variant="subtitle2" color="primary.main" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, fontWeight: 600 }}>
                          Application Status
                        </Typography>
                        <Typography variant="h6" sx={{ mt: 0.5, fontSize: { xs: '1rem', sm: '1.25rem' }, textTransform: 'capitalize' }}>
                          {user.employeeStatus}
                        </Typography>
                      </Box>
                    </Fade>
                  )}
                </Paper>
              </Slide>
            </Box>

            {/* Profile Information Section */}
            <Box sx={{ flex: 1 }}>
              <Slide direction="left" in={true} timeout={600}>
                <Paper
                  elevation={10}
                  sx={{
                    p: { xs: 2.5, sm: 3, md: 4 },
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 3,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 20,
                    },
                  }}
                >
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      mb: 3,
                      fontSize: { xs: '1.25rem', sm: '1.5rem' },
                    }}
                  >
                    Profile Information
                  </Typography>

                  <Divider sx={{ mb: 3 }} />

                  <Stack spacing={{ xs: 2.5, sm: 3 }}>
                    <Fade in={true} timeout={900}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          p: 2,
                          borderRadius: 2,
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            bgcolor: 'rgba(102, 126, 234, 0.04)',
                          },
                        }}
                      >
                        <Person sx={{ color: 'primary.main', fontSize: 28 }} />
                        <Box>
                          <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                            Full Name
                          </Typography>
                          <Typography variant="body1" sx={{ mt: 0.5, fontSize: { xs: '0.9rem', sm: '1rem' }, fontWeight: 500 }}>
                            {user?.fullName}
                          </Typography>
                        </Box>
                      </Box>
                    </Fade>

                    <Fade in={true} timeout={1000}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          p: 2,
                          borderRadius: 2,
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            bgcolor: 'rgba(102, 126, 234, 0.04)',
                          },
                        }}
                      >
                        <Email sx={{ color: 'primary.main', fontSize: 28 }} />
                        <Box>
                          <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                            Email Address
                          </Typography>
                          <Typography variant="body1" sx={{ mt: 0.5, fontSize: { xs: '0.9rem', sm: '1rem' }, fontWeight: 500 }}>
                            {user?.email}
                          </Typography>
                        </Box>
                      </Box>
                    </Fade>

                    <Fade in={true} timeout={1100}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          p: 2,
                          borderRadius: 2,
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            bgcolor: 'rgba(102, 126, 234, 0.04)',
                          },
                        }}
                      >
                        <Phone sx={{ color: 'primary.main', fontSize: 28 }} />
                        <Box>
                          <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                            Phone Number
                          </Typography>
                          <Typography variant="body1" sx={{ mt: 0.5, fontSize: { xs: '0.9rem', sm: '1rem' }, fontWeight: 500 }}>
                            {user?.phone}
                          </Typography>
                        </Box>
                      </Box>
                    </Fade>

                    {user?.referredBy && (
                      <Fade in={true} timeout={1200}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            p: 2,
                            borderRadius: 2,
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                              bgcolor: 'rgba(102, 126, 234, 0.04)',
                            },
                          }}
                        >
                          <Badge sx={{ color: 'primary.main', fontSize: 28 }} />
                          <Box>
                            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                              Referred By
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 0.5, fontSize: { xs: '0.9rem', sm: '1rem' }, fontWeight: 500 }}>
                              {user.referredBy}
                            </Typography>
                          </Box>
                        </Box>
                      </Fade>
                    )}

                    <Fade in={true} timeout={1300}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          p: 2,
                          borderRadius: 2,
                          bgcolor: 'primary.50',
                          border: '1px solid',
                          borderColor: 'primary.200',
                        }}
                      >
                        <Badge sx={{ color: 'primary.main', fontSize: 28 }} />
                        <Box>
                          <Typography variant="caption" color="primary.main" sx={{ textTransform: 'uppercase', fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                            Account Type
                          </Typography>
                          <Typography variant="body1" sx={{ mt: 0.5, fontSize: { xs: '0.9rem', sm: '1rem' }, fontWeight: 600, textTransform: 'capitalize', color: 'primary.main' }}>
                            {user?.role}
                          </Typography>
                        </Box>
                      </Box>
                    </Fade>
                  </Stack>
                </Paper>
              </Slide>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 3,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          color: 'white',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
              © 2025 Resume Evaluator. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography
                component="span"
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  transition: 'all 0.3s ease-in-out',
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                    opacity: 0.8,
                  },
                }}
              >
                Privacy Policy
              </Typography>
              <Typography
                component="span"
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  transition: 'all 0.3s ease-in-out',
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                    opacity: 0.8,
                  },
                }}
              >
                Terms of Service
              </Typography>
              <Typography
                component="span"
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  transition: 'all 0.3s ease-in-out',
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                    opacity: 0.8,
                  },
                }}
              >
                Contact Us
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
