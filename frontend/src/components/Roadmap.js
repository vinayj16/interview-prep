import React, { useState, useEffect } from 'react';
import { FaCheck, FaLock, FaPlay, FaBook, FaCode, FaGraduationCap, FaChartLine, FaFilter } from 'react-icons/fa';
import { useToast } from './Toast/Toast';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import './Roadmap.css';

const Roadmap = () => {
  const { showToast } = useToast();
  const { state, actions } = useApp();
  const [selectedTrack, setSelectedTrack] = useState('dsa');
  const [expandedTopic, setExpandedTopic] = useState(null);

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

  const currentTrack = roadmapTracks[selectedTrack];

  const isTopicUnlocked = (topic) => {
    if (topic.prerequisites.length === 0) return true;
    return topic.prerequisites.every(prereq => state.completedTopics.has(prereq));
  };

  const markTopicComplete = (topicId) => {
    if (!state.completedTopics.has(topicId)) {
      actions.completeTopic(topicId);
      
      // Update stats
      actions.updateStats({
        totalPoints: state.stats.totalPoints + 25
      });
      
      // Celebration effect
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      showToast('Topic completed! 🎉', 'success');
    }
  };

  const getTopicStatus = (topic) => {
    if (state.completedTopics.has(topic.id)) return 'completed';
    if (isTopicUnlocked(topic)) return 'available';
    return 'locked';
  };

  const getProgressPercentage = () => {
    const totalTopics = currentTrack.topics.length;
    const completedCount = currentTrack.topics.filter(topic => 
      state.completedTopics.has(topic.id)
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
      case 'practice': return '💻';
      default: return '📄';
    }
  };

  return (
    <div className="roadmap-page">
      <div className="container">
        <div className="roadmap-header">
          <h1>Learning Roadmaps</h1>
          <p>Follow structured learning paths to master different technologies</p>
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

        {/* Current Track Progress */}
        <div className="track-progress">
          <div className="progress-header">
            <div className="track-title">
              <currentTrack.icon style={{ color: currentTrack.color }} />
              <h2>{currentTrack.title}</h2>
            </div>
            <div className="progress-stats">
              <span className="progress-text">
                {currentTrack.topics.filter(t => state.completedTopics.has(t.id)).length} / {currentTrack.topics.length} completed
              </span>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: `${getProgressPercentage()}%`,
                    backgroundColor: currentTrack.color
                  }}
                />
              </div>
              <span className="progress-percentage">
                {Math.round(getProgressPercentage())}%
              </span>
            </div>
          </div>
        </div>

        {/* Topics List */}
        <div className="topics-list">
          {currentTrack.topics.map((topic, index) => {
            const status = getTopicStatus(topic);
            const isExpanded = expandedTopic === topic.id;
            
            return (
              <div key={topic.id} className={`topic-card ${status}`}>
                <div className="topic-header" onClick={() => setExpandedTopic(isExpanded ? null : topic.id)}>
                  <div className="topic-status">
                    {status === 'completed' && <FaCheck />}
                    {status === 'available' && <FaPlay />}
                    {status === 'locked' && <FaLock />}
                  </div>
                  
                  <div className="topic-info">
                    <div className="topic-title">
                      <h3>{topic.title}</h3>
                      <div className="topic-meta">
                        <span className="time">⏱️ {topic.estimatedTime}</span>
                        <span 
                          className="difficulty"
                          style={{ color: getDifficultyColor(topic.difficulty) }}
                        >
                          📊 {topic.difficulty}
                        </span>
                      </div>
                    </div>
                    <p className="topic-description">{topic.description}</p>
                    
                    {topic.prerequisites.length > 0 && (
                      <div className="prerequisites">
                        <strong>Prerequisites:</strong> {topic.prerequisites.join(', ')}
                      </div>
                    )}
                  </div>
                  
                  <div className="topic-actions">
                    {status === 'available' && !state.completedTopics.has(topic.id) && (
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