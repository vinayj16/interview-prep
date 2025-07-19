import React from 'react';
import { FaCode, FaQuestionCircle, FaFileAlt, FaRoute, FaUser, FaStar, FaRocket, FaShieldAlt, FaHeadset, FaGraduationCap } from 'react-icons/fa';
import './Services.css';

const Services = () => {
  const services = [
    {
      icon: FaCode,
      title: 'Coding Problems',
      description: 'Practice with hundreds of coding problems from easy to hard difficulty levels.',
      features: ['Multiple programming languages', 'Real-time code execution', 'Detailed solutions', 'Progress tracking'],
      pricing: 'Free'
    },
    {
      icon: FaQuestionCircle,
      title: 'MCQ Tests',
      description: 'Comprehensive multiple choice questions covering various technical topics.',
      features: ['Topic-wise tests', 'Timed assessments', 'Performance analytics', 'Detailed explanations'],
      pricing: 'Free'
    },
    {
      icon: FaFileAlt,
      title: 'Resume Builder',
      description: 'Create professional resumes with AI-powered suggestions and templates.',
      features: ['AI-powered suggestions', 'Multiple templates', 'Real-time preview', 'Export options'],
      pricing: 'Free'
    },
    {
      icon: FaRoute,
      title: 'Learning Roadmap',
      description: 'Structured learning paths to master different technologies and concepts.',
      features: ['Curated content', 'Progress tracking', 'Interactive learning', 'Expert guidance'],
      pricing: 'Free'
    },
    {
      icon: FaUser,
      title: 'Mock Interviews',
      description: 'Practice face-to-face interviews with AI-powered feedback and analysis.',
      features: ['Video recording', 'AI feedback', 'Performance metrics', 'Interview tips'],
      pricing: 'Premium'
    },
    {
      icon: FaStar,
      title: 'Code Reviews',
      description: 'Get expert feedback on your code with detailed suggestions for improvement.',
      features: ['Expert reviewers', 'Detailed feedback', 'Best practices', 'Code optimization'],
      pricing: 'Premium'
    }
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        'Access to coding problems',
        'MCQ tests',
        'Basic resume builder',
        'Learning roadmaps',
        'Community support'
      ],
      popular: false
    },
    {
      name: 'Pro',
      price: '$19',
      period: 'per month',
      features: [
        'Everything in Free',
        'Mock interviews',
        'Code reviews',
        'Priority support',
        'Advanced analytics',
        'Custom learning paths'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      features: [
        'Everything in Pro',
        'Team management',
        'Custom integrations',
        'Dedicated support',
        'White-label options',
        'API access'
      ],
      popular: false
    }
  ];

  return (
    <div className="services">
      {/* Hero Section */}
      <div className="services-hero">
          <h1>Our Services</h1>
        <p className="subtitle">Comprehensive interview preparation tools to help you succeed</p>
        </div>

      {/* Services Grid */}
      <div className="services-grid-section">
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon-container">
                <service.icon />
                </div>
                <h3>{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>
                    <span className="feature-icon">✓</span>
                    {feature}
                    </li>
                  ))}
                </ul>
              <div className="pricing">
                <span className="price-tag">{service.pricing}</span>
              </div>
              </div>
            ))}
          </div>
        </div>

      {/* Pricing Section */}
      <div className="pricing">
          <div className="section-header">
          <h2>Choose Your Plan</h2>
          <p>Start free and upgrade as you grow</p>
          </div>
          
          <div className="pricing-grid">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && <div className="popular-tag">Most Popular</div>}
                <h3>{plan.name}</h3>
                <div className="price">
                  {plan.price}
                  <span>/{plan.period}</span>
                </div>
                <ul className="features">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>
                <button className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'}`}>
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </button>
              </div>
            ))}
          </div>
        </div>

      {/* CTA Section */}
      <div className="cta-section">
        <h2>Ready to Start Your Interview Preparation?</h2>
        <p>Join thousands of developers who have successfully landed their dream jobs</p>
          <div className="cta-buttons">
          <button className="btn btn-primary btn-large">Start Free Trial</button>
          <button className="btn btn-outline btn-large">View Demo</button>
        </div>
      </div>
    </div>
  );
};

export default Services;