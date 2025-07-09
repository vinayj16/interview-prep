import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  Snackbar,
  Alert,
  useMediaQuery
} from '@mui/material';
import { Email, Phone, LocationOn, SupportAgent } from '@mui/icons-material';

const Contact = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required.';
    if (!formData.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) errors.email = 'Valid email is required.';
    if (!formData.subject) errors.subject = 'Subject is required.';
    if (!formData.message) errors.message = 'Message is required.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(res => setTimeout(res, 1200));
      setSnackbar({ open: true, message: 'Message sent successfully!', severity: 'success' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to send message. Please try again.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => setSnackbar(s => ({ ...s, open: false }));

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 }, background: 'linear-gradient(135deg, #f0f4ff 60%, #e0f7fa 100%)', borderRadius: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight={700} sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Contact Us
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Get in touch with our team for support and inquiries
        </Typography>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ 
            p: 4, 
            mb: 2,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <Box
              sx={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                zIndex: 0
              }}
            />
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <SupportAgent sx={{ fontSize: 60, color: '#fbbf24', mb: 2 }} />
              <Typography variant="h5" fontWeight={600} gutterBottom sx={{ color: 'white' }}>Get in Touch</Typography>
              <Typography variant="body1" paragraph sx={{ color: 'rgba(255,255,255,0.9)' }}>
                Have questions or feedback? We'd love to hear from you! Fill out the form or use the contact information below.
              </Typography>
              <Box mt={4}>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Email sx={{ color: 'rgba(255,255,255,0.8)' }} aria-label="Email" />
                  <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>support@interviewprep.com</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Phone sx={{ color: 'rgba(255,255,255,0.8)' }} aria-label="Phone" />
                  <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>+1 (555) 123-4567</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                  <LocationOn sx={{ color: 'rgba(255,255,255,0.8)' }} aria-label="Location" />
                  <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>123 Tech Street, Silicon Valley, CA 94025</Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ 
            p: 4,
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            border: '1px solid #e2e8f0'
          }}>
            <form onSubmit={handleSubmit} aria-label="Contact form" autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!formErrors.name}
                    helperText={formErrors.name}
                    required
                    variant="outlined"
                    inputProps={{ 'aria-label': 'Name' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                    required
                    variant="outlined"
                    inputProps={{ 'aria-label': 'Email' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    error={!!formErrors.subject}
                    helperText={formErrors.subject}
                    required
                    variant="outlined"
                    inputProps={{ 'aria-label': 'Subject' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    error={!!formErrors.message}
                    helperText={formErrors.message}
                    required
                    multiline
                    rows={4}
                    variant="outlined"
                    inputProps={{ 'aria-label': 'Message' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={loading}
                    aria-label="Send Message"
                    sx={{
                      background: 'linear-gradient(135deg, #2563eb 30%, #10b981 100%)',
                      color: 'white',
                      fontWeight: 700,
                      boxShadow: '0 2px 8px rgba(37, 99, 235, 0.08)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #10b981 30%, #2563eb 100%)',
                        boxShadow: '0 8px 24px rgba(16, 185, 129, 0.18)',
                        transform: 'scale(1.03)'
                      },
                      '&:focus': {
                        outline: '3px solid #fbbf24',
                        outlineOffset: '2px'
                      }
                    }}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact;