import React, { useState } from 'react';
import { FaCheck, FaChevronDown, FaChevronRight, FaCode, FaServer, FaDatabase, FaMobile, FaRobot } from 'react-icons/fa';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../shared/Toast/Toast';
import './Roadmap.css';

const Roadmap = () => {
  const { state, completeTopic } = useApp();
  const { showToast } = useToast();
  
  const [expandedSections, setExpandedSections] = useState({
    frontend: true,
    backend: false,
    database: false,
    devops: false,
    mobile: false,
    ai: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const RoadmapItem = ({ title, completed = false, children }) => (
    <div className="roadmap-item">
      <div className="roadmap-item-header">
        <span className={`checkmark ${completed ? 'completed' : ''}`}>
          {completed ? <FaCheck /> : '○'}
        </span>
        <span className="roadmap-title">{title}</span>
      </div>
      {children && <div className="roadmap-children">{children}</div>}
    </div>
  );

  const RoadmapSection = ({ icon, title, sectionKey, children }) => (
    <div className="roadmap-section">
      <div 
        className="roadmap-section-header" 
        onClick={() => toggleSection(sectionKey)}
      >
        <span className="section-icon">{icon}</span>
        <h3>{title}</h3>
        <span className="toggle-icon">
          {expandedSections[sectionKey] ? <FaChevronDown /> : <FaChevronRight />}
        </span>
      </div>
      {expandedSections[sectionKey] && (
        <div className="roadmap-section-content">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="roadmap-container">
      <h1>Learning Roadmap</h1>
      <p className="roadmap-description">
        Follow this structured learning path to master full-stack development and prepare for technical interviews.
      </p>
      
      <div className="roadmap-sections">
        <RoadmapSection 
          icon={<FaCode />} 
          title="Frontend Development" 
          sectionKey="frontend" 
        >
          <RoadmapItem title="HTML & CSS Fundamentals" completed={true} />
          <RoadmapItem title="JavaScript (ES6+)" completed={true} />
          <RoadmapItem title="React.js / Vue.js / Angular" completed={false}>
            <RoadmapItem title="State Management (Redux/Context)" completed={false} />
            <RoadmapItem title="Hooks & Functional Components" completed={false} />
            <RoadmapItem title="Performance Optimization" completed={false} />
          </RoadmapItem>
          <RoadmapItem title="Responsive Design" completed={false} />
        </RoadmapSection>

        <RoadmapSection 
          icon={<FaServer />} 
          title="Backend Development" 
          sectionKey="backend" 
        >
          <RoadmapItem title="Node.js & Express" completed={false} />
          <RoadmapItem title="RESTful APIs" completed={false} />
          <RoadmapItem title="Authentication & Authorization" completed={false} />
          <RoadmapItem title="API Security" completed={false} />
        </RoadmapSection>

        <RoadmapSection 
          icon={<FaDatabase />} 
          title="Database" 
          sectionKey="database" 
        >
          <RoadmapItem title="SQL (PostgreSQL/MySQL)" completed={false} />
          <RoadmapItem title="NoSQL (MongoDB)" completed={false} />
          <RoadmapItem title="Database Design" completed={false} />
        </RoadmapSection>

        <RoadmapSection 
          icon={<FaServer />} 
          title="DevOps & Deployment" 
          sectionKey="devops" 
        >
          <RoadmapItem title="Git & GitHub" completed={false} />
          <RoadmapItem title="Docker" completed={false} />
          <RoadmapItem title="CI/CD" completed={false} />
          <RoadmapItem title="AWS/GCP/Azure" completed={false} />
        </RoadmapSection>

        <RoadmapSection 
          icon={<FaMobile />} 
          title="Mobile Development" 
          sectionKey="mobile" 
        >
          <RoadmapItem title="React Native" completed={false} />
          <RoadmapItem title="Mobile UI/UX" completed={false} />
        </RoadmapSection>

        <RoadmapSection 
          icon={<FaRobot />} 
          title="Computer Science Fundamentals" 
          sectionKey="ai" 
        >
          <RoadmapItem title="Data Structures" completed={false} />
          <RoadmapItem title="Algorithms" completed={false} />
          <RoadmapItem title="System Design" completed={false} />
          <RoadmapItem title="Object-Oriented Design" completed={false} />
        </RoadmapSection>
      </div>

      <div className="roadmap-actions">
        <button 
          className="btn-primary"
          onClick={() => showToast('Progress tracking feature coming soon!', 'info')}
        >
          Track My Progress
        </button>
        <button 
          className="btn-secondary"
          onClick={() => showToast('PDF download feature coming soon!', 'info')}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Roadmap;
