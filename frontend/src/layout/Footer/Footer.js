import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaGithub, FaTwitter, FaLinkedin, FaDiscord,
  FaHeart, FaCode, FaRocket, FaGraduationCap
} from 'react-icons/fa';
import Logo from '../../shared/ui/Logo';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'Coding Practice', path: '/coding' },
      { label: 'MCQ Tests', path: '/mcqs' },
      { label: 'Resume Builder', path: '/resume' },
      { label: 'Learning Roadmap', path: '/roadmap' },
      { label: 'Mock Interviews', path: '/face-to-face' }
    ],
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Careers', path: '/careers' },
      { label: 'Blog', path: '/blog' },
      { label: 'Press', path: '/press' },
      { label: 'Contact', path: '/contact' }
    ],
    resources: [
      { label: 'Help Center', path: '/help' },
      { label: 'Community', path: '/community' },
      { label: 'Study Groups', path: '/study-groups' },
      { label: 'API Documentation', path: '/api-docs' },
      { label: 'Status Page', path: '/status' }
    ],
    legal: [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Cookie Policy', path: '/cookies' },
      { label: 'GDPR', path: '/gdpr' },
      { label: 'Accessibility', path: '/accessibility' }
    ]
  };
  
  const socialLinks = [
    { icon: FaGithub, label: 'GitHub', url: 'https://github.com/genuiq' },
    { icon: FaTwitter, label: 'Twitter', url: 'https://twitter.com/genuiq' },
    { icon: FaLinkedin, label: 'LinkedIn', url: 'https://linkedin.com/company/genuiq' },
    { icon: FaDiscord, label: 'Discord', url: 'https://discord.gg/genuiq' }
  ];

  const stats = [
    { icon: FaCode, value: '2,500+', label: 'Problems' },
    { icon: FaGraduationCap, value: '50K+', label: 'Students' },
    { icon: FaRocket, value: '94%', label: 'Success Rate' }
  ];

  return (
    <footer className="footer">
        <div className="footer-main">
        <div className="container">
          <div className="footer-content">
            {/* Brand Section */}
          <div className="footer-brand">
              <Link to="/" className="footer-logo">
                <Logo />
              </Link>
            <p className="footer-description">
                Empowering developers to ace their technical interviews with 
                comprehensive practice, AI-powered tools, and expert guidance.
              </p>
              
              {/* Stats */}
              <div className="footer-stats">
                {stats.map((stat, index) => (
                  <div key={index} className="footer-stat">
                    <div className="stat-icon">
                      <stat.icon />
                    </div>
                    <div className="stat-content">
                      <span className="stat-value">{stat.value}</span>
                      <span className="stat-label">{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="footer-social">
                <h4>Follow Us</h4>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                      className="social-link"
                  aria-label={social.label}
                >
                      <social.icon />
                </a>
              ))}
                </div>
            </div>
          </div>
          
            {/* Links Sections */}
          <div className="footer-links">
              <div className="footer-section">
                <h4>Product</h4>
                <ul>
                  {footerLinks.product.map((link, index) => (
                    <li key={index}>
                      <Link to={link.path}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer-section">
                <h4>Company</h4>
                <ul>
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <Link to={link.path}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer-section">
                <h4>Resources</h4>
                <ul>
                  {footerLinks.resources.map((link, index) => (
                    <li key={index}>
                      <Link to={link.path}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer-section">
                <h4>Legal</h4>
                <ul>
                  {footerLinks.legal.map((link, index) => (
                    <li key={index}>
                      <Link to={link.path}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="footer-newsletter">
              <h4>Stay Updated</h4>
              <p>Get the latest coding problems, interview tips, and career advice.</p>
              <form className="newsletter-form">
                <div className="newsletter-input-group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="newsletter-input"
                    required
                  />
                  <button type="submit" className="newsletter-btn">
                    Subscribe
                  </button>
                </div>
                <p className="newsletter-note">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>
          </div>
        </div>
        
      {/* Footer Bottom */}
        <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
          <div className="footer-copyright">
              <p>
                © {currentYear} GenuIQ. All rights reserved. Made with{' '}
                <FaHeart className="heart-icon" /> for developers worldwide.
              </p>
            </div>
            
            <div className="footer-bottom-links">
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
              <Link to="/cookies">Cookies</Link>
              <Link to="/sitemap">Sitemap</Link>
          </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;