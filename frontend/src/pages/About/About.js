import React from 'react';
import { FaUsers, FaCode, FaGraduationCap, FaTrophy, FaHeart, FaLightbulb } from 'react-icons/fa';
import './About.css';

const About = () => {
  const teamMembers = [
    {
      name: 'John Doe',
      role: 'Founder & CEO',
      bio: 'Former senior engineer at Google with 10+ years of experience in software development and team leadership.',
      photo: null
    },
    {
      name: 'Jane Smith',
      role: 'CTO',
      bio: 'Expert in AI/ML with a PhD in Computer Science. Previously led engineering teams at Microsoft.',
      photo: null
    },
    {
      name: 'Mike Johnson',
      role: 'Head of Product',
      bio: 'Product strategist with experience in edtech and developer tools. Passionate about user experience.',
      photo: null
    }
  ];

  const values = [
    {
      icon: FaCode,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from our platform to our support.'
    },
    {
      icon: FaUsers,
      title: 'Community',
      description: 'Building a supportive community of learners and professionals.'
    },
    {
      icon: FaGraduationCap,
      title: 'Learning',
      description: 'Continuous learning and improvement are at the core of our mission.'
    },
    {
      icon: FaHeart,
      title: 'Passion',
      description: 'We are passionate about helping developers achieve their career goals.'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Users' },
    { number: '1000+', label: 'Coding Problems' },
    { number: '500+', label: 'MCQ Questions' },
    { number: '95%', label: 'Success Rate' }
  ];

  return (
    <div className="about">
      {/* Hero Section */}
      <div className="about-hero">
        <h1>About InterviewPrep</h1>
        <p className="subtitle">Empowering developers to ace their technical interviews</p>
      </div>

      {/* Mission Section */}
      <div className="mission">
        <div className="mission-content">
          <div className="mission-text">
            <h2>Our Mission</h2>
            <p>
              We believe that every developer deserves the opportunity to showcase their skills and land their dream job. 
              Our platform provides comprehensive interview preparation tools, from coding problems to mock interviews, 
              designed to help you succeed in today's competitive tech landscape.
            </p>
            <p>
              Founded by experienced software engineers who understand the challenges of technical interviews, 
              InterviewPrep combines cutting-edge technology with proven learning methodologies to deliver 
              an unmatched preparation experience.
            </p>
          </div>
          <div className="mission-image">
            <div className="team-photo">
              <FaUsers />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="values">
        <h2>Our Values</h2>
        <div className="values-grid">
          {values.map((value, index) => (
            <div key={index} className="value-card">
              <div className="value-icon-container">
                <value.icon />
              </div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="team">
        <h2>Meet Our Team</h2>
        <p className="team-subtitle">The passionate people behind InterviewPrep</p>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <div className="member-photo">
                {member.photo ? (
                  <img src={member.photo} alt={member.name} />
                ) : (
                  <div className="default-photo">
                    <FaUsers />
                  </div>
                )}
              </div>
              <h3>{member.name}</h3>
              <p className="role">{member.role}</p>
              <p className="bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <h2>Ready to Start Your Journey?</h2>
        <p>Join thousands of developers who have successfully prepared for their interviews with us</p>
        <div className="cta-buttons">
          <button className="btn btn-primary btn-large">Get Started Free</button>
          <button className="btn btn-outline btn-large">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default About; 