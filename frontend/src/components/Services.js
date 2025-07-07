import React, { memo } from 'react';
import { FaCode, FaUserTie, FaFileAlt, FaLaptopCode, FaUsers, FaChartLine } from 'react-icons/fa';
import { useTheme } from '@mui/material/styles';
import './Services.css';

const services = [
  {
    icon: <FaCode className="service-icon-svg" />,
    title: 'Technical Interview Prep',
    description: 'Master coding challenges and system design questions with our comprehensive preparation program.',
    features: ['Data Structures', 'Algorithms', 'System Design', 'Code Reviews']
  },
  {
    icon: <FaUserTie className="service-icon-svg" />,
    title: 'Behavioral Interviews',
    description: 'Learn to effectively communicate your experiences and showcase your soft skills.',
    features: ['STAR Method', 'Mock Interviews', 'Feedback Sessions', 'Common Questions']
  },
  {
    icon: <FaFileAlt className="service-icon-svg" />,
    title: 'Resume Building',
    description: 'Create an impressive resume that highlights your skills and experiences.',
    features: ['ATS Optimization', 'Format Review', 'Content Writing', 'Keywords Analysis']
  },
  {
    icon: <FaLaptopCode className="service-icon-svg" />,
    title: 'Coding Practice',
    description: 'Access our extensive collection of coding problems and real interview questions.',
    features: ['LeetCode Style', 'Company Specific', 'Difficulty Levels', 'Solutions']
  },
  {
    icon: <FaUsers className="service-icon-svg" />,
    title: 'Mock Interviews',
    description: 'Practice with experienced interviewers from top tech companies.',
    features: ['Real-time Feedback', 'Company Specific', 'Multiple Rounds', 'Performance Analysis']
  },
  {
    icon: <FaChartLine className="service-icon-svg" />,
    title: 'Career Guidance',
    description: 'Get personalized advice on your career path and growth opportunities.',
    features: ['Industry Insights', 'Career Planning', 'Networking Tips', 'Salary Negotiation']
  }
];

const FeatureList = memo(({ features }) => (
  <ul className="service-features">
    {features.map((feature, idx) => (
      <li key={idx}>{feature}</li>
    ))}
  </ul>
));

const ServiceCard = memo(({ service }) => (
  <div className="service-card">
    <div className="service-icon">{service.icon}</div>
    <h3>{service.title}</h3>
    <p>{service.description}</p>
    <FeatureList features={service.features} />
    <button className="service-button">Learn More</button>
  </div>
));

const Services = memo(() => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  return (
    <div className={`services-container ${isDark ? 'dark' : 'light'}`} role="main" aria-label="Services main content">
      <div className="services section">
        <div className="container">
          <h1 className="section-title">Our Services</h1>
          <p className="section-description">
            Comprehensive interview preparation services to help you land your dream job.
            At GenuIQ, we offer a wide range of services to help you prepare for your interviews.
            Our platform is designed to help you build confidence and excel in your career journey.
          </p>
          <div className="services-grid">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Services;
