import React, { useState } from 'react';
import { FaSearch, FaBook, FaVideo, FaFileAlt, FaQuestionCircle, FaLightbulb, FaTools, FaUserGraduate, FaRocket, FaShieldAlt } from 'react-icons/fa';
import './HelpCenter.css';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedTopics, setExpandedTopics] = useState({});

  const categories = [
    { id: 'all', name: 'All Topics', icon: <FaBook /> },
    { id: 'getting-started', name: 'Getting Started', icon: <FaRocket /> },
    { id: 'features', name: 'Features', icon: <FaTools /> },
    { id: 'troubleshooting', name: 'Troubleshooting', icon: <FaQuestionCircle /> },
    { id: 'tips', name: 'Tips & Tricks', icon: <FaLightbulb /> },
    { id: 'security', name: 'Security', icon: <FaShieldAlt /> },
    { id: 'learning', name: 'Learning Resources', icon: <FaUserGraduate /> }
  ];

  const helpTopics = [
    {
      id: 1,
      title: 'How to create your first interview preparation plan',
      category: 'getting-started',
      content: 'Start by setting up your profile and selecting your target role. Then choose from our curated learning paths or create a custom plan based on your specific needs.',
      tags: ['beginner', 'setup', 'planning'],
      videoUrl: 'https://example.com/video1',
      readTime: '3 min read'
    },
    {
      id: 2,
      title: 'Understanding the MCQ practice system',
      category: 'features',
      content: 'Our MCQ system adapts to your performance, providing questions of increasing difficulty. Track your progress and review detailed explanations for each answer.',
      tags: ['mcq', 'practice', 'adaptive'],
      videoUrl: 'https://example.com/video2',
      readTime: '5 min read'
    },
    {
      id: 3,
      title: 'Optimizing your coding practice sessions',
      category: 'features',
      content: 'Use our integrated coding environment to practice real-world problems. Get instant feedback, hints, and detailed solutions to improve your coding skills.',
      tags: ['coding', 'practice', 'feedback'],
      videoUrl: 'https://example.com/video3',
      readTime: '7 min read'
    },
    {
      id: 4,
      title: 'Troubleshooting login issues',
      category: 'troubleshooting',
      content: 'If you\'re having trouble logging in, try clearing your browser cache, checking your internet connection, or resetting your password.',
      tags: ['login', 'troubleshooting', 'password'],
      videoUrl: null,
      readTime: '2 min read'
    },
    {
      id: 5,
      title: 'Advanced interview preparation strategies',
      category: 'tips',
      content: 'Learn advanced techniques for interview preparation including behavioral question frameworks, technical deep-dives, and negotiation strategies.',
      tags: ['advanced', 'strategies', 'behavioral'],
      videoUrl: 'https://example.com/video5',
      readTime: '10 min read'
    },
    {
      id: 6,
      title: 'Data privacy and security measures',
      category: 'security',
      content: 'We take your data security seriously. Learn about our encryption practices, data retention policies, and how we protect your personal information.',
      tags: ['security', 'privacy', 'data'],
      videoUrl: 'https://example.com/video6',
      readTime: '4 min read'
    },
    {
      id: 7,
      title: 'Using the learning roadmap feature',
      category: 'learning',
      content: 'Navigate through structured learning paths designed for different roles and experience levels. Track your progress and unlock new content as you advance.',
      tags: ['roadmap', 'learning', 'progress'],
      videoUrl: 'https://example.com/video7',
      readTime: '6 min read'
    },
    {
      id: 8,
      title: 'Customizing your practice sessions',
      category: 'features',
      content: 'Tailor your practice sessions by selecting specific topics, difficulty levels, and time constraints to match your learning goals.',
      tags: ['customization', 'practice', 'goals'],
      videoUrl: 'https://example.com/video8',
      readTime: '4 min read'
    }
  ];

  const toggleTopic = (topicId) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  const filteredTopics = helpTopics.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         topic.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         topic.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || topic.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  return (
    <div className="help-center-page">
      <div className="help-header">
        <h1>Help Center</h1>
        <p>Find answers to your questions and learn how to make the most of InterviewPrep</p>
      </div>

      <div className="search-section">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for help topics, features, or troubleshooting..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button onClick={clearSearch} className="clear-search">
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="help-content">
        <div className="categories-sidebar">
          <h3>Categories</h3>
          <div className="category-list">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="topics-main">
          <div className="topics-header">
            <h2>
              {selectedCategory === 'all' ? 'All Help Topics' : 
               categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <span className="results-count">
              {filteredTopics.length} {filteredTopics.length === 1 ? 'result' : 'results'}
            </span>
          </div>

          {filteredTopics.length === 0 ? (
            <div className="no-results">
              <FaQuestionCircle className="no-results-icon" />
              <h3>No results found</h3>
              <p>Try adjusting your search terms or browse different categories</p>
              <button onClick={clearSearch} className="browse-all-button">
                Browse All Topics
              </button>
            </div>
          ) : (
            <div className="topics-list">
              {filteredTopics.map(topic => (
                <div key={topic.id} className="topic-item">
                  <div 
                    className="topic-header"
                    onClick={() => toggleTopic(topic.id)}
                  >
                    <div className="topic-title-section">
                      <h3>{topic.title}</h3>
                      <div className="topic-meta">
                        <span className="topic-category">
                          {categories.find(c => c.id === topic.category)?.name}
                        </span>
                        <span className="topic-read-time">{topic.readTime}</span>
                      </div>
                    </div>
                    <div className="topic-actions">
                      {topic.videoUrl && (
                        <a 
                          href={topic.videoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="video-link"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaVideo />
                        </a>
                      )}
                      <span className={`expand-icon ${expandedTopics[topic.id] ? 'expanded' : ''}`}>
                        ▼
                      </span>
                    </div>
                  </div>
                  
                  {expandedTopics[topic.id] && (
                    <div className="topic-content">
                      <p>{topic.content}</p>
                      <div className="topic-tags">
                        {topic.tags.map(tag => (
                          <span key={tag} className="topic-tag">{tag}</span>
                        ))}
                      </div>
                      {topic.videoUrl && (
                        <div className="video-section">
                          <h4>Watch Video Tutorial</h4>
                          <a 
                            href={topic.videoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="video-button"
                          >
                            <FaVideo /> Watch Now
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="help-footer">
        <div className="quick-links">
          <h3>Quick Links</h3>
          <div className="quick-links-grid">
            <a href="/support" className="quick-link">
              <FaQuestionCircle />
              <span>Contact Support</span>
            </a>
            <a href="/faq" className="quick-link">
              <FaFileAlt />
              <span>FAQ</span>
            </a>
            <a href="/tutorials" className="quick-link">
              <FaVideo />
              <span>Video Tutorials</span>
            </a>
            <a href="/feedback" className="quick-link">
              <FaLightbulb />
              <span>Send Feedback</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter; 