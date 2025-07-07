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

  // Process and filter topics
  const { filteredTopics, progress } = useMemo(() => {
    if (!roadmapTracks[selectedTrack]) return { filteredTopics: [], progress: 0 };
    
    const topics = roadmapTracks[selectedTrack].topics || [];
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
  }, [selectedTrack, completedTopics, searchQuery, filters]);

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
        {
          id: 'linkedlists',
          title: 'Linked Lists',
          description: 'Understand pointer-based data structures',
          estimatedTime: '1 week',
          difficulty: 'Beginner',
          prerequisites: ['arrays'],
          subtopics: [
            'Singly linked lists',
            'Doubly linked lists',
            'Circular linked lists',
            'List operations',
            'Fast and slow pointers'
          ],
          resources: [
            { type: 'article', title: 'Linked List Basics', url: '#' },
            { type: 'video', title: 'Linked List Operations', url: '#' },
            { type: 'practice', title: 'Linked List Problems', url: '#' }
          ]
        },
        {
          id: 'stacks-queues',
          title: 'Stacks & Queues',
          description: 'Master LIFO and FIFO data structures',
          estimatedTime: '1 week',
          difficulty: 'Beginner',
          prerequisites: ['arrays'],
          subtopics: [
            'Stack implementation',
            'Queue implementation',
            'Deque operations',
            'Priority queues',
            'Applications and use cases'
          ],
          resources: [
            { type: 'article', title: 'Stack and Queue Fundamentals', url: '#' },
            { type: 'video', title: 'Stack Applications', url: '#' },
            { type: 'practice', title: 'Stack & Queue Problems', url: '#' }
          ]
        },
        {
          id: 'trees',
          title: 'Trees & Binary Trees',
          description: 'Learn hierarchical data structures',
          estimatedTime: '2-3 weeks',
          difficulty: 'Intermediate',
          prerequisites: ['linkedlists', 'stacks-queues'],
          subtopics: [
            'Binary tree basics',
            'Tree traversals',
            'Binary search trees',
            'Balanced trees',
            'Tree algorithms'
          ],
          resources: [
            { type: 'article', title: 'Tree Data Structure', url: '#' },
            { type: 'video', title: 'Tree Traversals', url: '#' },
            { type: 'practice', title: 'Tree Problems', url: '#' }
          ]
        },
        {
          id: 'graphs',
          title: 'Graphs',
          description: 'Explore graph theory and algorithms',
          estimatedTime: '2-3 weeks',
          difficulty: 'Advanced',
          prerequisites: ['trees'],
          subtopics: [
            'Graph representation',
            'BFS and DFS',
            'Shortest path algorithms',
            'Minimum spanning tree',
            'Topological sorting'
          ],
          resources: [
            { type: 'article', title: 'Graph Theory Basics', url: '#' },
            { type: 'video', title: 'Graph Algorithms', url: '#' },
            { type: 'practice', title: 'Graph Problems', url: '#' }
          ]
        },
        {
          id: 'dynamic-programming',
          title: 'Dynamic Programming',
          description: 'Master optimization techniques',
          estimatedTime: '3-4 weeks',
          difficulty: 'Advanced',
          prerequisites: ['trees', 'graphs'],
          subtopics: [
            'DP fundamentals',
            'Memoization vs tabulation',
            '1D and 2D DP',
            'Common DP patterns',
            'Advanced DP techniques'
          ],
          resources: [
            { type: 'article', title: 'Dynamic Programming Guide', url: '#' },
            { type: 'video', title: 'DP Patterns', url: '#' },
            { type: 'practice', title: 'DP Problems', url: '#' }
          ]
        }
      ]
    },
    frontend: {
      title: "Frontend Development",
      description: "Build modern web applications",
      icon: FaGraduationCap,
      color: "#10b981",
      estimatedTime: "4-8 months",
      difficulty: "Beginner to Advanced",
      topics: [
        {
          id: 'html-css',
          title: 'HTML & CSS',
          description: 'Learn the building blocks of web development',
          estimatedTime: '2-3 weeks',
          difficulty: 'Beginner',
          prerequisites: [],
          subtopics: [
            'HTML semantics',
            'CSS fundamentals',
            'Flexbox and Grid',
            'Responsive design',
            'CSS animations'
          ],
          resources: [
            { type: 'article', title: 'HTML Basics', url: '#' },
            { type: 'video', title: 'CSS Flexbox', url: '#' },
            { type: 'practice', title: 'Build a Landing Page', url: '#' }
          ]
        },
        {
          id: 'javascript',
          title: 'JavaScript',
          description: 'Master the language of the web',
          estimatedTime: '4-6 weeks',
          difficulty: 'Intermediate',
          prerequisites: ['html-css'],
          subtopics: [
            'ES6+ features',
            'DOM manipulation',
            'Async programming',
            'Modules and bundling',
            'Testing fundamentals'
          ],
          resources: [
            { type: 'article', title: 'Modern JavaScript', url: '#' },
            { type: 'video', title: 'Async/Await', url: '#' },
            { type: 'practice', title: 'JavaScript Projects', url: '#' }
          ]
        },
        {
          id: 'react',
          title: 'React',
          description: 'Build interactive user interfaces',
          estimatedTime: '4-6 weeks',
          difficulty: 'Intermediate',
          prerequisites: ['javascript'],
          subtopics: [
            'Components and JSX',
            'State and props',
            'Hooks',
            'Context API',
            'React Router'
          ],
          resources: [
            { type: 'article', title: 'React Fundamentals', url: '#' },
            { type: 'video', title: 'React Hooks', url: '#' },
            { type: 'practice', title: 'React Projects', url: '#' }
          ]
        }
      ]
    },
    backend: {
      title: "Backend Development",
      description: "Build scalable server-side applications",
      icon: FaBook,
      color: "#8b5cf6",
      estimatedTime: "4-8 months",
      difficulty: "Intermediate to Advanced",
      topics: [
        {
          id: 'nodejs',
          title: 'Node.js',
          description: 'Server-side JavaScript development',
          estimatedTime: '3-4 weeks',
          difficulty: 'Intermediate',
          prerequisites: [],
          subtopics: [
            'Node.js fundamentals',
            'Express.js framework',
            'Middleware',
            'RESTful APIs',
            'Authentication'
          ],
          resources: [
            { type: 'article', title: 'Node.js Guide', url: '#' },
            { type: 'video', title: 'Express.js Tutorial', url: '#' },
            { type: 'practice', title: 'Build an API', url: '#' }
          ]
        },
        {
          id: 'databases',
          title: 'Databases',
          description: 'Data storage and management',
          estimatedTime: '3-4 weeks',
          difficulty: 'Intermediate',
          prerequisites: ['nodejs'],
          subtopics: [
            'SQL fundamentals',
            'NoSQL databases',
            'Database design',
            'ORMs and ODMs',
            'Database optimization'
          ],
          resources: [
            { type: 'article', title: 'Database Design', url: '#' },
            { type: 'video', title: 'SQL vs NoSQL', url: '#' },
            { type: 'practice', title: 'Database Projects', url: '#' }
          ]
        }
      ]
    },
    system: {
      title: "System Design",
      description: "Design scalable distributed systems",
      icon: FaChartLine,
      color: "#f59e0b",
      estimatedTime: "6-12 months",
      difficulty: "Advanced",
      topics: [
        {
          id: 'fundamentals',
          title: 'System Design Fundamentals',
          description: 'Core concepts of distributed systems',
          estimatedTime: '2-3 weeks',
          difficulty: 'Intermediate',
          prerequisites: [],
          subtopics: [
            'Scalability principles',
            'Load balancing',
            'Caching strategies',
            'Database sharding',
            'Microservices'
          ],
          resources: [
            { type: 'article', title: 'System Design Primer', url: '#' },
            { type: 'video', title: 'Scalability Concepts', url: '#' },
            { type: 'practice', title: 'Design Exercises', url: '#' }
          ]
        },
        {
          id: 'case-studies',
          title: 'System Design Case Studies',
          description: 'Real-world system design examples',
          estimatedTime: '4-6 weeks',
          difficulty: 'Advanced',
          prerequisites: ['fundamentals'],
          subtopics: [
            'Design Twitter',
            'Design URL shortener',
            'Design chat system',
            'Design video streaming',
            'Design search engine'
          ],
          resources: [
            { type: 'article', title: 'System Design Examples', url: '#' },
            { type: 'video', title: 'Design Interviews', url: '#' },
            { type: 'practice', title: 'Mock Interviews', url: '#' }
          ]
        }
      ]
    }
  };

  useEffect(() => {
    // Load completed topics from localStorage
    const saved = localStorage.getItem('completedTopics');
    if (saved) {
      setCompletedTopics(new Set(JSON.parse(saved)));
    }
  }, []);

  useEffect(() => {
    // Save completed topics to localStorage
    localStorage.setItem('completedTopics', JSON.stringify([...completedTopics]));
  }, [completedTopics]);

  const currentTrack = roadmapTracks[selectedTrack];

  const isTopicUnlocked = (topic) => {
    if (topic.prerequisites.length === 0) return true;
    return topic.prerequisites.every(prereq => completedTopics.has(prereq));
  };

  const isTopicAvailable = (topic) => {
    return isTopicUnlocked(topic) && !completedTopics.has(topic.id);
  };

  const getTopicStatus = (topic) => {
    if (completedTopics.has(topic.id)) return 'completed';
    if (isTopicUnlocked(topic)) return 'available';
    return 'locked';
  };

  const getProgressPercentage = () => {
    const totalTopics = currentTrack.topics.length;
    const completedCount = currentTrack.topics.filter(topic => 
      completedTopics.has(topic.id)
    ).length;
    return (completedCount / totalTopics) * 100;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return '#10b981';
      case 'intermediate': return '#f59e0b';
      case 'advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'article': return '📖';
      case 'video': return '🎥';

const getResourceIcon = (type) => {
  switch (type) {
    case 'article': return '📖';
    case 'video': return '🎥';
    case 'practice': return '💻';
    default: return '📄';
  }
};

const toggleTopicCompletion = (topicId) => {
  if (completedTopics.has(topicId)) {
    const newCompleted = new Set(completedTopics);
    newCompleted.delete(topicId);
    setCompletedTopics(newCompleted);
  } else {
    markTopicComplete(topicId);
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
              <span>{getProgressPercentage()}% Complete</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Track Selection */}
        <div className="track-selection">
          {Object.entries(roadmapTracks).map(([key, track]) => (
            <button
              key={key}
              className={`track-card ${selectedTrack === key ? 'active' : ''}`}
              onClick={() => setSelectedTrack(key)}
            >
              <div className="track-icon" style={{ color: track.color }}>
                <track.icon />
              </div>
              <div className="track-info">
                <h3>{track.title}</h3>
                <p>{track.description}</p>
                <div className="track-meta">
                  <span className="time">⏱️ {track.estimatedTime}</span>
                  <span className="difficulty" style={{ color: getDifficultyColor(track.difficulty) }}>
                    📊 {track.difficulty}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Topics List */}
        <div className="topics-list">
          {currentTrack.topics.map((topic, index) => {
            const status = getTopicStatus(topic);
            const isExpanded = expandedTopic === topic.id;
            
            return (
              <div 
                key={topic.id} 
                className={`topic-card ${completedTopics.has(topic.id) ? 'completed' : ''} ${expandedTopic === topic.id ? 'expanded' : ''}`}
              >
                <div 
                  className="topic-header"
                  onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
                >
                  <div 
                    className="topic-status" 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTopicCompletion(topic.id);
                    }}
                  >
                    {completedTopics.has(topic.id) ? (
                      <span className="checkmark"><FaCheck /></span>
                    ) : (
                      <span className="circle"></span>
                    )}
                  </div>
                  
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
                  
                  <div className="topic-actions">
                    {status === 'available' && !completedTopics.has(topic.id) && (
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          markTopicComplete(topic.id);
                        }}
                      >
                        Mark Complete
                      </button>
                    )}
                    {status === 'completed' && (
                      <span className="completed-badge">✅ Completed</span>
                    )}
                    {status === 'locked' && (
                      <span className="locked-badge">🔒 Locked</span>
                    )}
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="topic-details">
                    <div className="subtopics">
                      <h4>What you'll learn:</h4>
                      <ul>
                        {topic.subtopics.map((subtopic, idx) => (
                          <li key={idx}>{subtopic}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="resources">
                      <h4>Learning Resources:</h4>
                      <div className="resources-grid">
                        {topic.resources.map((resource, idx) => (
                          <a 
                            key={idx} 
                            href={resource.url} 
                            className="resource-item"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="resource-icon">
                              {getResourceIcon(resource.type)}
                            </span>
                            <span className="resource-title">{resource.title}</span>
                            <span className="resource-type">{resource.type}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Achievement Section */}
        {getProgressPercentage() === 100 && (
          <div className="achievement-section">
            <div className="achievement-card">
              <div className="achievement-icon">🏆</div>
              <h3>Congratulations!</h3>
              <p>You've completed the {currentTrack.title} roadmap!</p>
              <button className="btn btn-primary">
                Get Certificate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Roadmap;