import React, { useState, useEffect } from 'react';
import { FaStar, FaThumbsUp, FaThumbsDown, FaFilter, FaSearch, FaPlus, FaBuilding, FaCalendarAlt, FaUser } from 'react-icons/fa';
import { useToast } from './Toast/Toast';
import { useApp } from '../context/AppContext';
import './Reviews.css';

const Reviews = () => {
  const { showToast } = useToast();
  const { state } = useApp();
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [filterCompany, setFilterCompany] = useState('all');
  const [filterRating, setFilterRating] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddReview, setShowAddReview] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      company: 'Google',
      position: 'Software Engineer',
      location: 'Mountain View, CA',
      date: '2024-01-15',
      rating: 5,
      difficulty: 'Hard',
      experience: 'Positive',
      author: 'Anonymous',
      title: 'Great interview experience with challenging technical questions',
      content: 'The interview process was well-structured with 4 rounds: phone screen, technical coding, system design, and behavioral. The interviewers were friendly and provided hints when needed. Questions focused on algorithms, data structures, and system design. Overall, a fair and comprehensive process.',
      pros: [
        'Well-structured process',
        'Friendly interviewers',
        'Fair technical questions',
        'Good work-life balance discussion'
      ],
      cons: [
        'Long process (4-5 weeks)',
        'High expectations',
        'Competitive environment'
      ],
      tips: [
        'Practice system design extensively',
        'Be ready for follow-up questions',
        'Prepare behavioral examples using STAR method'
      ],
      rounds: [
        { name: 'Phone Screen', duration: '45 min', description: 'Basic coding and background discussion' },
        { name: 'Technical Interview', duration: '60 min', description: 'Algorithm and data structure problems' },
        { name: 'System Design', duration: '60 min', description: 'Design a scalable system' },
        { name: 'Behavioral', duration: '45 min', description: 'Culture fit and past experiences' }
      ],
      questions: [
        'Implement LRU Cache',
        'Design a URL shortener',
        'Tell me about a challenging project'
      ],
      helpful: 24,
      notHelpful: 2,
      userVote: null
    },
    {
      id: 2,
      company: 'Amazon',
      position: 'SDE II',
      location: 'Seattle, WA',
      date: '2024-01-10',
      rating: 4,
      difficulty: 'Medium',
      experience: 'Positive',
      author: 'TechEnthusiast',
      title: 'Leadership principles focused interview',
      content: 'Amazon\'s interview heavily focuses on their leadership principles. Each round had behavioral questions tied to these principles. Technical questions were moderate in difficulty but required optimal solutions. The bar raiser round was particularly challenging.',
      pros: [
        'Clear expectations',
        'Diverse interview panel',
        'Good compensation package',
        'Growth opportunities'
      ],
      cons: [
        'Heavy focus on behavioral',
        'Long working hours culture',
        'High pressure environment'
      ],
      tips: [
        'Memorize leadership principles',
        'Prepare STAR stories for each principle',
        'Practice coding under time pressure'
      ],
      rounds: [
        { name: 'Phone Screen', duration: '60 min', description: 'Coding and LP questions' },
        { name: 'Onsite Round 1', duration: '60 min', description: 'Coding + LP' },
        { name: 'Onsite Round 2', duration: '60 min', description: 'System Design + LP' },
        { name: 'Bar Raiser', duration: '60 min', description: 'Behavioral + Technical' }
      ],
      questions: [
        'Two Sum variations',
        'Design a recommendation system',
        'Tell me about a time you disagreed with your manager'
      ],
      helpful: 18,
      notHelpful: 1,
      userVote: null
    },
    {
      id: 3,
      company: 'Microsoft',
      position: 'Software Engineer',
      location: 'Redmond, WA',
      date: '2024-01-05',
      rating: 4,
      difficulty: 'Medium',
      experience: 'Positive',
      author: 'CodeMaster',
      title: 'Collaborative and friendly interview process',
      content: 'Microsoft\'s interview was more collaborative compared to other companies. Interviewers were encouraging and helped when I was stuck. The questions were practical and related to real-world scenarios. Great company culture discussion.',
      pros: [
        'Collaborative atmosphere',
        'Practical questions',
        'Supportive interviewers',
        'Good work-life balance'
      ],
      cons: [
        'Lower compensation than FAANG',
        'Slower decision process',
        'Less challenging technically'
      ],
      tips: [
        'Focus on problem-solving approach',
        'Be ready to discuss trade-offs',
        'Show enthusiasm for Microsoft products'
      ],
      rounds: [
        { name: 'Phone Screen', duration: '45 min', description: 'Coding and background' },
        { name: 'Virtual Onsite 1', duration: '60 min', description: 'Coding interview' },
        { name: 'Virtual Onsite 2', duration: '60 min', description: 'System design' },
        { name: 'Virtual Onsite 3', duration: '45 min', description: 'Behavioral' }
      ],
      questions: [
        'Merge intervals',
        'Design a chat application',
        'Why Microsoft?'
      ],
      helpful: 15,
      notHelpful: 0,
      userVote: null
    },
    {
      id: 4,
      company: 'Facebook',
      position: 'Frontend Engineer',
      location: 'Menlo Park, CA',
      date: '2023-12-28',
      rating: 3,
      difficulty: 'Hard',
      experience: 'Mixed',
      author: 'ReactDev',
      title: 'Intense technical screening with React focus',
      content: 'The interview was heavily focused on React and frontend technologies. Had to implement complex UI components and optimize performance. The system design round was about frontend architecture. Interviewers were knowledgeable but seemed rushed.',
      pros: [
        'Cutting-edge technology',
        'Smart colleagues',
        'Good learning opportunities',
        'Competitive salary'
      ],
      cons: [
        'High stress environment',
        'Work-life balance issues',
        'Intense interview process',
        'Limited feedback'
      ],
      tips: [
        'Master React hooks and patterns',
        'Understand browser performance',
        'Practice frontend system design'
      ],
      rounds: [
        { name: 'Recruiter Call', duration: '30 min', description: 'Background and role discussion' },
        { name: 'Technical Screen', duration: '45 min', description: 'React coding challenge' },
        { name: 'Onsite Coding 1', duration: '45 min', description: 'Algorithm problem' },
        { name: 'Onsite Coding 2', duration: '45 min', description: 'Frontend implementation' },
        { name: 'System Design', duration: '45 min', description: 'Frontend architecture' },
        { name: 'Behavioral', duration: '30 min', description: 'Culture fit' }
      ],
      questions: [
        'Implement a React component with hooks',
        'Design Facebook news feed frontend',
        'Optimize rendering performance'
      ],
      helpful: 12,
      notHelpful: 3,
      userVote: null
    },
    {
      id: 5,
      company: 'Apple',
      position: 'iOS Developer',
      location: 'Cupertino, CA',
      date: '2023-12-20',
      rating: 5,
      difficulty: 'Hard',
      experience: 'Positive',
      author: 'iOSDeveloper',
      title: 'Thorough iOS development interview',
      content: 'Apple\'s interview was comprehensive, covering iOS development, Swift, and system design. They care about attention to detail and user experience. The team was passionate about creating great products. Challenging but fair process.',
      pros: [
        'Product-focused culture',
        'Attention to detail',
        'Innovative projects',
        'Great benefits'
      ],
      cons: [
        'Very high standards',
        'Secretive environment',
        'Limited remote work',
        'Intense competition'
      ],
      tips: [
        'Master iOS fundamentals',
        'Understand Apple design principles',
        'Show passion for Apple products'
      ],
      rounds: [
        { name: 'Phone Screen', duration: '60 min', description: 'iOS technical questions' },
        { name: 'Take-home Project', duration: '3 days', description: 'Build a small iOS app' },
        { name: 'Onsite Technical', duration: '60 min', description: 'Code review and extension' },
        { name: 'System Design', duration: '60 min', description: 'iOS app architecture' },
        { name: 'Behavioral', duration: '45 min', description: 'Team fit and values' }
      ],
      questions: [
        'Implement custom UIView',
        'Design iOS app architecture',
        'Memory management in iOS'
      ],
      helpful: 20,
      notHelpful: 1,
      userVote: null
    }
  ];

  const companies = ['Google', 'Amazon', 'Microsoft', 'Facebook', 'Apple', 'Netflix', 'Uber', 'Airbnb'];

  useEffect(() => {
    setReviews(mockReviews);
    setFilteredReviews(mockReviews);
  }, []);

  useEffect(() => {
    filterAndSortReviews();
  }, [reviews, filterCompany, filterRating, searchTerm, sortBy]);

  const filterAndSortReviews = () => {
    let filtered = [...reviews];

    // Apply filters
    if (filterCompany !== 'all') {
      filtered = filtered.filter(review => review.company === filterCompany);
    }

    if (filterRating !== 'all') {
      filtered = filtered.filter(review => review.rating >= parseInt(filterRating));
    }

    if (searchTerm) {
      filtered = filtered.filter(review =>
        review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'rating-high':
          return b.rating - a.rating;
        case 'rating-low':
          return a.rating - b.rating;
        case 'helpful':
          return b.helpful - a.helpful;
        default:
          return 0;
      }
    });

    setFilteredReviews(filtered);
  };

  const handleVote = (reviewId, voteType) => {
    setReviews(prev => prev.map(review => {
      if (review.id === reviewId) {
        const newReview = { ...review };
        
        // Remove previous vote if exists
        if (review.userVote === 'helpful') {
          newReview.helpful--;
        } else if (review.userVote === 'notHelpful') {
          newReview.notHelpful--;
        }
        
        // Add new vote
        if (voteType === 'helpful' && review.userVote !== 'helpful') {
          newReview.helpful++;
          newReview.userVote = 'helpful';
        } else if (voteType === 'notHelpful' && review.userVote !== 'notHelpful') {
          newReview.notHelpful++;
          newReview.userVote = 'notHelpful';
        } else {
          newReview.userVote = null;
        }
        
        return newReview;
      }
      return review;
    }));
    
    showToast('Vote recorded!', 'success');
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={i < rating ? 'star filled' : 'star'}
      />
    ));
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getExperienceColor = (experience) => {
    switch (experience.toLowerCase()) {
      case 'positive': return '#10b981';
      case 'mixed': return '#f59e0b';
      case 'negative': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="reviews-page">
      <div className="container">
        <div className="reviews-header">
          <h1>Interview Reviews</h1>
          <p>Real interview experiences from the community</p>
          
          <div className="header-actions">
            <button 
              className="btn btn-secondary"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter /> Filters
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => setShowAddReview(true)}
            >
              <FaPlus /> Add Review
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="filters-section">
            <div className="filters-grid">
              <div className="filter-group">
                <label>Search:</label>
                <div className="search-box">
                  <FaSearch />
                  <input
                    type="text"
                    placeholder="Search reviews..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="filter-group">
                <label>Company:</label>
                <select 
                  value={filterCompany} 
                  onChange={(e) => setFilterCompany(e.target.value)}
                >
                  <option value="all">All Companies</option>
                  {companies.map(company => (
                    <option key={company} value={company}>{company}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Min Rating:</label>
                <select 
                  value={filterRating} 
                  onChange={(e) => setFilterRating(e.target.value)}
                >
                  <option value="all">All Ratings</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                  <option value="2">2+ Stars</option>
                  <option value="1">1+ Stars</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Sort by:</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="rating-high">Highest Rating</option>
                  <option value="rating-low">Lowest Rating</option>
                  <option value="helpful">Most Helpful</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Reviews List */}
        <div className="reviews-list">
          {filteredReviews.length === 0 ? (
            <div className="no-reviews">
              <h3>No reviews found</h3>
              <p>Try adjusting your filters or be the first to add a review!</p>
            </div>
          ) : (
            filteredReviews.map(review => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div className="company-info">
                    <div className="company-badge">
                      <FaBuilding />
                      <span>{review.company}</span>
                    </div>
                    <h3>{review.position}</h3>
                    <p className="location">{review.location}</p>
                  </div>
                  
                  <div className="review-meta">
                    <div className="rating">
                      {renderStars(review.rating)}
                      <span className="rating-number">{review.rating}/5</span>
                    </div>
                    <div className="badges">
                      <span 
                        className="difficulty-badge"
                        style={{ backgroundColor: getDifficultyColor(review.difficulty) }}
                      >
                        {review.difficulty}
                      </span>
                      <span 
                        className="experience-badge"
                        style={{ backgroundColor: getExperienceColor(review.experience) }}
                      >
                        {review.experience}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="review-content">
                  <h4>{review.title}</h4>
                  <p className="review-text">{review.content}</p>
                  
                  <div className="review-details">
                    <div className="detail-section">
                      <h5>✅ Pros</h5>
                      <ul>
                        {review.pros.map((pro, index) => (
                          <li key={index}>{pro}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="detail-section">
                      <h5>❌ Cons</h5>
                      <ul>
                        {review.cons.map((con, index) => (
                          <li key={index}>{con}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="detail-section">
                      <h5>💡 Tips</h5>
                      <ul>
                        {review.tips.map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="interview-rounds">
                    <h5>📋 Interview Rounds</h5>
                    <div className="rounds-list">
                      {review.rounds.map((round, index) => (
                        <div key={index} className="round-item">
                          <div className="round-header">
                            <strong>{round.name}</strong>
                            <span className="duration">{round.duration}</span>
                          </div>
                          <p>{round.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="sample-questions">
                    <h5>❓ Sample Questions</h5>
                    <ul>
                      {review.questions.map((question, index) => (
                        <li key={index}>{question}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="review-footer">
                  <div className="author-info">
                    <FaUser />
                    <span>{review.author}</span>
                    <FaCalendarAlt />
                    <span>{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="review-actions">
                    <button 
                      className={`vote-btn ${review.userVote === 'helpful' ? 'active' : ''}`}
                      onClick={() => handleVote(review.id, 'helpful')}
                    >
                      <FaThumbsUp />
                      <span>{review.helpful}</span>
                    </button>
                    <button 
                      className={`vote-btn ${review.userVote === 'notHelpful' ? 'active' : ''}`}
                      onClick={() => handleVote(review.id, 'notHelpful')}
                    >
                      <FaThumbsDown />
                      <span>{review.notHelpful}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Review Modal Placeholder */}
        {showAddReview && (
          <div className="modal-overlay" onClick={() => setShowAddReview(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Add Interview Review</h3>
                <button className="close-btn" onClick={() => setShowAddReview(false)}>×</button>
              </div>
              <div className="modal-body">
                <p>Review submission form would go here...</p>
                <p>This feature will be implemented in a future update.</p>
                <button className="btn btn-primary" onClick={() => setShowAddReview(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;