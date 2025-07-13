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
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

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
    <div className="container contact-page">
      <h1 className="contact-title">Contact Us</h1>
      <div className="section-description">
        Have questions, feedback, or need support? Reach out to us and our team will get back to you as soon as possible.
      </div>
      <div className="contact-content">
        <div className="contact-info">
          <h5>Contact Information</h5>
          <div className="contact-details">
            <div className="contact-item">
              <FaEnvelope />
              <p>contact@interviewprep.com</p>
            </div>
            <div className="contact-item">
              <FaPhone />
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="contact-item">
              <FaMapMarkerAlt />
              <p>123 Main St, City, Country</p>
            </div>
          </div>
        </div>
        <div className="contact-form-container">
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" required />
            </div>
            <button type="submit" className="submit-button">
              Send Message
            </button>
            </form>
        </div>
      </div>
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>How do I reset my password?</h3>
            <p>Click on the "Forgot password?" link on the login page and follow the instructions.</p>
          </div>
          <div className="faq-item">
            <h3>How can I contact support?</h3>
            <p>You can use the contact form above or email us directly at contact@interviewprep.com.</p>
          </div>
          <div className="faq-item">
            <h3>Where can I find more resources?</h3>
            <p>Check out our Resources section for guides, tutorials, and more.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;