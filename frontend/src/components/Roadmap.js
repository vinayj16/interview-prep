import React, { useState, memo } from 'react';
import { FaCheck, FaLock, FaPlay, FaBook, FaCode, FaGraduationCap, FaChartLine, FaFilter } from 'react-icons/fa';
import { useToast } from './Toast/Toast';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import './Roadmap.css';

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
          { type: 'article', title: 'Array Fundamentals', url: 'https://www.geeksforgeeks.org/array-data-structure/' },
          { type: 'video', title: 'Two Pointer Technique', url: 'https://www.youtube.com/watch?v=PZQXd7Df2X4' },
          { type: 'practice', title: 'Array Problems', url: 'https://leetcode.com/tag/array/' }
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
          { type: 'article', title: 'Linked List Basics', url: 'https://www.geeksforgeeks.org/data-structures/linked-list/' },
          { type: 'video', title: 'Linked List Operations', url: 'https://www.youtube.com/watch?v=WwfhLC16bis' },
          { type: 'practice', title: 'Linked List Problems', url: 'https://leetcode.com/tag/linked-list/' }
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
          { type: 'article', title: 'Stack and Queue Fundamentals', url: 'https://www.geeksforgeeks.org/stack-data-structure/' },
          { type: 'video', title: 'Stack Applications', url: 'https://www.youtube.com/watch?v=F1F2imiOJfk' },
          { type: 'practice', title: 'Stack & Queue Problems', url: 'https://leetcode.com/tag/stack/' }
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
          { type: 'article', title: 'Tree Data Structure', url: 'https://www.geeksforgeeks.org/binary-tree-data-structure/' },
          { type: 'video', title: 'Tree Traversals', url: 'https://www.youtube.com/watch?v=5N-55ZkXU-4' },
          { type: 'practice', title: 'Tree Problems', url: 'https://leetcode.com/tag/tree/' }
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
          { type: 'article', title: 'Graph Theory Basics', url: 'https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/' },
          { type: 'video', title: 'Graph Algorithms', url: 'https://www.youtube.com/watch?v=tWVWeAqZ0WU' },
          { type: 'practice', title: 'Graph Problems', url: 'https://leetcode.com/tag/graph/' }
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
          { type: 'article', title: 'Dynamic Programming Guide', url: 'https://www.geeksforgeeks.org/dynamic-programming/' },
          { type: 'video', title: 'DP Patterns', url: 'https://www.youtube.com/watch?v=YBSt1jYwVfU' },
          { type: 'practice', title: 'DP Problems', url: 'https://leetcode.com/tag/dynamic-programming/' }
        ]
      }
    ],
    notes: [
      'Master time and space complexity analysis (Big O notation).',
      'Practice writing code on paper/whiteboard for interviews.',
      'Understand recursion, iteration, and trade-offs between them.',
      'Learn to optimize brute-force solutions.'
    ],
    videos: [
      { title: 'DSA Crash Course (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=8hly31xKli0' },
      { title: 'Dynamic Programming Patterns', url: 'https://www.youtube.com/watch?v=YBSt1jYwVfU' },
      { title: 'NeetCode 150 Playlist', url: 'https://www.youtube.com/playlist?list=PLot-Xpze53ldVwtstag2TL4HQhAnC8ATf' }
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
          { type: 'article', title: 'HTML Basics', url: 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics' },
          { type: 'video', title: 'CSS Flexbox', url: 'https://www.youtube.com/watch?v=JJSoEo8JSnc' },
          { type: 'practice', title: 'Build a Landing Page', url: 'https://www.frontendmentor.io/challenges' }
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
          { type: 'article', title: 'Modern JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
          { type: 'video', title: 'Async/Await', url: 'https://www.youtube.com/watch?v=vn3tm0quoqE' },
          { type: 'practice', title: 'JavaScript Projects', url: 'https://javascript30.com/' }
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
          { type: 'article', title: 'React Fundamentals', url: 'https://reactjs.org/docs/getting-started.html' },
          { type: 'video', title: 'React Hooks', url: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8' },
          { type: 'practice', title: 'React Projects', url: 'https://www.freecodecamp.org/learn/front-end-development-libraries/' }
        ]
      }
    ],
    notes: [
      'Focus on building real projects to solidify your knowledge.',
      'Learn the basics of HTTP, REST, and how the web works.',
      'Understand the difference between frontend and backend.',
      'Practice responsive design and accessibility.'
    ],
    videos: [
      { title: 'HTML, CSS, JavaScript in 1 Video', url: 'https://www.youtube.com/watch?v=UB1O30fR-EE' },
      { title: 'React JS Crash Course', url: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8' },
      { title: 'Frontend Development Roadmap', url: 'https://www.youtube.com/watch?v=0pThnRneDjw' }
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
          { type: 'article', title: 'Node.js Guide', url: 'https://nodejs.org/en/docs/guides/' },
          { type: 'video', title: 'Express.js Tutorial', url: 'https://www.youtube.com/watch?v=Oe421EPjeBE' },
          { type: 'practice', title: 'Build an API', url: 'https://www.freecodecamp.org/news/learn-express-js/' }
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
          { type: 'article', title: 'Database Design', url: 'https://www.guru99.com/database-design.html' },
          { type: 'video', title: 'SQL vs NoSQL', url: 'https://www.youtube.com/watch?v=ZS_kXvOeQ5Y' },
          { type: 'practice', title: 'Database Projects', url: 'https://www.sqlpractice.com/' }
        ]
      }
    ],
    notes: [
      'Get hands-on with cloud provider free tiers.',
      'Automate deployments and learn CI/CD best practices.',
      'Understand security and compliance basics.'
    ],
    videos: [
      { title: 'Node.js & Express.js - Full Course', url: 'https://www.youtube.com/watch?v=Oe421EPjeBE' },
      { title: 'Database Design Course', url: 'https://www.youtube.com/watch?v=ztHopE5Wnpc' },
      { title: 'Backend Development Roadmap', url: 'https://www.youtube.com/watch?v=0yWAtQ6wYNM' }
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
          { type: 'article', title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer' },
          { type: 'video', title: 'Scalability Concepts', url: 'https://www.youtube.com/watch?v=-W9F__D3oD4' },
          { type: 'practice', title: 'Design Exercises', url: 'https://github.com/checkcheckzz/system-design-interview' }
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
          { type: 'article', title: 'System Design Examples', url: 'https://github.com/karanpratapsingh/system-design' },
          { type: 'video', title: 'Design Interviews', url: 'https://www.youtube.com/watch?v=UzLMhqg3_Wc' },
          { type: 'practice', title: 'Mock Interviews', url: 'https://www.pramp.com/' }
        ]
      }
    ],
    notes: [
      'Draw diagrams for every system you design.',
      'Understand trade-offs between consistency, availability, and partition tolerance (CAP theorem).',
      'Practice explaining your design decisions clearly.',
      'Study real-world architectures (YouTube, Twitter, WhatsApp, etc.).'
    ],
    videos: [
      { title: 'System Design Basics (Gaurav Sen)', url: 'https://www.youtube.com/watch?v=UzLMhqg3_Wc' },
      { title: 'System Design Interview Course', url: 'https://www.youtube.com/playlist?list=PLTCrU9sGyburBw9wNOHebv9SjlE4Elv5a' },
      { title: 'How to Ace a System Design Interview', url: 'https://www.youtube.com/watch?v=ZgdS0EUmn70' }
    ]
  },
  webdev: {
    title: "Web Development",
    description: "Full-stack web development roadmap",
    icon: FaBook,
    color: "#8b5cf6",
    estimatedTime: "6-12 months",
    difficulty: "Beginner to Advanced",
    topics: [
      {
        id: 'html-css-js',
        title: 'HTML, CSS, JavaScript Basics',
        description: 'Learn the core technologies of web development',
        estimatedTime: '4-6 weeks',
        difficulty: 'Beginner',
        prerequisites: [],
        subtopics: [
          'HTML5 semantics',
          'CSS3 features',
          'JavaScript fundamentals',
          'DOM manipulation',
          'Basic projects'
        ],
        resources: [
          { type: 'article', title: 'MDN Web Docs', url: 'https://developer.mozilla.org/' },
          { type: 'video', title: 'HTML, CSS, JS Crash Course', url: 'https://www.youtube.com/watch?v=UB1O30fR-EE' },
          { type: 'practice', title: 'Frontend Mentor', url: 'https://www.frontendmentor.io/' }
        ]
      },
      {
        id: 'responsive-design',
        title: 'Responsive Design',
        description: 'Create websites that work on all devices',
        estimatedTime: '2-3 weeks',
        difficulty: 'Beginner',
        prerequisites: ['html-css-js'],
        subtopics: [
          'Media queries',
          'Flexbox and Grid',
          'Mobile-first approach',
          'Responsive images',
          'Viewport units'
        ],
        resources: [
          { type: 'article', title: 'Responsive Design Basics', url: 'https://web.dev/learn/design/responsive-web-design/' },
          { type: 'video', title: 'CSS Grid Tutorial', url: 'https://www.youtube.com/watch?v=jV8B24rSN5o' },
          { type: 'practice', title: 'Responsive Design Challenges', url: 'https://www.frontendmentor.io/challenges?types=responsive' }
        ]
      },
      {
        id: 'version-control',
        title: 'Version Control (Git)',
        description: 'Learn to track and manage code changes',
        estimatedTime: '1-2 weeks',
        difficulty: 'Beginner',
        prerequisites: [],
        subtopics: [
          'Git basics',
          'Branching and merging',
          'GitHub/GitLab',
          'Collaboration workflows',
          'Pull requests'
        ],
        resources: [
          { type: 'article', title: 'Git Documentation', url: 'https://git-scm.com/doc' },
          { type: 'video', title: 'Git Tutorial', url: 'https://www.youtube.com/watch?v=RGOj5yH7evk' },
          { type: 'practice', title: 'Git Exercises', url: 'https://gitexercises.fracz.com/' }
        ]
      },
      {
        id: 'frontend-frameworks',
        title: 'Frontend Frameworks',
        description: 'Build dynamic user interfaces',
        estimatedTime: '6-8 weeks',
        difficulty: 'Intermediate',
        prerequisites: ['html-css-js', 'responsive-design'],
        subtopics: [
          'React fundamentals',
          'Component-based architecture',
          'State management',
          'Routing',
          'Hooks'
        ],
        resources: [
          { type: 'article', title: 'React Documentation', url: 'https://reactjs.org/docs/getting-started.html' },
          { type: 'video', title: 'React Crash Course', url: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8' },
          { type: 'practice', title: 'React Projects', url: 'https://www.freecodecamp.org/learn/front-end-development-libraries/' }
        ]
      },
      {
        id: 'backend-basics',
        title: 'Backend Basics',
        description: 'Learn server-side development',
        estimatedTime: '4-6 weeks',
        difficulty: 'Intermediate',
        prerequisites: ['version-control'],
        subtopics: [
          'Server-side programming',
          'APIs and REST',
          'Node.js/Express',
          'Authentication',
          'Security basics'
        ],
        resources: [
          { type: 'article', title: 'Express.js Guide', url: 'https://expressjs.com/en/guide/routing.html' },
          { type: 'video', title: 'Node.js Crash Course', url: 'https://www.youtube.com/watch?v=fBNz5xF-Kx4' },
          { type: 'practice', title: 'Backend Projects', url: 'https://www.freecodecamp.org/news/backend-developer-projects/' }
        ]
      }
    ],
    notes: [
      'Focus on building real projects to solidify your knowledge.',
      'Learn the basics of HTTP, REST, and how the web works.',
      'Understand the difference between frontend and backend.',
      'Practice responsive design and accessibility.'
    ],
    videos: [
      { title: 'Web Development Full Course', url: 'https://www.youtube.com/watch?v=UB1O30fR-EE' },
      { title: 'React JS Crash Course', url: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8' },
      { title: 'Node.js & Express.js - Full Course', url: 'https://www.youtube.com/watch?v=Oe421EPjeBE' }
    ]
  }
};

const Roadmap = () => {
  const { showToast } = useToast();
  const { state, actions } = useApp();
  const [selectedTrack, setSelectedTrack] = useState('dsa');
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [activeTab, setActiveTab] = useState('topics');

  const currentTrack = roadmapTracks[selectedTrack];

  const isTopicUnlocked = (topic) => {
    if (topic.prerequisites.length === 0) return true;
    return topic.prerequisites.every(prereq => state.completedTopics.has(prereq));
  };

  const markTopicComplete = (topicId) => {
    if (!state.completedTopics.has(topicId)) {
      actions.completeTopic(topicId);
      actions.updateStats({
        totalPoints: state.stats.totalPoints + 25
      });
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
    const completedCount = currentTrack.topics.filter(topic => state.completedTopics.has(topic.id)).length;
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

        {/* Navigation Tabs */}
        <div className="roadmap-tabs">
          <button
            className={`roadmap-tab${activeTab === 'topics' ? ' active' : ''}`}
            onClick={() => setActiveTab('topics')}
          >
            Topics
          </button>
          <button
            className={`roadmap-tab${activeTab === 'resources' ? ' active' : ''}`}
            onClick={() => setActiveTab('resources')}
          >
            Resources
          </button>
          <button
            className={`roadmap-tab${activeTab === 'notes' ? ' active' : ''}`}
            onClick={() => setActiveTab('notes')}
          >
            Notes
          </button>
          <button
            className={`roadmap-tab${activeTab === 'videos' ? ' active' : ''}`}
            onClick={() => setActiveTab('videos')}
          >
            Videos
          </button>
        </div>

        {/* Content Based on Active Tab */}
        {activeTab === 'topics' && (
          <div className="topics-list">
            {currentTrack.topics.map((topic) => {
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
        )}

        {activeTab === 'resources' && (
          <div className="roadmap-resources">
            <h3>Recommended Resources:</h3>
            <ul>
              {currentTrack.topics.flatMap(topic =>
                topic.resources.map((res, i) => (
                  <li key={`${topic.id}-${i}`}>
                    <a href={res.url} target="_blank" rel="noopener noreferrer">
                      {res.title} ({res.type})
                    </a>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="roadmap-notes">
            <h3>Notes & Tips:</h3>
            <ul>
              {currentTrack.notes.map((note, i) => (
                <li key={i}>{note}</li>
              ))}
            </ul>
            </div>
        )}

        {activeTab === 'videos' && (
          <div className="roadmap-videos">
            <h3>Recommended Videos:</h3>
            <ul>
              {currentTrack.videos.map((vid, i) => (
                <li key={i}>
                  <a href={vid.url} target="_blank" rel="noopener noreferrer">
                    {vid.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

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

export default memo(Roadmap);
