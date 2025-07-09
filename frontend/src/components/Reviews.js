<<<<<<< HEAD
import React, { useState, useEffect, memo } from 'react';
import { FaStar, FaThumbsUp, FaThumbsDown, FaFilter, FaSearch, FaPlus, FaBuilding, FaCalendarAlt, FaUser, FaTrash } from 'react-icons/fa';
import { useToast } from './Toast/Toast';
import { useApp } from '../context/AppContext';
import apiService from '../services/apiService';
=======
import React, { useState, useEffect } from 'react';
import { FaStar, FaThumbsUp, FaThumbsDown, FaFilter, FaSearch, FaPlus, FaBuilding, FaCalendarAlt, FaUser } from 'react-icons/fa';
import { useToast } from './Toast/Toast';
import { useApp } from '../context/AppContext';
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
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
<<<<<<< HEAD
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [localReviews, setLocalReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('lastFetchedReviews');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
=======
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434

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
<<<<<<< HEAD
    }
  ];

  const companies = ['Google', 'Amazon', 'Microsoft', 'Facebook', 'Apple', 'Netflix', 'Uber', 'Airbnb', 'all'];

  useEffect(() => {
    setReviews([...mockReviews, ...(localReviews || [])]);
  }, [localReviews]);
=======
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
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434

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
<<<<<<< HEAD
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
=======
      filtered = filtered.filter(review =>
        review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.position.toLowerCase().includes(searchTerm.toLowerCase())
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
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
<<<<<<< HEAD
          return (b.helpful || 0) - (a.helpful || 0);
=======
          return b.helpful - a.helpful;
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
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
<<<<<<< HEAD

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
=======
        
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
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
          newReview.userVote = 'notHelpful';
        } else {
          newReview.userVote = null;
        }
<<<<<<< HEAD

=======
        
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
        return newReview;
      }
      return review;
    }));
<<<<<<< HEAD

=======
    
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
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
<<<<<<< HEAD
    switch (difficulty?.toLowerCase()) {
=======
    switch (difficulty.toLowerCase()) {
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
      case 'easy': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getExperienceColor = (experience) => {
<<<<<<< HEAD
    switch (experience?.toLowerCase()) {
=======
    switch (experience.toLowerCase()) {
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
      case 'positive': return '#10b981';
      case 'mixed': return '#f59e0b';
      case 'negative': return '#ef4444';
      default: return '#6b7280';
    }
  };

<<<<<<< HEAD
  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };

  const handleFetchReviews = async () => {
    if (!companyName.trim()) {
      setError('Please enter a company name');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getReviews(companyName);
      // Support both { reviews: [...] } and { data: { reviews: [...] } }
      const reviewsList = data?.reviews || data?.data?.reviews || [];

      if (reviewsList.length > 0) {
        // Add IDs to API reviews to distinguish them from mock reviews
        const reviewsWithIds = reviewsList.map((review, index) => ({
          ...review,
          id: `api-${Date.now()}-${index}`,
          helpful: review.helpful || 0,
          notHelpful: review.notHelpful || 0,
          userVote: null
        }));

        setLocalReviews(reviewsWithIds);
        localStorage.setItem('lastFetchedReviews', JSON.stringify(reviewsWithIds));
        showToast(`Found ${reviewsWithIds.length} reviews for ${companyName}`, 'success');
      } else {
        setLocalReviews([]);
        localStorage.removeItem('lastFetchedReviews');
        setError('No reviews found for this company');
      }
    } catch (error) {
      setError('Error fetching reviews. Please try again.');
      setLocalReviews(null);
      localStorage.removeItem('lastFetchedReviews');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFetchReviews();
    }
  };

  const handleClearReviews = () => {
    setLocalReviews(null);
    setError(null);
    localStorage.removeItem('lastFetchedReviews');
    showToast('Local reviews cleared', 'info');
  };

  const handleDeleteReview = (reviewId) => {
    setReviews(prev => prev.filter(review => review.id !== reviewId));
    setLocalReviews(prev => {
      const updated = prev?.filter(review => review.id !== reviewId) || [];
      if (updated.length > 0) {
        localStorage.setItem('lastFetchedReviews', JSON.stringify(updated));
      } else {
        localStorage.removeItem('lastFetchedReviews');
      }
      return updated;
    });
    showToast('Review deleted', 'success');
  };

=======
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
  return (
    <div className="reviews-page">
      <div className="container">
        <div className="reviews-header">
          <h1>Interview Reviews</h1>
          <p>Real interview experiences from the community</p>
<<<<<<< HEAD

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
                  onClick={handleFetchReviews}
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
=======
          
          <div className="header-actions">
            <button 
              className="btn btn-secondary"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter /> Filters
            </button>
            <button 
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
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
<<<<<<< HEAD
                <label htmlFor="search">Search:</label>
                <div className="search-box">
                  <FaSearch />
                  <input
                    id="search"
=======
                <label>Search:</label>
                <div className="search-box">
                  <FaSearch />
                  <input
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
                    type="text"
                    placeholder="Search reviews..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
<<<<<<< HEAD

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
=======
              
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
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
                </select>
              </div>

              <div className="filter-group">
<<<<<<< HEAD
                <label htmlFor="rating">Min Rating:</label>
                <select
                  id="rating"
                  value={filterRating}
                  onChange={(e) => setFilterRating(e.target.value)}
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
=======
                <label>Min Rating:</label>
                <select 
                  value={filterRating} 
                  onChange={(e) => setFilterRating(e.target.value)}
                >
                  <option value="all">All Ratings</option>
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                  <option value="2">2+ Stars</option>
                  <option value="1">1+ Stars</option>
                </select>
              </div>

              <div className="filter-group">
<<<<<<< HEAD
                <label htmlFor="sort">Sort by:</label>
                <select
                  id="sort"
                  value={sortBy}
=======
                <label>Sort by:</label>
                <select 
                  value={sortBy} 
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
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

<<<<<<< HEAD
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

=======
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
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
<<<<<<< HEAD
                    <h3>{review.position || 'Not specified'}</h3>
                    {review.location && <p className="location">{review.location}</p>}
                  </div>

=======
                    <h3>{review.position}</h3>
                    <p className="location">{review.location}</p>
                  </div>
                  
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
                  <div className="review-meta">
                    <div className="rating">
                      {renderStars(review.rating)}
                      <span className="rating-number">{review.rating}/5</span>
                    </div>
                    <div className="badges">
<<<<<<< HEAD
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
=======
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
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
                    </div>
                  </div>
                </div>

                <div className="review-content">
                  <h4>{review.title}</h4>
                  <p className="review-text">{review.content}</p>
<<<<<<< HEAD

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
=======
                  
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
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
                </div>

                <div className="review-footer">
                  <div className="author-info">
                    <FaUser />
<<<<<<< HEAD
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
=======
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
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

<<<<<<< HEAD
        {/* Add Review Modal */}
=======
        {/* Add Review Modal Placeholder */}
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
        {showAddReview && (
          <div className="modal-overlay" onClick={() => setShowAddReview(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Add Interview Review</h3>
                <button className="close-btn" onClick={() => setShowAddReview(false)}>×</button>
              </div>
              <div className="modal-body">
<<<<<<< HEAD
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
=======
                <p>Review submission form would go here...</p>
                <p>This feature will be implemented in a future update.</p>
                <button className="btn btn-primary" onClick={() => setShowAddReview(false)}>
                  Close
                </button>
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default memo(Reviews);
=======
export default Reviews;
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
