import React, { useState } from 'react';
import { FaHeadset, FaEnvelope, FaPhone, FaComments, FaTicketAlt, FaSearch, FaTimes, FaCheck, FaClock, FaUser, FaQuestionCircle, FaBook, FaVideo, FaDownload, FaCode } from 'react-icons/fa';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../shared/Toast/Toast';
import './Support.css';

const Support = () => {
  const [activeTab, setActiveTab] = useState('contact');
  const [searchTerm, setSearchTerm] = useState('');
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    description: '',
    priority: 'medium',
    category: 'general',
    email: '',
    name: ''
  });

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const supportCategories = [
    {
      icon: FaHeadset,
      title: 'Live Chat',
      description: 'Get instant help from our support team, status: Available',
      responseTime: '2-5 tes',
      action: 'Start Chat'
    },
    {
      icon: FaEnvelope,
      title: 'Email Support',
      description: 'Send us a detailed message, status: 24/7',
      responseTime: '2-4 hours',
      action: 'Send Email'
    },
    {
      icon: FaPhone,
      title: 'Phone Support',
      description: 'Speak directly with our team, status: Mon-Fri 9AM-6PM',
      responseTime: 'Immediate',
      action: 'Call Now'
    },
    {
      icon: FaTicketAlt,
      title: 'Support Ticket',
      description: 'Create a detailed support ticket, status: 24/7',
      responseTime: '4-8 hours',
      action: 'Create Ticket'
    }
  ];

  const faqCategories = [
    {
      title: 'Getting Started',
      icon: FaBook,
      questions: [
        {
          question: 'How do I create an account?',
          answer: 'Click the "Sign Up" button in the top right corner and fill in your details. You can also sign up using Google or GitHub.'
        },
        {
          question: 'What features are available for free users?',
          answer: 'Free users can access coding problems, MCQ tests, basic resume builder, and learning roadmaps. Premium features require a subscription.'
        },
        {
          question: 'How do I upgrade to premium?',
          answer: 'Go to your profile settings and click on "Upgrade to Premium" to choose a plan that suits your needs.'
        }
      ]
    },
    {
      title: 'Coding Problems',
      icon: FaCode,
      questions: [
        {
          question: 'How many coding problems are available?',
          answer: 'We have over 1000g problems ranging from easy to hard difficulty levels, covering various programming languages.'
        },
        {
          question: 'Can I practice in different programming languages?',
          answer: 'Yes! We support multiple programming languages including Python, Java, JavaScript, C++, and more.'
        },
        {
          question: 'How do I track my progress?',
          answer: 'Your progress is automatically tracked in your dashboard. You can see solved problems, accuracy, and improvement over time.'
        }
      ]
    },
    {
      title: 'Account & Billing',
      icon: FaUser,
      questions: [
        {
          question: 'How do I reset my password?',
          answer: 'Click "Forgot Password" on the login page and follow the instructions sent to your email.'
        },
        {
          question: 'Can I cancel my subscription anytime?',
          answer: 'Yes, you can cancel your subscription at any time from your account settings. You\'ll continue to have access until the end of your billing period.'
        },
        {
          question: 'How do I update my payment method?',
          answer: 'Go to your account settings and click on "Payment Methods" to update or add new payment options.'
        }
      ]
    }
  ];

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    console.log('Support ticket submitted:', ticketForm);
    // Here you would typically send the ticket to your backend
    alert('Support ticket submitted successfully! We\'ll get back to you soon.');
    setTicketForm({
      subject: '',
      description: '',
      priority: 'medium',
      category: 'general',
      email: '',
      name: ''
    });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    // Here you would typically send the contact form to your backend
    alert('Message sent successfully! We\'ll respond within 24 hours.');
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="support-page">
      {/* Hero Section */}
      <div className="support-hero">
        <h1>Support Center</h1>
        <p>We're here to help you succeed in your interview preparation journey</p>
      </div>

      {/* Support Categories */}
      <div className="support-categories">
        <h2>How can we help you?</h2>
        <div className="categories-grid">
          {supportCategories.map((category, index) => (
            <div key={index} className="support-category-card">
              <div className="category-icon">
                <category.icon />
              </div>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <div className="category-meta">
                <span className="status">{category.status}</span>
                <span className="response-time">Response: {category.responseTime}</span>
              </div>
              <button className="btn btn-primary">
                {category.action}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="support-content">
        <div className="support-tabs">
          <button 
            className={`tab ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            <FaEnvelope /> Contact Us
          </button>
          <button 
            className={`tab ${activeTab === 'ticket' ? 'active' : ''}`}
            onClick={() => setActiveTab('ticket')}
          >
            <FaTicketAlt /> Support Ticket
          </button>
          <button 
            className={`tab ${activeTab === 'faq' ? 'active' : ''}`}
            onClick={() => setActiveTab('faq')}
          >
            <FaQuestionCircle /> FAQ
          </button>
          <button 
            className={`tab ${activeTab === 'resources' ? 'active' : ''}`}
            onClick={() => setActiveTab('resources')}
          >
            <FaBook /> Resources
          </button>
        </div>

        <div className="tab-content">
          {/* Contact Form Tab */}
          {activeTab === 'contact' && (
            <div className="contact-form-section">
              <h3>Get in Touch</h3>
              <p>Have a question or need help? Send us a message and we'll respond within 24 hours.</p>
              
              <form onSubmit={handleContactSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-name">Full Name *</label>
                    <input
                      type="text"
                      id="contact-name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email">Email Address *</label>
                    <input
                      type="email"
                      id="contact-email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="contact-subject">Subject *</label>
                  <input
                    type="text"
                    id="contact-subject"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="contact-message">Message *</label>
                  <textarea
                    id="contact-message"
                    rows="6"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    required
                  />
                </div>
                
                <button type="submit" className="btn btn-primary">
                  <FaEnvelope /> Send Message
                </button>
              </form>
            </div>
          )}

          {/* Support Ticket Tab */}
          {activeTab === 'ticket' && (
            <div className="ticket-form-section">
              <h3>Create Support Ticket</h3>
              <p>Create a detailed support ticket for complex issues that require investigation.</p>
              
              <form onSubmit={handleTicketSubmit} className="ticket-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="ticket-name">Full Name *</label>
                    <input
                      type="text"
                      id="ticket-name"
                      value={ticketForm.name}
                      onChange={(e) => setTicketForm({...ticketForm, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ticket-email">Email Address *</label>
                    <input
                      type="email"
                      id="ticket-email"
                      value={ticketForm.email}
                      onChange={(e) => setTicketForm({...ticketForm, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="ticket-category">Category *</label>
                    <select
                      id="ticket-category"
                      value={ticketForm.category}
                      onChange={(e) => setTicketForm({...ticketForm, category: e.target.value})}
                      required
                    >
                      <option value="general">General Inquiry</option>
                      <option value="technical">Technical Issue</option>
                      <option value="billing">Billing & Payment</option>
                      <option value="feature">Feature Request</option>
                      <option value="bug">Bug Report</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="ticket-priority">Priority *</label>
                    <select
                      id="ticket-priority"
                      value={ticketForm.priority}
                      onChange={(e) => setTicketForm({...ticketForm, priority: e.target.value})}
                      required
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="ticket-subject">Subject *</label>
                  <input
                    type="text"
                    id="ticket-subject"
                    value={ticketForm.subject}
                    onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="ticket-description">Description *</label>
                  <textarea
                    id="ticket-description"
                    rows="8"
                    value={ticketForm.description}
                    onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                    placeholder="Please provide detailed information about your issue..."
                    required
                  />
                </div>
                
                <button type="submit" className="btn btn-primary">
                  <FaTicketAlt /> Create Ticket
                </button>
              </form>
            </div>
          )}

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div className="faq-section">
              <div className="faq-header">
                <h3>Frequently Asked Questions</h3>
                <div className="faq-search">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search FAQs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button 
                      className="clear-search"
                      onClick={() => setSearchTerm('')}
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
              </div>

              {searchTerm && (
                <div className="search-results">
                  <p>Search results for: "{searchTerm}"</p>
                </div>
              )}

              <div className="faq-categories">
                {filteredFAQs.map((category, index) => (
                  <div key={index} className="faq-category">
                    <h4>
                      <category.icon />
                      {category.title}
                    </h4>
                    <div className="faq-list">
                      {category.questions.map((faq, faqIndex) => (
                        <details key={faqIndex} className="faq-item">
                          <summary>{faq.question}</summary>
                          <div className="faq-answer">
                            <p>{faq.answer}</p>
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {filteredFAQs.length === 0 && searchTerm && (
                <div className="no-results">
                  <p>No FAQ items found for "{searchTerm}". Try a different search term.</p>
                </div>
              )}
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div className="resources-section">
              <h3>Helpful Resources</h3>
              <p>Explore our collection of guides, tutorials, and helpful resources.</p>
              
              <div className="resources-grid">
                <div className="resource-card">
                  <div className="resource-icon">
                    <FaVideo />
                  </div>
                  <h4>Video Tutorials</h4>
                  <p>Learn how to use our platform effectively with step-by-step video guides.</p>
                  <button className="btn btn-outline">Watch Videos</button>
                </div>
                
                <div className="resource-card">
                  <div className="resource-icon">
                    <FaBook />
                  </div>
                  <h4>Comprehensive Guide</h4>
                  <p>Comprehensive guide covering all features and best practices.</p>
                  <button className="btn btn-outline">Read Guide</button>
                </div>
                
                <div className="resource-card">
                  <div className="resource-icon">
                    <FaDownload />
                  </div>
                  <h4>Download Center</h4>
                  <p>Download practice materials, templates, and study resources.</p>
                  <button className="btn btn-outline">Browse Downloads</button>
                </div>
                
                <div className="resource-card">
                  <div className="resource-icon">
                    <FaComments />
                  </div>
                  <h4>Community Forum</h4>
                  <p>Connect with other users, share tips, and get help from the community.</p>
                  <button className="btn btn-outline">Join Forum</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Support; 