import React, { useState, useEffect, memo } from 'react';
import { FaStar, FaThumbsUp, FaThumbsDown, FaFilter, FaSearch, FaPlus, FaBuilding, FaCalendarAlt, FaUser, FaTrash } from 'react-icons/fa';
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
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [localReviews, setLocalReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('interviewReviews');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading reviews from localStorage:', error);
      return [];
    }
  });

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
    }
  ];

  const companies = ['Google', 'Amazon', 'Microsoft', 'Facebook', 'Apple', 'Netflix', 'Uber', 'Airbnb', 'all'];

  useEffect(() => {
    setReviews([...mockReviews, ...(localReviews || [])]);
  }, [localReviews]);

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
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(review =>
        review.title.toLowerCase().includes(searchLower) ||
        review.content.toLowerCase().includes(searchLower) ||
        review.company.toLowerCase().includes(searchLower) ||
        review.position.toLowerCase().includes(searchLower) ||
        (review.author && review.author.toLowerCase().includes(searchLower)) ||
        (review.pros && review.pros.some(pro => pro.toLowerCase().includes(searchLower))) ||
        (review.cons && review.cons.some(con => con.toLowerCase().includes(searchLower))) ||
        (review.tips && review.tips.some(tip => tip.toLowerCase().includes(searchLower))) ||
        (review.questions && review.questions.some(question => question.toLowerCase().includes(searchLower)))
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
          return (b.helpful || 0) - (a.helpful || 0);
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
          newReview.helpful = (newReview.helpful || 1) - 1;
        } else if (review.userVote === 'notHelpful') {
          newReview.notHelpful = (newReview.notHelpful || 1) - 1;
        }

        // Add new vote
        if (voteType === 'helpful' && review.userVote !== 'helpful') {
          newReview.helpful = (newReview.helpful || 0) + 1;
          newReview.userVote = 'helpful';
        } else if (voteType === 'notHelpful' && review.userVote !== 'notHelpful') {
          newReview.notHelpful = (newReview.notHelpful || 0) + 1;
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
    if (!difficulty) return '#6b7280';
    switch (difficulty.toLowerCase()) {
      case 'easy': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getExperienceColor = (experience) => {
    if (!experience) return '#6b7280';
    switch (experience.toLowerCase()) {
      case 'positive': return '#10b981';
      case 'mixed': return '#f59e0b';
      case 'negative': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };

  // Remove handleFetchReviews and related API logic
  // All reviews are handled via mockReviews and localReviews/localStorage
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // handleFetchReviews(); // This line is removed
    }
  };

  const handleClearReviews = () => {
    setLocalReviews(null);
    setError(null);
    localStorage.removeItem('interviewReviews');
    showToast('Local reviews cleared', 'info');
  };

  const handleDeleteReview = (reviewId) => {
    setReviews(prev => prev.filter(review => review.id !== reviewId));
    setLocalReviews(prev => {
      const updated = prev?.filter(review => review.id !== reviewId) || [];
      if (updated.length > 0) {
        localStorage.setItem('interviewReviews', JSON.stringify(updated));
      } else {
        localStorage.removeItem('interviewReviews');
      }
      return updated;
    });
    showToast('Review deleted', 'success');
  };

  return (
    <div className="reviews-page">
      <div className="container">
        <div className="reviews-header">
          <h1>Interview Reviews</h1>
          <p>Real interview experiences from the community</p>

          <div className="fetch-reviews-section">
            <div className="reviews-input-group">
              <label htmlFor="reviews-company-input">Enter company name to fetch more reviews</label>
        <input
                id="reviews-company-input"
          type="text"
                placeholder="Enter company name to fetch more reviews"
          value={companyName}
          onChange={handleCompanyNameChange}
          onKeyPress={handleKeyPress}
          className="company-name-input"
        />
              <div className="reviews-btn-row">
                <button
                  className="fetch-reviews-button"
                  onClick={() => {
                    // This button is now purely for demonstration/local use
                    // In a real app, you'd call an API here
                    showToast('Fetching reviews (using mock data)', 'info');
                    setLocalReviews(mockReviews);
                    localStorage.setItem('interviewReviews', JSON.stringify(mockReviews));
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner"></span> Fetching...
                    </>
                  ) : 'Fetch Reviews'}
                </button>
                <button
                  className="clear-reviews-btn"
                  onClick={handleClearReviews}
                  title="Clear fetched reviews"
                >
                  <FaTrash />
        </button>
              </div>
      </div>
      {error && <p className="error-message">{error}</p>}
          </div>

          <div className="header-actions">
            <button
              className="btn btn-secondary"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
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
                <label htmlFor="search">Search:</label>
                <div className="search-box">
                  <FaSearch />
                  <input
                    id="search"
                    type="text"
                    placeholder="Search reviews..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="filter-group">
                <label htmlFor="company">Company:</label>
                <select
                  id="company"
                  value={filterCompany}
                  onChange={(e) => setFilterCompany(e.target.value)}
                >
                  <option value="all">All Companies</option>
                  {[...new Set([...companies, ...reviews.map(r => r.company)])]
                    .filter(c => c !== 'all')
                    .sort()
                    .map(company => (
                      <option key={company} value={company}>{company}</option>
                    ))}
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="rating">Min Rating:</label>
                <select
                  id="rating"
                  value={filterRating}
                  onChange={(e) => setFilterRating(e.target.value)}
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                  <option value="2">2+ Stars</option>
                  <option value="1">1+ Stars</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="sort">Sort by:</label>
                <select
                  id="sort"
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

        {/* Summary Stats */}
        {filteredReviews.length > 0 && (
          <div className="reviews-summary">
            <p>
              Showing {filteredReviews.length} of {reviews.length} reviews
              {filterCompany !== 'all' && ` for ${filterCompany}`}
              {filterRating !== 'all' && ` with ${filterRating}+ stars`}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
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
                    <h3>{review.position || 'Not specified'}</h3>
                    {review.location && <p className="location">{review.location}</p>}
                  </div>

                  <div className="review-meta">
                    <div className="rating">
                      {renderStars(review.rating)}
                      <span className="rating-number">{review.rating}/5</span>
                    </div>
                    <div className="badges">
                      {review.difficulty && (
                        <span
                          className="difficulty-badge"
                          style={{ backgroundColor: getDifficultyColor(review.difficulty) }}
                        >
                          {review.difficulty}
                        </span>
                      )}
                      {review.experience && (
                        <span
                          className="experience-badge"
                          style={{ backgroundColor: getExperienceColor(review.experience) }}
                        >
                          {review.experience}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="review-content">
                  <h4>{review.title}</h4>
                  <p className="review-text">{review.content}</p>

                  {(review.pros || review.cons || review.tips) && (
                    <div className="review-details">
                      {review.pros && review.pros.length > 0 && (
                        <div className="detail-section">
                          <h5>✅ Pros</h5>
                          <ul>
                            {review.pros.map((pro, index) => (
                              <li key={index}>{pro}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {review.cons && review.cons.length > 0 && (
                        <div className="detail-section">
                          <h5>❌ Cons</h5>
                          <ul>
                            {review.cons.map((con, index) => (
                              <li key={index}>{con}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {review.tips && review.tips.length > 0 && (
                        <div className="detail-section">
                          <h5>💡 Tips</h5>
                          <ul>
                            {review.tips.map((tip, index) => (
                              <li key={index}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {review.rounds && review.rounds.length > 0 && (
                    <div className="interview-rounds">
                      <h5>📋 Interview Rounds</h5>
                      <div className="rounds-list">
                        {review.rounds.map((round, index) => (
                          <div key={index} className="round-item">
                            <div className="round-header">
                              <strong>{round.name}</strong>
                              {round.duration && <span className="duration">{round.duration}</span>}
                            </div>
                            {round.description && <p>{round.description}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {review.questions && review.questions.length > 0 && (
                    <div className="sample-questions">
                      <h5>❓ Sample Questions</h5>
                      <ul>
                        {review.questions.map((question, index) => (
                          <li key={index}>{question}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="review-footer">
                  <div className="author-info">
                    <FaUser />
                    <span>{review.author || 'Anonymous'}</span>
                    {review.date && (
                      <>
                        <FaCalendarAlt />
                        <span>{new Date(review.date).toLocaleDateString()}</span>
                      </>
                    )}
                  </div>

                  <div className="review-actions">
                    <button
                      className={`vote-btn ${review.userVote === 'helpful' ? 'active' : ''}`}
                      onClick={() => handleVote(review.id, 'helpful')}
                      title="Helpful"
                    >
                      <FaThumbsUp />
                      <span>{review.helpful || 0}</span>
                    </button>
                    <button
                      className={`vote-btn ${review.userVote === 'notHelpful' ? 'active' : ''}`}
                      onClick={() => handleVote(review.id, 'notHelpful')}
                      title="Not helpful"
                    >
                      <FaThumbsDown />
                      <span>{review.notHelpful || 0}</span>
                    </button>
                    {review.id.toString().startsWith('api-') && (
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteReview(review.id)}
                        title="Delete review"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Review Modal */}
        {showAddReview && (
          <div className="modal-overlay" onClick={() => setShowAddReview(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Add Interview Review</h3>
                <button className="close-btn" onClick={() => setShowAddReview(false)}>×</button>
              </div>
              <div className="modal-body">
                <form className="review-form">
                  <div className="form-group">
                    <label htmlFor="company">Company *</label>
                    <input
                      type="text"
                      id="company"
                      required
                      placeholder="Company name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="position">Position *</label>
                    <input
                      type="text"
                      id="position"
                      required
                      placeholder="Job position"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                      type="text"
                      id="location"
                      placeholder="City, Country"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="rating">Rating *</label>
                    <div className="star-rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar key={star} className="star" />
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="difficulty">Difficulty *</label>
                    <select id="difficulty" required>
                      <option value="">Select difficulty</option>
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="experience">Experience *</label>
                    <select id="experience" required>
                      <option value="">Select experience</option>
                      <option value="Positive">Positive</option>
                      <option value="Mixed">Mixed</option>
                      <option value="Negative">Negative</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="title">Review Title *</label>
                    <input
                      type="text"
                      id="title"
                      required
                      placeholder="Short summary of your experience"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="content">Review Content *</label>
                    <textarea
                      id="content"
                      required
                      rows="5"
                      placeholder="Describe your interview experience in detail"
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label>Pros</label>
                    <div className="pros-cons-container">
                      <input type="text" placeholder="Add a pro" />
                      <button type="button" className="btn btn-secondary">Add</button>
                    </div>
                    <ul className="pros-list"></ul>
                  </div>

                  <div className="form-group">
                    <label>Cons</label>
                    <div className="pros-cons-container">
                      <input type="text" placeholder="Add a con" />
                      <button type="button" className="btn btn-secondary">Add</button>
                    </div>
                    <ul className="cons-list"></ul>
                  </div>

                  <div className="form-group">
                    <label>Tips</label>
                    <div className="pros-cons-container">
                      <input type="text" placeholder="Add a tip" />
                      <button type="button" className="btn btn-secondary">Add</button>
                    </div>
                    <ul className="tips-list"></ul>
                  </div>

                  <div className="form-actions">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowAddReview(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
            </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default memo(Reviews);
