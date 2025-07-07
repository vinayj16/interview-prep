import React, { useState, useEffect, useMemo } from 'react';
import { 
  FaCheck, FaLock, FaPlay, FaBook, FaCode, FaGraduationCap, 
  FaChartLine, FaFilter, FaSearch, FaTimes, FaStar, FaClock, FaLevelUpAlt 
} from 'react-icons/fa';
import { useToast } from './Toast/Toast';
import confetti from 'canvas-confetti';
import './Roadmap.css';

const Roadmap = ({ user }) => {
  const { showToast } = useToast();
  const [selectedTrack, setSelectedTrack] = useState('dsa');
  const [completedTopics, setCompletedTopics] = useState(() => {
    try {
      const saved = localStorage.getItem('completedTopics');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    difficulty: 'all',
    status: 'all',
    time: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Save completed topics to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('completedTopics', JSON.stringify(Array.from(completedTopics)));
    } catch (error) {
      console.error('Error saving completed topics:', error);
    }
  }, [completedTopics]);

  const handleTopicToggle = (topicId, e) => {
    if (e) e.stopPropagation();
    const newCompletedTopics = new Set(completedTopics);
    
    // Toggle completion status
    if (newCompletedTopics.has(topicId)) {
      newCompletedTopics.delete(topicId);
      setCompletedTopics(newCompletedTopics);
      return;
    }
    
    // Only allow completing available topics
    const topic = currentTrack.topics.find(t => t.id === topicId);
    if (!topic) return;
    
    if (!isTopicUnlocked(topic)) {
      showToast('Complete the prerequisites first!', 'warning');
      return;
    }
    
    // Mark as completed
    newCompletedTopics.add(topicId);
    setCompletedTopics(newCompletedTopics);
    
    // Celebrate completion
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    showToast('Great job! Keep going!', 'success');
  };

  // Mock roadmap data
  const roadmapTracks = {
    dsa: {
      title: "Data Structures & Algorithms",
      description: "Master the fundamentals of computer science",
      icon: FaCode,
      color: "#3b82f6",
      estimatedTime: "3-6 months",
      difficulty: "Intermediate",
      topics: [
        {
          id: 'arrays',
          title: 'Arrays & Strings',
          description: 'Learn about basic data structures and string manipulation',
          estimatedTime: '1-2 weeks',
          difficulty: 'Beginner',
          prerequisites: [],
          subtopics: [
            'Array basics and operations',
            'Two-pointer technique',
            'Sliding window',
            'String manipulation',
            'Pattern matching'
          ],
          resources: [
            { type: 'article', title: 'Array Fundamentals', url: '#' },
            { type: 'video', title: 'Two Pointer Technique', url: '#' },
            { type: 'practice', title: 'Array Problems', url: '#' }
          ]
        },
        // ... (other topics)
      ]
    },
    // ... (other tracks)
  };

  const currentTrack = roadmapTracks[selectedTrack] || roadmapTracks.dsa;

  // Process and filter topics
  const { filteredTopics, progress } = useMemo(() => {
    if (!currentTrack?.topics) return { filteredTopics: [], progress: 0 };
    
    const topics = currentTrack.topics || [];
    const completed = topics.filter(topic => completedTopics.has(topic.id));
    const progress = topics.length > 0 ? Math.round((completed.length / topics.length) * 100) : 0;
    
    const filtered = topics.filter(topic => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Difficulty filter
      const matchesDifficulty = filters.difficulty === 'all' || 
        topic.difficulty.toLowerCase() === filters.difficulty.toLowerCase();
      
      // Status filter
      const matchesStatus = filters.status === 'all' ||
        (filters.status === 'completed' && completedTopics.has(topic.id)) ||
        (filters.status === 'pending' && !completedTopics.has(topic.id));
      
      // Time filter
      const matchesTime = filters.time === 'all' ||
        (filters.time === 'quick' && topic.estimatedTime.includes('week')) ||
        (filters.time === 'long' && topic.estimatedTime.includes('month'));
      
      return matchesSearch && matchesDifficulty && matchesStatus && matchesTime;
    });
    
    return { filteredTopics: filtered, progress };
  }, [currentTrack, completedTopics, searchQuery, filters]);

  const isTopicUnlocked = (topic) => {
    if (!topic.prerequisites || topic.prerequisites.length === 0) return true;
    return topic.prerequisites.every(prereq => completedTopics.has(prereq));
  };

  const isTopicAvailable = (topic) => {
    return isTopicUnlocked(topic) && !completedTopics.has(topic.id);
  };

  const getTopicStatus = (topic) => {
    if (completedTopics.has(topic.id)) return 'completed';
    return isTopicUnlocked(topic) ? 'available' : 'locked';
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return '#10b981';
      case 'intermediate': return '#3b82f6';
      case 'advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'article': return '📖';
      case 'video': return '🎥';
      case 'practice': return '💻';
      default: return '📄';
    }
  };

  return (
    <div className="roadmap-page">
      <div className="container">
        <div className="roadmap-header">
          <h1>Learning Roadmaps</h1>
          <p>Structured learning paths to master in-demand skills</p>
          
          {/* Search and Filters */}
          <div className="search-filters">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button 
                  className="clear-search"
                  onClick={() => setSearchQuery('')}
                >
                  <FaTimes />
                </button>
              )}
            </div>
            
            <button 
              className={`filter-toggle ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter /> Filters
            </button>
            
            {showFilters && (
              <div className="filters-panel">
                <div className="filter-group">
                  <label>Difficulty:</label>
                  <select 
                    value={filters.difficulty}
                    onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
                  >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                
                <div className="filter-group">
                  <label>Status:</label>
                  <select 
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                  >
                    <option value="all">All Topics</option>
                    <option value="completed">Completed</option>
                    <option value="pending">In Progress</option>
                  </select>
                </div>
                
                <div className="filter-group">
                  <label>Time:</label>
                  <select 
                    value={filters.time}
                    onChange={(e) => setFilters({...filters, time: e.target.value})}
                  >
                    <option value="all">Any Duration</option>
                    <option value="quick">Quick (Weeks)</option>
                    <option value="long">Long (Months)</option>
                  </select>
                </div>
              </div>
            )}
          </div>
          
          {/* Progress Bar */}
          <div className="progress-container">
            <div className="progress-labels">
              <span>Track Progress</span>
              <span>{progress}% Complete</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Track Selection */}
        <div className="track-selection">
          {Object.entries(roadmapTracks).map(([id, track]) => (
            <div 
              key={id}
              className={`track-card ${selectedTrack === id ? 'active' : ''}`}
              onClick={() => setSelectedTrack(id)}
            >
              <track.icon className="track-icon" style={{ color: track.color }} />
              <div className="track-info">
                <h3>{track.title}</h3>
                <p>{track.description}</p>
                <div className="track-meta">
                  <span>{track.estimatedTime}</span>
                  <span>{track.difficulty}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Topics List */}
        <div className="topics-list">
          {filteredTopics.map((topic) => (
            <div 
              key={topic.id}
              className={`topic-card ${getTopicStatus(topic)} ${expandedTopic === topic.id ? 'expanded' : ''}`}
            >
              <div 
                className="topic-header"
                onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
              >
                <div 
                  className="topic-status"
                  onClick={(e) => handleTopicToggle(topic.id, e)}
                >
                  {completedTopics.has(topic.id) ? (
                    <span className="checkmark"><FaCheck /></span>
                  ) : (
                    <span className="circle"></span>
                  )}
                </div>
                
                <div className="topic-info">
                  <h3>{topic.title}</h3>
                  <p className="topic-description">{topic.description}</p>
                  
                  <div className="topic-meta">
                    <span className={`difficulty-badge ${topic.difficulty.toLowerCase()}`}>
                      {topic.difficulty}
                    </span>
                    <span className="time-estimate">
                      <FaClock /> {topic.estimatedTime}
                    </span>
                    {topic.prerequisites && topic.prerequisites.length > 0 && (
                      <span className="prereq-badge">
                        <FaLevelUpAlt /> {topic.prerequisites.length} Prereqs
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="topic-actions">
                  {getTopicStatus(topic) === 'locked' ? (
                    <FaLock className="locked-icon" />
                  ) : (
                    <FaPlay className="expand-icon" />
                  )}
                </div>
              </div>
              
              {expandedTopic === topic.id && (
                <div className="topic-details">
                  <div className="subtopics">
                    <h4>What You'll Learn:</h4>
                    <ul>
                      {topic.subtopics.map((subtopic, idx) => (
                        <li key={idx}>{subtopic}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {topic.resources && topic.resources.length > 0 && (
                    <div className="resources">
                      <h4>Resources:</h4>
                      <div className="resource-list">
                        {topic.resources.map((resource, idx) => (
                          <a 
                            key={idx} 
                            href={resource.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="resource-item"
                          >
                            <span className="resource-icon">
                              {getResourceIcon(resource.type)}
                            </span>
                            {resource.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          
          {filteredTopics.length === 0 && (
            <div className="no-results">
              <p>No topics found matching your criteria. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
