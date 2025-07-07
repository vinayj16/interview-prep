import React, { useState, useEffect, useCallback, memo } from 'react';
import {
  Box, Card, CardContent, Typography, Button, Grid, Chip, Avatar, Skeleton, Alert, IconButton, Tooltip, TextField, Select, MenuItem, InputAdornment
} from '@mui/material';
import { FaStar, FaThumbsUp, FaThumbsDown, FaFilter, FaSearch, FaPlus, FaBuilding, FaCalendarAlt, FaUser, FaTimes } from 'react-icons/fa';
import { useToast } from './Toast/Toast';
import apiService from '../apiService';
import './Reviews.css';

const Reviews = memo(({ user }) => {
  const { showToast } = useToast();
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('lastFetchedReviews');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [companyName, setCompanyName] = useState('');
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [filterCompany, setFilterCompany] = useState('all');
  const [filterRating, setFilterRating] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddReview, setShowAddReview] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch reviews from API
  const fetchReviews = useCallback(async () => {
    if (!companyName.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getReviews(companyName);
      const reviewsList = data?.reviews || data?.data?.reviews || [];
      
      if (reviewsList.length > 0) {
        const processedReviews = reviewsList.map(review => ({
          ...review,
          id: review.id || Math.random().toString(36).substr(2, 9),
          date: review.date || new Date().toISOString().split('T')[0],
          rating: review.rating || 0,
          pros: Array.isArray(review.pros) ? review.pros : [],
          cons: Array.isArray(review.cons) ? review.cons : [],
          tips: Array.isArray(review.tips) ? review.tips : []
        }));
        
        setReviews(processedReviews);
        setFilteredReviews(processedReviews);
        localStorage.setItem('lastFetchedReviews', JSON.stringify(processedReviews));
        localStorage.setItem('lastSearchedCompany', companyName);
      } else {
        setReviews([]);
        setFilteredReviews([]);
        setError('No reviews found for this company.');
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to fetch reviews. Please try again.');
      setReviews([]);
      setFilteredReviews([]);
    } finally {
      setLoading(false);
    }
  }, [companyName]);

  // Handle company name change
  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };

  // Handle fetch button click
  const handleFetchReviews = () => {
    if (companyName.trim()) {
      fetchReviews();
    }
  };

  // Handle clear button click
  const handleClearReviews = () => {
    setCompanyName('');
    setReviews([]);
    setFilteredReviews([]);
    setError(null);
    localStorage.removeItem('lastFetchedReviews');
    localStorage.removeItem('lastSearchedCompany');
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && companyName.trim()) {
      handleFetchReviews();
    }
  };

  // Load last searched company on component mount
  useEffect(() => {
    const lastSearched = localStorage.getItem('lastSearchedCompany');
    if (lastSearched) {
      setCompanyName(lastSearched);
    }
  }, []);

  // Mock reviews data (fallback)
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

  const renderStars = (rating) => (
    <Box display="flex" alignItems="center" gap={0.5}>
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} color={i < rating ? '#f59e0b' : '#e0e0e0'} />
      ))}
    </Box>
  );

  const getDifficultyColor = (difficulty) => {
    switch ((difficulty || '').toLowerCase()) {
      case 'easy': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getExperienceColor = (experience) => {
    switch ((experience || '').toLowerCase()) {
      case 'positive': return '#10b981';
      case 'mixed': return '#f59e0b';
      case 'negative': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 1, sm: 3 } }}>
      <Typography variant="h3" fontWeight={700} align="center" mb={3}>Company Reviews</Typography>
      <Box mb={3} display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} alignItems={{ sm: 'center' }}>
        <TextField
          label="Enter company name"
          value={companyName}
          onChange={handleCompanyNameChange}
          variant="outlined"
          size="small"
          sx={{ minWidth: 220 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaBuilding />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleFetchReviews}
          disabled={!companyName.trim() || loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClearReviews}
          disabled={reviews.length === 0 || loading}
          startIcon={<FaTimes />}
        >
          Clear
        </Button>
        <Button
          variant="text"
          color="info"
          startIcon={<FaFilter />}
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </Box>
      {showFilters && (
        <Box mb={3} display="flex" flexWrap="wrap" gap={2}>
          <Select
            value={filterCompany}
            onChange={(e) => setFilterCompany(e.target.value)}
            size="small"
            sx={{ minWidth: 160 }}
          >
            <MenuItem value="all">All Companies</MenuItem>
            {[...new Set(reviews.map(r => r.company))].map(company => (
              <MenuItem key={company} value={company}>{company}</MenuItem>
            ))}
          </Select>
          <Select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            size="small"
            sx={{ minWidth: 140 }}
          >
            <MenuItem value="all">All Ratings</MenuItem>
            {[5, 4, 3, 2, 1].map(rating => (
              <MenuItem key={rating} value={rating}>{Array(rating).fill('★').join('')}</MenuItem>
            ))}
          </Select>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            size="small"
            sx={{ minWidth: 160 }}
          >
            <MenuItem value="newest">Newest First</MenuItem>
            <MenuItem value="highest">Highest Rated</MenuItem>
            <MenuItem value="lowest">Lowest Rated</MenuItem>
          </Select>
          <TextField
            label="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaSearch />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 220 }}
          />
        </Box>
      )}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {reviews.length > 0 && (
        <Typography color="text.secondary" mb={2}>
          Showing {filteredReviews.length} of {reviews.length} reviews
          {companyName && ` for ${companyName}`}
        </Typography>
      )}
      <Grid container spacing={3}>
        {loading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <Grid item xs={12} md={6} key={idx}>
                <Card elevation={1} sx={{ p: 2 }}>
                  <Skeleton variant="text" width="60%" height={32} />
                  <Skeleton variant="rectangular" width="100%" height={80} sx={{ my: 2 }} />
                  <Skeleton variant="text" width="40%" />
                </Card>
              </Grid>
            ))
          : filteredReviews.length === 0
          ? (
            <Grid item xs={12}>
              <Alert severity="info">No reviews match your current filters. Try adjusting your search criteria.</Alert>
            </Grid>
          )
          : filteredReviews.map(review => (
            <Grid item xs={12} md={6} key={review.id}>
              <Card elevation={2} sx={{ mb: 2 }}>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2} mb={1}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}><FaBuilding /></Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={700}>{review.company}</Typography>
                      <Typography color="text.secondary">{review.position} &bull; {review.location}</Typography>
                    </Box>
                    <Box ml="auto" display="flex" alignItems="center" gap={1}>
                      {renderStars(review.rating)}
                      <Chip label={`${review.rating}/5`} size="small" sx={{ ml: 1 }} />
                    </Box>
                  </Box>
                  <Box display="flex" gap={1} mb={1}>
                    <Chip label={review.difficulty} size="small" sx={{ bgcolor: getDifficultyColor(review.difficulty), color: '#fff' }} />
                    <Chip label={review.experience} size="small" sx={{ bgcolor: getExperienceColor(review.experience), color: '#fff' }} />
                  </Box>
                  <Typography variant="subtitle1" fontWeight={600} mb={1}>{review.title}</Typography>
                  <Typography color="text.secondary" mb={2}>{review.content}</Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={4}>
                      <Typography fontWeight={600} mb={0.5}>✅ Pros</Typography>
                      <ul style={{ margin: 0, paddingLeft: 18 }}>
                        {review.pros.map((pro, idx) => <li key={idx}>{pro}</li>)}
                      </ul>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography fontWeight={600} mb={0.5}>❌ Cons</Typography>
                      <ul style={{ margin: 0, paddingLeft: 18 }}>
                        {review.cons.map((con, idx) => <li key={idx}>{con}</li>)}
                      </ul>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography fontWeight={600} mb={0.5}>💡 Tips</Typography>
                      <ul style={{ margin: 0, paddingLeft: 18 }}>
                        {review.tips.map((tip, idx) => <li key={idx}>{tip}</li>)}
                      </ul>
                    </Grid>
                  </Grid>
                  <Box mt={2}>
                    <Typography fontWeight={600} mb={0.5}>📋 Interview Rounds</Typography>
                    <Grid container spacing={1}>
                      {review.rounds.map((round, idx) => (
                        <Grid item xs={12} sm={6} key={idx}>
                          <Card variant="outlined" sx={{ p: 1, mb: 1 }}>
                            <Typography fontWeight={600}>{round.name} <span style={{ color: '#888', fontWeight: 400 }}>({round.duration})</span></Typography>
                            <Typography color="text.secondary">{round.description}</Typography>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                  <Box mt={2}>
                    <Typography fontWeight={600} mb={0.5}>❓ Sample Questions</Typography>
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                      {review.questions.map((q, idx) => <li key={idx}>{q}</li>)}
                    </ul>
                  </Box>
                  <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar sx={{ width: 28, height: 28, bgcolor: 'secondary.main' }}><FaUser /></Avatar>
                      <Typography>{review.author}</Typography>
                      <FaCalendarAlt style={{ marginLeft: 8, marginRight: 2 }} />
                      <Typography color="text.secondary">{new Date(review.date).toLocaleDateString()}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Tooltip title="Helpful">
                        <IconButton
                          color={review.userVote === 'helpful' ? 'success' : 'default'}
                          onClick={() => handleVote(review.id, 'helpful')}
                          aria-label="Mark as helpful"
                        >
                          <FaThumbsUp />
                          <Typography ml={0.5}>{review.helpful}</Typography>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Not Helpful">
                        <IconButton
                          color={review.userVote === 'notHelpful' ? 'error' : 'default'}
                          onClick={() => handleVote(review.id, 'notHelpful')}
                          aria-label="Mark as not helpful"
                        >
                          <FaThumbsDown />
                          <Typography ml={0.5}>{review.notHelpful}</Typography>
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
});

export default Reviews;