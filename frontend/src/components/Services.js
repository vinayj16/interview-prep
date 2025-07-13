import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { FaCode, FaUserTie, FaFileAlt, FaLaptopCode, FaUsers, FaChartLine, FaLeaf, FaLinkedin, FaTwitter, FaBook, FaTrophy, FaUniversity, FaGlobe, FaCheckCircle } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
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
  },
  {
    icon: <FaLeaf className="service-icon-svg" style={{ color: '#43a047' }} />,
    title: 'GeeksforGeeks (GFG)',
    description: 'Practice coding, data structures, and algorithms with GFG resources and contests.',
    features: ['DSA Sheets', 'Practice Problems', 'Contests', 'Articles'],
    link: 'https://www.geeksforgeeks.org/'
  },
  {
    icon: <FaCode className="service-icon-svg" style={{ color: '#ffa116' }} />,
    title: 'LeetCode',
    description: 'Sharpen your coding skills with LeetCode problems and global contests.',
    features: ['Problems', 'Contests', 'Discuss', 'Interview Prep'],
    link: 'https://leetcode.com/'
  },
  {
    icon: <FaTrophy className="service-icon-svg" style={{ color: '#2ec866' }} />,
    title: 'HackerRank',
    description: 'Solve coding challenges and prepare for interviews with HackerRank.',
    features: ['Practice', 'Contests', 'Interview Prep', 'Certificates'],
    link: 'https://www.hackerrank.com/'
  },
  {
    icon: <FaGlobe className="service-icon-svg" style={{ color: '#1f8acb' }} />,
    title: 'Codeforces',
    description: 'Compete in timed contests and improve your problem-solving skills on Codeforces.',
    features: ['Contests', 'Problemset', 'Community', 'Blogs'],
    link: 'https://codeforces.com/'
  },
  {
    icon: <FaCheckCircle className="service-icon-svg" style={{ color: '#5b5b5b' }} />,
    title: 'CodeChef',
    description: 'Participate in CodeChef contests and practice coding problems.',
    features: ['Practice', 'Contests', 'Discuss', 'Campus Chapters'],
    link: 'https://www.codechef.com/'
  },
  {
    icon: <FaLinkedin className="service-icon-svg" style={{ color: '#0077b5' }} />,
    title: 'LinkedIn',
    description: 'Build your professional network, showcase your skills, and find job opportunities.',
    features: ['Networking', 'Job Search', 'Skill Endorsements', 'Learning'],
    link: 'https://www.linkedin.com/'
  },
  {
    icon: <FaTwitter className="service-icon-svg" style={{ color: '#1da1f2' }} />,
    title: 'Twitter',
    description: 'Stay updated with tech trends, connect with the coding community, and share your journey.',
    features: ['Tech News', 'Communities', 'Networking', 'Career Tips'],
    link: 'https://twitter.com/'
  },
  {
    icon: <FaUniversity className="service-icon-svg" style={{ color: '#fbbf24' }} />,
    title: 'Placement Preparation',
    description: 'Comprehensive resources and guidance for campus placements and job interviews.',
    features: ['Aptitude', 'GD/PI', 'Resume Tips', 'Mock Interviews'],
    link: '/placement-preparation'
  },
  {
    icon: <FaBook className="service-icon-svg" style={{ color: '#3b82f6' }} />,
    title: 'Testbook',
    description: 'Prepare for competitive exams and government jobs with Testbook resources.',
    features: ['Mock Tests', 'Practice Questions', 'Exam Analysis', 'Study Material'],
    link: 'https://testbook.com/'
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
  <div className="service-card" tabIndex={0} aria-label={`Service: ${service.title}`}>
    <div className="service-icon">{service.icon}</div>
    <h3>{service.title}</h3>
    <p>{service.description}</p>
    <FeatureList features={service.features} />
    {service.title === 'Technical Interview Prep' && (
      <a href="/coding" tabIndex={0} aria-label="Start Technical Interview Prep">
        <button className="service-button">Start</button>
      </a>
    )}
    {service.title === 'Coding Practice' && (
      <a href="/coding" tabIndex={0} aria-label="Explore Coding Practice">
        <button className="service-button">Explore</button>
      </a>
    )}
    {service.title === 'Mock Interviews' && (
      <a href="/face-to-face" tabIndex={0} aria-label="Start Mock Interview">
        <button className="service-button">Start</button>
      </a>
    )}
    {service.title === 'Resume Building' && (
      <a href="/resume" tabIndex={0} aria-label="Build Resume">
        <button className="service-button">Build Resume</button>
      </a>
    )}
    {service.title === 'Career Guidance' && (
      <a href="/roadmap" tabIndex={0} aria-label="Explore Career Guidance">
        <button className="service-button">Explore</button>
      </a>
    )}
    {service.title === 'Behavioral Interviews' && (
      <a href="/face-to-face" tabIndex={0} aria-label="Practice Behavioral Interviews">
        <button className="service-button">Practice</button>
      </a>
    )}
    {service.title === 'Placement Preparation' && (
      <a href="/roadmap" tabIndex={0} aria-label="Start Placement Preparation">
        <button className="service-button">Start</button>
      </a>
    )}
    {service.link && (
      <a href={service.link} target="_blank" rel="noopener noreferrer" tabIndex={0} aria-label={`Learn more about ${service.title}`} style={{marginTop: '0.5rem', display: 'block'}}>
        <button className="service-button">Learn More</button>
      </a>
    )}
  </div>
));

const Services = memo(() => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div className="container services-page">
        <section className="hero-section">
          <h1>Master Your Next Interview</h1>
          <p className="hero-subtitle">
            Practice, learn, and grow—all in one place.
          </p>
        </section>
        
        <section className="services-section">
          <h2 className="section-title">Our Services</h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </section>
        
        <section className="cta-section">
          <h2>Ready to ace your next interview?</h2>
          <p>Join thousands of successful candidates who landed their dream jobs with our help</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary">Get Started</Link>
            <Link to="/contact" className="btn btn-outline">Contact Us</Link>
          </div>
        </section>
    </div>
  );
});

export default Services;
