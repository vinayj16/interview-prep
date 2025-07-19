import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane, FaCheck } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', formData);
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
          });
          setIsSubmitted(false);
        }, 3000);
      }, 1500);
    }
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="contact-icon" />,
      title: 'Location',
      text: '123 Tech Street, Silicon Valley, CA 94025',
      link: 'https://maps.google.com',
      linkText: 'View on Map'
    },
    {
      icon: <FaPhone className="contact-icon" />,
      title: 'Phone',
      text: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
      linkText: 'Call Now'
    },
    {
      icon: <FaEnvelope className="contact-icon" />,
      title: 'Email',
      text: 'support@interviewprep.com',
      link: 'mailto:support@interviewprep.com',
      linkText: 'Send Email'
    }
  ];

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Get In Touch</h1>
        <p>Have questions or feedback? We'd love to hear from you!</p>
      </div>
      
      <div className="contact-content">
        <div className="contact-info">
          <h2>Contact Information</h2>
          <p>Fill out the form or reach us through any of these channels:</p>
          
          <div className="info-cards">
            {contactInfo.map((item, index) => (
              <div key={index} className="info-card">
                <div className="info-icon">
                  {item.icon}
                </div>
                <div className="info-text">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <a href={item.link} className="info-link">{item.linkText}</a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="social-media">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#facebook" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#twitter" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#linkedin" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="#github" aria-label="GitHub"><i className="fab fa-github"></i></a>
            </div>
          </div>
        </div>
        
        <div className="contact-form-container">
          <h2>Send Us a Message</h2>
          
          {isSubmitted ? (
            <div className="success-message">
              <FaCheck className="success-icon" />
              <h3>Thank You!</h3>
              <p>Your message has been sent successfully. We'll get back to you soon!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Your Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="John Doe"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Your Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="john@example.com"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={errors.subject ? 'error' : ''}
                  placeholder="How can we help?"
                />
                {errors.subject && <span className="error-message">{errors.subject}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? 'error' : ''}
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>
              
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    <FaPaperPlane className="btn-icon" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact; 