import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaEnvelope, 
  FaHeart, 
  FaSun, 
  FaMoon,
  FaCode,
  FaLaptopCode,
  FaGraduationCap,
  FaUserTie,
  FaMapSigns,
  FaComments,
  FaBook,
  FaBookOpen,
  FaUsers,
  FaQuestionCircle,
  FaBug,
  FaLightbulb,
  FaServer
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import './Footer.css';

const Footer = () => {
  const { theme, toggleTheme } = useTheme();
  const currentYear = new Date().getFullYear();
  
  // Social media links
  const socialLinks = [
    { 
      icon: <FaGithub />, 
      url: 'https://github.com/yourusername',
      label: 'GitHub'
    },
    { 
      icon: <FaLinkedin />, 
      url: 'https://linkedin.com/in/yourusername',
      label: 'LinkedIn'
    },
    { 
      icon: <FaTwitter />, 
      url: 'https://twitter.com/yourusername',
      label: 'Twitter'
    },
    { 
      icon: <FaEnvelope />, 
      url: 'mailto:contact@interviewprep.com',
      label: 'Email us'
    }
  ];
  
  // Feature links
  const featureLinks = [
    { 
      icon: <FaCode />, 
      text: 'Coding Practice',
      to: '/coding'
    },
    { 
      icon: <FaGraduationCap />, 
      text: 'MCQ Tests',
      to: '/mcqs'
    },
    { 
      icon: <FaUserTie />, 
      text: 'Resume Builder',
      to: '/resume'
    },
    { 
      icon: <FaMapSigns />, 
      text: 'Learning Roadmaps',
      to: '/roadmap'
    },
    { 
      icon: <FaComments />, 
      text: 'Interview Reviews',
      to: '/reviews'
    }
  ];
  
  // Resource links
  const resourceLinks = [
    { 
      icon: <FaBook />, 
      text: 'Documentation',
      to: '/docs'
    },
    { 
      icon: <FaBookOpen />, 
      text: 'API Reference',
      to: '/api-docs'
    },
    { 
      icon: <FaGraduationCap />, 
      text: 'Tutorials',
      to: '/tutorials'
    },
    { 
      icon: <FaBook />, 
      text: 'Blog',
      to: '/blog'
    },
    { 
      icon: <FaUsers />, 
      text: 'Community',
      to: '/community'
    }
  ];
  
  // Support links
  const supportLinks = [
    { 
      icon: <FaQuestionCircle />, 
      text: 'Help Center',
      to: '/help'
    },
    { 
      icon: <FaEnvelope />, 
      text: 'Contact Us',
      to: '/contact'
    },
    { 
      icon: <FaBug />, 
      text: 'Bug Reports',
      to: '/bugs'
    },
    { 
      icon: <FaLightbulb />, 
      text: 'Feature Requests',
      to: '/feature-requests'
    },
    { 
      icon: <FaServer />, 
      text: 'Status Page',
      to: '/status'
    }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <FaLaptopCode className="logo-icon" aria-hidden="true" />
              <h2>InterviewPrep</h2>
            </div>
            <p>
              Your comprehensive platform for technical interview preparation. 
              Practice coding problems, take MCQs, build resumes, and ace your next interview.
            </p>
            
            <div className="social-links">
              {socialLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.url} 
                  className="social-link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  {link.icon}
                  <span className="sr-only">{link.label}</span>
                </a>
              ))}
            </div>
            
            <button 
              type="button"
              className="theme-toggle" 
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <FaMoon /> : <FaSun />}
              <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
          </div>

          <div className="footer-section">
            <h3>Features</h3>
            <ul className="footer-links">
              {featureLinks.map((link, index) => (
                link.to ? (
                <li key={index}>
                  <Link to={link.to}>
                    {React.cloneElement(link.icon, { className: 'link-icon' })}
                    {link.text}
                  </Link>
                </li>
                ) : (
                  console.warn('Footer feature link missing to:', link), null
                )
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3>Resources</h3>
            <ul className="footer-links">
              {resourceLinks.map((link, index) => (
                link.to ? (
                <li key={index}>
                  <Link to={link.to}>
                    {React.cloneElement(link.icon, { className: 'link-icon' })}
                    {link.text}
                  </Link>
                </li>
                ) : (
                  console.warn('Footer resource link missing to:', link), null
                )
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3>Support</h3>
            <ul className="footer-links">
              {supportLinks.map((link, index) => (
                link.to ? (
                <li key={index}>
                  <Link to={link.to}>
                    {React.cloneElement(link.icon, { className: 'link-icon' })}
                    {link.text}
                  </Link>
                </li>
                ) : (
                  console.warn('Footer support link missing to:', link), null
                )
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {currentYear} InterviewPrep. Made with <FaHeart className="heart" aria-label="love" /> for developers.
          </p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;