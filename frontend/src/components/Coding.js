import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  FaPlay,
  FaLightbulb,
  FaBookmark,
  FaRegBookmark,
  FaFilter,
  FaSearch,
  FaCheck,
  FaTimes,
  FaSpinner,
  FaPencilAlt,
  FaFont,
  FaShapes,
  FaCalendar,
  FaRegChartBar,
  FaDrawPolygon,
  FaMicrophone,
  FaRegStickyNote,
  FaRegClock,
  FaCode,
  FaShareAlt,
  FaRegFileCode,
  FaRegCommentAlt,
  FaTools,
  FaRegFileAlt,
  FaRobot,
  FaBuilding,
  FaStar,
  FaThumbsDown,
  FaRegCommentDots,
  FaEye,
  FaBrain,
  FaUsers,
  FaCalendarCheck,
  FaCalendarDay,
  FaCalendarTimes,
  FaCalendarWeek,
  FaCalendarPlus,
  FaCalendarMinus,
  FaExchangeAlt
} from 'react-icons/fa';
import { useToast } from './Toast/Toast';
import { useApp } from '../context/AppContext';
import { useApi } from '../hooks/useApi';
import apiService from '../services/apiService';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';
import './Coding.css';
import confetti from 'canvas-confetti';

// Enhanced problem data structure
const problemsData = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Arrays",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]", explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]." }
    ],
    companies: ["Google", "Amazon", "Microsoft"],
    tags: ["Array", "Hash Table"],
    solution: {
      JavaScript: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      Python: `def twoSum(nums, target):
  seen = {}
  for i, num in enumerate(nums):
    complement = target - num
    if complement in seen:
      return [seen[complement], i]
    seen[num] = i
  return []`,
      Java: `class Solution {
  public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
      int complement = target - nums[i];
      if (map.containsKey(complement)) {
        return new int[] { map.get(complement), i };
      }
      map.put(nums[i], i);
    }
    return new int[0];
  }
}`
    },
    hints: [
      "Think about using a hash map to store previously seen numbers",
      "For each number, check if its complement exists in the hash map",
      "The complement is target - current number"
    ],
    testCases: [
      { input: { nums: [2,7,11,15], target: 9 }, expected: [0,1] },
      { input: { nums: [3,2,4], target: 6 }, expected: [1,2] },
      { input: { nums: [3,3], target: 6 }, expected: [0,1] }
    ],
    stats: {
    acceptanceRate: 85,
    avgTime: 15,
    likes: 1250,
    dislikes: 45,
      solutions: 2340
    },
    dailyChallenge: false,
    premium: false,
    relatedProblems: [15, 167, 170],
    confidenceScore: null,
    userRating: null,
    peerReviews: []
  }
];

// Enhanced user progress tracking
const getUser = () => JSON.parse(localStorage.getItem('user'));
const getBookmarksKey = () => {
  const user = getUser();
  return user ? `codingBookmarks_${user.email}` : 'codingBookmarks_guest';
};
const getBookmarkedProblems = () => {
  const key = getBookmarksKey();
  return JSON.parse(localStorage.getItem(key) || '[]');
};

// Core Coding component with essential features
const Coding = () => {
  // Hooks
  const { showToast } = useToast();
  const { state } = useApp();
  const { loading, execute } = useApi();

  // Problem state
  const [problems, setProblems] = useState(problemsData);
  const [filteredProblems, setFilteredProblems] = useState(problemsData);
  const [selectedProblem, setSelectedProblem] = useState(problemsData[0]);

  // Code editor state
  const [code, setCode] = useState(problemsData[0]?.solution?.JavaScript || '');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  
  // UI state
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showTestCases, setShowTestCases] = useState(false);
  const [hints, setHints] = useState(problemsData[0]?.hints || []);
  const [testCaseResults, setTestCaseResults] = useState([]);

  // Filter state
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterTopic, setFilterTopic] = useState('all');
  const [filterCompany, setFilterCompany] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // User progress
  const [bookmarkedProblems, setBookmarkedProblems] = useState(getBookmarkedProblems());

  // AI Search state
  const [companyInput, setCompanyInput] = useState('');
  const [jobDescInput, setJobDescInput] = useState('');
  const [fetchedQuestions, setFetchedQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [aiMessages, setAiMessages] = useState([]);
  const [aiInput, setAiInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  // Challenge state
  const [codingChallenges, setCodingChallenges] = useState([]);
  const [codingLoading, setCodingLoading] = useState(false);
  const [codingError, setCodingError] = useState(null);
  const [challengeFilters, setChallengeFilters] = useState({
    difficulty: '',
    category: ''
  });

  // Analysis state
  const [formattedCode, setFormattedCode] = useState('');
  const [showCodeAnalysis, setShowCodeAnalysis] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [performanceData, setPerformanceData] = useState(null);
  const [codeAnalysis, setCodeAnalysis] = useState(null);
  const [showPerformanceMetrics, setShowPerformanceMetrics] = useState(false);
  const [showCompanyInsights, setShowCompanyInsights] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const [whiteboardMode, setWhiteboardMode] = useState('drawing');
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [flashcardProgress, setFlashcardProgress] = useState({});
  const [showCodeHistory, setShowCodeHistory] = useState(false);
  const [showCodeComparison, setShowCodeComparison] = useState(false);
  const [comparisonCode, setComparisonCode] = useState('');
  const [showCodeSharing, setShowCodeSharing] = useState(false);
  const [sharedCodeLink, setSharedCodeLink] = useState('');
  const [showCodeFormatting, setShowCodeFormatting] = useState(false);
  const [showCodeExplanation, setShowCodeExplanation] = useState(false);
  const [codeExplanation, setCodeExplanation] = useState('');
  const [showCodeOptimization, setShowCodeOptimization] = useState(false);
  const [optimizedCode, setOptimizedCode] = useState('');
  const [showCodeDocumentation, setShowCodeDocumentation] = useState(false);
  const [codeDocumentation, setCodeDocumentation] = useState('');
  const [showCodeDebugging, setShowCodeDebugging] = useState(false);
  const [debuggingSteps, setDebuggingSteps] = useState([]);
  const [showCodeRefactoring, setShowCodeRefactoring] = useState(false);
  const [refactoredCode, setRefactoredCode] = useState('');
  const [showCodeReview, setShowCodeReview] = useState(false);
  const [codeReviewComments, setCodeReviewComments] = useState([]);
  const [showCodeMetrics, setShowCodeMetrics] = useState(false);
  const [codeMetrics, setCodeMetrics] = useState(null);
  const [showCodeQuality, setShowCodeQuality] = useState(false);
  const [codeQualityReport, setCodeQualityReport] = useState(null);
  const [showCodeSecurity, setShowCodeSecurity] = useState(false);
  const [codeSecurityReport, setCodeSecurityReport] = useState(null);
  const [showCodeComplexity, setShowCodeComplexity] = useState(false);
  const [codeComplexityReport, setCodeComplexityReport] = useState(null);
  const [showCodeStandards, setShowCodeStandards] = useState(false);
  const [codeStandardsReport, setCodeStandardsReport] = useState(null);
  const [showCodeBestPractices, setShowCodeBestPractices] = useState(false);
  const [codeBestPracticesReport, setCodeBestPracticesReport] = useState(null);
  const [showCodePatterns, setShowCodePatterns] = useState(false);
  const [codePatternsReport, setCodePatternsReport] = useState(null);
  const [showCodeAntiPatterns, setShowCodeAntiPatterns] = useState(false);
  const [codeAntiPatternsReport, setCodeAntiPatternsReport] = useState(null);
  const [showCodePerformance, setShowCodePerformance] = useState(false);
  const [codePerformanceReport, setCodePerformanceReport] = useState(null);
  const [showCodeMaintainability, setShowCodeMaintainability] = useState(false);
  const [codeMaintainabilityReport, setCodeMaintainabilityReport] = useState(null);
  const [showCodeReadability, setShowCodeReadability] = useState(false);
  const [codeReadabilityReport, setCodeReadabilityReport] = useState(null);
  const [codeDocumentationReport, setCodeDocumentationReport] = useState(null);
  const [showCodeTesting, setShowCodeTesting] = useState(false);
  const [codeTestingReport, setCodeTestingReport] = useState(null);
  const [showCodeDeployment, setShowCodeDeployment] = useState(false);
  const [codeDeploymentReport, setCodeDeploymentReport] = useState(null);
  const [showDailyChallenge, setShowDailyChallenge] = useState(false);
  const [dailyChallenge, setDailyChallenge] = useState(null);
  const [showConfidenceAnalysis, setShowConfidenceAnalysis] = useState(false);
  const [showStudyReport, setShowStudyReport] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [companyInsights, setCompanyInsights] = useState(null);

  const codeRef = useRef(null);
  const [userProgress, setUserProgress] = useState({
    totalProblems: problemsData.length,
    solvedProblems: 0,
    streakDays: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalTimeSpent: 0,
    averageTime: 0,
    confidenceScores: {},
    weakTopics: [],
    strongTopics: [],
    lastActive: null
  });

  // Get unique values for filters
  const companies = useMemo(() => {
    const allCompanies = new Set();
    problemsData.forEach(problem => {
      problem.companies.forEach(company => allCompanies.add(company));
    });
    return ['all', ...Array.from(allCompanies).sort()];
  }, []);
  
  const topics = useMemo(() => {
    const allTopics = new Set();
    problemsData.forEach(problem => {
      allTopics.add(problem.topic);
    });
    return ['all', ...Array.from(allTopics).sort()];
  }, []);
  
  const difficulties = ['all', 'Easy', 'Medium', 'Hard'];

  // Filter problems based on selected filters
  const filteredProblemsMemo = useMemo(() => {
    return problemsData.filter(problem => {
      const matchesDifficulty = filterDifficulty === 'all' || problem.difficulty === filterDifficulty;
      const matchesCompany = filterCompany === 'all' || problem.companies.includes(filterCompany);
      const matchesTopic = filterTopic === 'all' || problem.topic === filterTopic;
      const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          problem.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesDifficulty && matchesCompany && matchesTopic && matchesSearch;
    });
  }, [filterDifficulty, filterCompany, filterTopic, searchTerm]);

  // Handle problem selection
  const handleProblemSelect = useCallback((problem) => {
    setSelectedProblem(problem);
    setCode(problem.solution[language] || problem.solution.JavaScript);
    setOutput(null);
    setShowHints(false);
    setShowSolution(false);
    setHints(problem.hints);
    setTestCaseResults([]);
    setShowTestCases(false);
    setShowPerformanceMetrics(false);
    setShowCodeAnalysis(false);
    setShowCompanyInsights(false);
    setShowAIAssistant(false);
    setShowWhiteboard(false);
    setShowFlashcards(false);
    setShowCodeHistory(false);
    setShowCodeComparison(false);
    setShowCodeSharing(false);
    setShowCodeFormatting(false);
    setShowCodeExplanation(false);
    setShowCodeOptimization(false);
    setShowCodeDocumentation(false);
    setShowCodeVisualization(false);
    setShowCodeTranslation(false);
    setShowCodeDebugging(false);
    setShowCodeTesting(false);
    setShowCodeRefactoring(false);
    setShowCodeReview(false);
    setShowCodeMetrics(false);
    setShowCodeQuality(false);
    setShowCodeSecurity(false);
    setShowCodeComplexity(false);
    setShowCodeStandards(false);
    setShowCodeBestPractices(false);
    setShowCodePatterns(false);
    setShowCodeAntiPatterns(false);
    setShowCodePerformance(false);
    setShowCodeMaintainability(false);
    setShowCodeReadability(false);
    setShowCodeDocumentation(false);
    setShowCodeTesting(false);
    setShowCodeDeployment(false);
  }, [language]);

  // Handle language change
  const handleLanguageChange = useCallback((newLanguage) => {
    setLanguage(newLanguage);
    if (selectedProblem) {
      setCode(selectedProblem.solution[newLanguage] || selectedProblem.solution.JavaScript);
    }
  }, [selectedProblem]);

  // Handle running code
  const handleRunCode = useCallback(async () => {
    if (!selectedProblem) {
      showToast('Please select a problem first', 'warning');
      return;
    }

    setIsRunning(true);
    setOutput('Running code...');

    try {
      // Simulate API call for code execution
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Run test cases
      const results = selectedProblem.testCases.map(testCase => {
        try {
          let result;
          if (language === 'javascript') {
            const fn = new Function('input', code + `\nreturn ${selectedProblem.id === 1 ? 'twoSum' : 'solution'}(...input);`);
            result = fn(testCase.input);
          } else {
            result = "Execution not supported for this language in demo";
          }

            const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
          return {
            ...testCase,
            actual: result,
            passed
          };
        } catch (error) {
          return {
            ...testCase,
            error: error.message,
            passed: false
          };
        }
      });

      setTestCaseResults(results);
      setShowTestCases(true);

      // Calculate performance metrics
      const passedCount = results.filter(r => r.passed).length;
      const performance = {
        correctness: (passedCount / results.length) * 100,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        executionTime: 120
      };

      setPerformanceData(performance);
      setShowPerformanceMetrics(true);

      // Generate code analysis
      const analysis = {
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        codeQuality: 'Good',
        suggestions: [
          'Consider adding input validation',
          'Add comments to explain complex logic',
          'Consider edge cases in your solution'
        ],
        improvements: [
          {
            type: 'optimization',
            description: 'Use a more efficient algorithm',
            code: '// Optimized code example'
          }
        ]
      };

      setCodeAnalysis(analysis);
      setShowCodeAnalysis(true);

      // Update user progress
      setUserProgress(prev => ({
        ...prev,
        solvedProblems: prev.solvedProblems + 1,
        totalTimeSpent: prev.totalTimeSpent + 15,
        confidenceScores: {
          ...prev.confidenceScores,
          [selectedProblem.id]: 85
        }
      }));

      // Show appropriate toast based on results
      if (results.every(r => r.passed)) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        showToast('All test cases passed! Great job! 🎉', 'success');
      } else if (results.some(r => r.passed)) {
        showToast('Some test cases passed. Keep improving!', 'info');
      } else {
        showToast('None of the test cases passed. Check the errors and try again.', 'error');
      }

      setOutput(results.every(r => r.passed)
        ? 'All test cases passed! ✅'
        : 'Some test cases failed. Check the results for details. ❌');
    } catch (error) {
      setOutput(`Error: ${error.message}`);
      showToast('Error running code', 'error');
    } finally {
      setIsRunning(false);
    }
  }, [selectedProblem, code, language, showToast]);

  // Toggle bookmark
  const toggleBookmark = useCallback((problemId) => {
    setBookmarkedProblems(prev => {
      const updated = prev.includes(problemId)
        ? prev.filter(id => id !== problemId)
        : [...prev, problemId];
      localStorage.setItem(getBookmarksKey(), JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Get hints (from problem data or AI)
  const handleGetHints = useCallback(() => {
    if (selectedProblem) {
      setHints(selectedProblem.hints);
      setShowHints(true);
      showToast('Hints revealed! Try to solve it yourself first.', 'info');
    }
  }, [selectedProblem, showToast]);

  // Show solution
  const handleShowSolution = useCallback(() => {
    if (selectedProblem) {
      setShowSolution(true);
      showToast('Solution revealed! Make sure you understand it.', 'warning');
    }
  }, [selectedProblem, showToast]);

  // Handle AI assistant messages
  const handleSendAIMessage = useCallback(async () => {
    if (!aiInput.trim()) return;

    setAiLoading(true);
    const userMessage = { sender: 'user', text: aiInput, timestamp: new Date() };
    setAiMessages(prev => [...prev, userMessage]);
    setAiInput('');

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1000));

    const aiResponse = {
      sender: 'ai',
      text: `I understand you're working on the "${selectedProblem?.title}" problem. Here are some suggestions:\n\n1. Consider using a ${selectedProblem?.topic} approach\n2. Think about edge cases\n3. Optimize your solution for better performance`,
      timestamp: new Date()
    };

    setAiMessages(prev => [...prev, aiResponse]);
      setAiLoading(false);
  }, [aiInput, selectedProblem]);

  // Format code
  const handleFormatCode = useCallback(() => {
    setFormattedCode(code);
    setShowCodeFormatting(true);
    showToast('Code formatted!', 'success');
  }, [code]);

  // Explain code
  const handleExplainCode = useCallback(() => {
    const explanation = `This code solves the "${selectedProblem?.title}" problem by:
1. Initializing necessary variables
2. Iterating through the input
3. Applying the algorithm logic
4. Returning the result

Key points to note:
- The time complexity is O(n)
- The space complexity is O(1)
- The solution handles edge cases appropriately`;

    setCodeExplanation(explanation);
    setShowCodeExplanation(true);
    showToast('Code explanation generated!', 'success');
  }, [selectedProblem]);

  // Optimize code
  const handleOptimizeCode = useCallback(() => {
    const optimized = `// Optimized version of your code
${code.replace(/\/\/.+/g, '')} // Comments removed for brevity
// Additional optimizations would be applied here`;

    setOptimizedCode(optimized);
    setShowCodeOptimization(true);
    showToast('Code optimized!', 'success');
  }, [code]);

  // Generate documentation
  const handleGenerateDocumentation = useCallback(() => {
    const documentation = `/**
 * Solves the "${selectedProblem?.title}" problem
 *
 * @param {Array} input - The input array
 * @return {Array} The solution to the problem
 *
 * @example
 * // returns [0, 1]
 * ${selectedProblem?.title}([2, 7, 11, 15], 9)
 */`;

    setCodeDocumentation(documentation);
    setShowCodeDocumentation(true);
    showToast('Documentation generated!', 'success');
  }, [selectedProblem]);

  // Handle voice coding
  const handleVoiceCoding = useCallback(() => {
    setShowVoiceCoding(true);
    showToast('Voice coding activated!', 'info');
  }, []);

  // Start/stop recording
  const handleToggleRecording = useCallback(() => {
    setIsRecording(prev => !prev);
    if (!isRecording) {
      showToast('Recording started!', 'info');
    } else {
      showToast('Recording stopped!', 'info');
    }
  }, [isRecording]);

  // Handle whiteboard
  const handleWhiteboard = useCallback(() => {
    setShowWhiteboard(prev => !prev);
    showToast('Whiteboard activated!', 'info');
  }, []);

  // Handle flashcards
  const handleFlashcards = useCallback(() => {
    setShowFlashcards(prev => !prev);
    showToast('Flashcards activated!', 'info');
  }, []);

  // Handle code history
  const handleCodeHistory = useCallback(() => {
    setShowCodeHistory(prev => !prev);
    showToast('Code history shown!', 'info');
  }, []);

  // Handle code comparison
  const handleCodeComparison = useCallback(() => {
    setShowCodeComparison(prev => !prev);
    setComparisonCode(code);
    showToast('Code comparison activated!', 'info');
  }, [code]);

  // Handle code sharing
  const handleCodeSharing = useCallback(() => {
    const link = `https://example.com/share?code=${encodeURIComponent(code)}`;
    setSharedCodeLink(link);
    setShowCodeSharing(true);
    showToast('Code sharing link generated!', 'success');
  }, [code]);

  // Language options for translation
  const languageOptions = [
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'java', label: 'Java' },
    { value: 'c++', label: 'C++' },
  ];

  // State for translation
  const [translationLanguage, setTranslationLanguage] = useState('python');
  const [translatedCode, setTranslatedCode] = useState('');
  const [showCodeTranslation, setShowCodeTranslation] = useState(false);

  // Handle code translation
  const handleCodeTranslation = useCallback(() => {
    let translated = '';
    
    if (translationLanguage === 'python') {
      translated = `# Translated to Python\n${code.replace(/function /g, 'def ').replace(/\{|\}/g, '')}`;
    } else if (translationLanguage === 'javascript') {
      translated = `// Translated to JavaScript\n${code.replace(/def /g, 'function ').replace(/(\w+):/g, '$1:')}`;
    } else {
      translated = `// Translation to ${translationLanguage} not implemented yet\n${code}`;
    }

    setTranslatedCode(translated);
    setShowCodeTranslation(true);
    showToast(`Code translated to ${translationLanguage}!`, 'success');
  }, [code, translationLanguage, showToast]);

  // Handle code debugging
  const handleCodeDebugging = useCallback(() => {
    const steps = [
      { step: 1, description: 'Initializing variables', code: code.split('\n')[0] },
      { step: 2, description: 'Processing input', code: code.split('\n')[1] },
      { step: 3, description: 'Returning result', code: code.split('\n').slice(-2).join('\n') }
    ];

    setDebuggingSteps(steps);
    setShowCodeDebugging(true);
    showToast('Debugging steps generated!', 'success');
  }, [code]);

  // Handle code testing
  const handleCodeTesting = useCallback(() => {
    const results = [
      { test: 'Basic test case', passed: true, time: '12ms' },
      { test: 'Edge case test', passed: true, time: '8ms' },
      { test: 'Performance test', passed: false, time: '25ms', error: 'Timeout' }
    ];

    setTestResults(results);
    setShowCodeTesting(true);
    showToast('Tests executed!', 'success');
  }, []);

  // Handle code refactoring
  const handleCodeRefactoring = useCallback(() => {
    const refactored = `// Refactored code
${code.replace(/\/\/.+/g, '')} // Comments removed
// Improved variable names
// Better structure`;

    setRefactoredCode(refactored);
    setShowCodeRefactoring(true);
    showToast('Code refactored!', 'success');
  }, [code]);

  // Handle code review
  const handleCodeReview = useCallback(() => {
    const comments = [
      { line: 1, comment: 'Good variable naming', type: 'positive' },
      { line: 3, comment: 'Consider adding input validation', type: 'suggestion' },
      { line: 5, comment: 'This could be optimized further', type: 'optimization' }
    ];

    setCodeReviewComments(comments);
    setShowCodeReview(true);
    showToast('Code review completed!', 'success');
  }, [code]);

  // Handle code metrics
  const handleCodeMetrics = useCallback(() => {
    const metrics = {
      linesOfCode: code.split('\n').length,
      complexity: 'Medium',
      maintainability: 'Good',
      readability: 'Excellent',
      duplication: 'Low'
    };

    setCodeMetrics(metrics);
    setShowCodeMetrics(true);
    showToast('Code metrics calculated!', 'success');
  }, [code]);

  // Handle code quality
  const handleCodeQuality = useCallback(() => {
    const report = {
      overallScore: 85,
      issues: [
        { type: 'style', description: 'Inconsistent indentation', severity: 'low' },
        { type: 'performance', description: 'Could use memoization', severity: 'medium' }
      ],
      recommendations: [
        'Add more comments',
        'Consider breaking down large functions',
        'Add input validation'
      ]
    };

    setCodeQualityReport(report);
    setShowCodeQuality(true);
    showToast('Code quality report generated!', 'success');
  }, [code]);

  // Handle code security
  const handleCodeSecurity = useCallback(() => {
    const report = {
      vulnerabilities: [
        { type: 'input validation', description: 'No input validation found', severity: 'high' }
      ],
      recommendations: [
        'Add input validation',
        'Sanitize user inputs',
        'Use parameterized queries'
      ]
    };

    setCodeSecurityReport(report);
    setShowCodeSecurity(true);
    showToast('Code security report generated!', 'success');
  }, [code]);

  // Handle code complexity
  const handleCodeComplexity = useCallback(() => {
    const report = {
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      cyclomaticComplexity: 5,
      cognitiveComplexity: 8
    };

    setCodeComplexityReport(report);
    setShowCodeComplexity(true);
    showToast('Code complexity report generated!', 'success');
  }, [code]);

  // Handle code standards
  const handleCodeStandards = useCallback(() => {
    const report = {
      compliance: 90,
      issues: [
        { standard: 'PSR-12', description: 'Class name should be in PascalCase', line: 1 },
        { standard: 'PSR-1', description: 'Files should use only <?php and <?= tags', line: 3 }
      ]
    };

    setCodeStandardsReport(report);
    setShowCodeStandards(true);
    showToast('Code standards report generated!', 'success');
  }, [code]);

  // Handle code best practices
  const handleCodeBestPractices = useCallback(() => {
    const report = {
      score: 88,
      practices: [
        { practice: 'Single Responsibility Principle', compliance: 'Followed' },
        { practice: 'DRY Principle', compliance: 'Mostly followed' },
        { practice: 'KISS Principle', compliance: 'Followed' }
      ],
      recommendations: [
        'Break down large functions',
        'Add more comments',
        'Consider using design patterns'
      ]
    };

    setCodeBestPracticesReport(report);
    setShowCodeBestPractices(true);
    showToast('Code best practices report generated!', 'success');
  }, [code]);

  // Handle code patterns
  const handleCodePatterns = useCallback(() => {
    const report = {
      patterns: [
        { name: 'Singleton', description: 'Used appropriately', type: 'positive' },
        { name: 'Factory', description: 'Could be used here', type: 'suggestion' }
      ],
      antiPatterns: [
        { name: 'God Object', description: 'Avoid large classes with many responsibilities' }
      ]
    };

    setCodePatternsReport(report);
    setShowCodePatterns(true);
    showToast('Code patterns report generated!', 'success');
  }, [code]);

  // Handle code anti-patterns
  const handleCodeAntiPatterns = useCallback(() => {
    const report = {
      antiPatterns: [
        { name: 'Spaghetti Code', description: 'Avoid complex nested conditions', severity: 'high' },
        { name: 'Magic Numbers', description: 'Replace with named constants', severity: 'medium' }
      ],
      recommendations: [
        'Refactor complex logic',
        'Use meaningful variable names',
        'Break down large functions'
      ]
    };

    setCodeAntiPatternsReport(report);
    setShowCodeAntiPatterns(true);
    showToast('Code anti-patterns report generated!', 'success');
  }, [code]);

  // Handle code performance
  const handleCodePerformance = useCallback(() => {
    const report = {
      executionTime: '12ms',
      memoryUsage: '4MB',
      bottlenecks: [
        { location: 'Line 5', description: 'Nested loop could be optimized', impact: 'high' }
      ],
      recommendations: [
        'Use memoization',
        'Optimize data structures',
        'Consider parallel processing'
      ]
    };

    setCodePerformanceReport(report);
    setShowCodePerformance(true);
    showToast('Code performance report generated!', 'success');
  }, [code]);

  // Handle code maintainability
  const handleCodeMaintainability = useCallback(() => {
    const report = {
      score: 85,
      factors: [
        { name: 'Readability', score: 90 },
        { name: 'Modularity', score: 80 },
        { name: 'Documentation', score: 75 }
      ],
      recommendations: [
        'Add more comments',
        'Break down large functions',
        'Improve variable naming'
      ]
    };

    setCodeMaintainabilityReport(report);
    setShowCodeMaintainability(true);
    showToast('Code maintainability report generated!', 'success');
  }, [code]);

  // Handle code readability
  const handleCodeReadability = useCallback(() => {
    const report = {
      score: 90,
      issues: [
        { line: 5, description: 'Complex nested condition', severity: 'medium' }
      ],
      recommendations: [
        'Break down complex expressions',
        'Use more descriptive variable names',
        'Add comments for complex logic'
      ]
    };

    setCodeReadabilityReport(report);
    setShowCodeReadability(true);
    showToast('Code readability report generated!', 'success');
  }, [code]);

  // Handle code documentation
  const handleCodeDocumentation = useCallback(() => {
    const report = {
      coverage: 75,
      issues: [
        { type: 'Missing function documentation', count: 3 },
        { type: 'Missing parameter descriptions', count: 5 }
      ],
      recommendations: [
        'Add JSDoc comments for all functions',
        'Document all parameters and return values',
        'Add module-level documentation'
      ]
    };

    setCodeDocumentationReport(report);
    setShowCodeDocumentation(true);
    showToast('Code documentation report generated!', 'success');
  }, [code]);

  // Handle code testing
  const handleCodeTestingReport = useCallback(() => {
    const report = {
      testCoverage: 80,
      testCases: 15,
      passed: 12,
      failed: 3,
      issues: [
        { test: 'Edge case test', status: 'failed', error: 'Unexpected result' }
      ]
    };

    setCodeTestingReport(report);
    setShowCodeTesting(true);
    showToast('Code testing report generated!', 'success');
  }, []);

  // Handle code deployment
  const handleCodeDeployment = useCallback(() => {
    const report = {
      status: 'ready',
      checks: [
        { name: 'Dependency check', status: 'passed' },
        { name: 'Security check', status: 'passed' },
        { name: 'Performance check', status: 'warning' }
      ],
      recommendations: [
        'Optimize database queries',
        'Add more logging',
        'Implement proper error handling'
      ]
    };

    setCodeDeploymentReport(report);
    setShowCodeDeployment(true);
    showToast('Code deployment report generated!', 'success');
  }, []);

  // Get daily challenge
  const getDailyChallenge = useCallback(() => {
    const challenge = problemsData.find(p => p.dailyChallenge);
    setDailyChallenge(challenge);
    setShowDailyChallenge(true);
    showToast('Daily challenge loaded!', 'success');
  }, []);

  // Get company insights
  const getCompanyInsights = useCallback(() => {
    const insights = {
      Google: {
        focusAreas: ['Algorithms', 'Data Structures', 'System Design'],
        commonQuestions: ['Two Sum variations', 'Tree problems', 'Graph algorithms'],
        tips: ['Practice whiteboard coding', 'Focus on clean code', 'Explain your thinking']
      },
      Amazon: {
        focusAreas: ['Data Structures', 'Algorithms', 'System Design', 'Leadership Principles'],
        commonQuestions: ['Array problems', 'Tree problems', 'Graph algorithms'],
        tips: ['Use STAR method for behavioral', 'Focus on scalability', 'Show customer obsession']
      }
    };

    setCompanyInsights(insights);
    setShowCompanyInsights(true);
    showToast('Company insights loaded!', 'success');
  }, []);

  // Handle flashcard answer
  const handleFlashcardAnswer = useCallback((isCorrect) => {
    setFlashcardProgress(prev => ({
      ...prev,
      [currentFlashcard]: isCorrect ? 'correct' : 'incorrect'
    }));

    if (currentFlashcard < problemsData.length - 1) {
      setCurrentFlashcard(prev => prev + 1);
    } else {
      setShowFlashcards(false);
      setCurrentFlashcard(0);
      showToast('Flashcard session completed!', 'success');
    }
  }, [currentFlashcard]);

  // Handle code submission
  const handleSubmitCode = async () => {
    if (!selectedProblem) {
      showToast('No problem selected', 'error');
      return;
    }

    if (!code.trim()) {
      showToast('Please write some code before submitting', 'error');
      return;
    }

    setIsRunning(true);
    setOutput('Submitting code...');

    try {
      // Simulate API call to submit code
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            message: 'Code submitted successfully!',
            results: {
              passed: Math.random() > 0.3, // 70% pass rate for demo
              testCases: [
                { input: 'Test case 1', expected: 'Expected output 1', actual: 'Actual output 1', passed: true },
                { input: 'Test case 2', expected: 'Expected output 2', actual: 'Actual output 2', passed: true },
                { input: 'Test case 3', expected: 'Expected output 3', actual: 'Incorrect output', passed: false }
              ],
              executionTime: Math.floor(Math.random() * 1000) + 'ms',
              memoryUsage: Math.floor(Math.random() * 10) + 'MB'
            }
          });
        }, 1500);
      });

      if (response.success) {
        const { results } = response;
        setTestCaseResults(results.testCases);
        setShowTestCases(true);
        
        const passedCount = results.testCases.filter(tc => tc.passed).length;
        const totalTests = results.testCases.length;
        
        setOutput(`✅ ${passedCount}/${totalTests} test cases passed\n` +
                 `⏱️ Execution Time: ${results.executionTime}\n` +
                 `💾 Memory Usage: ${results.memoryUsage}`);
        
        if (results.passed) {
          showToast('All test cases passed! 🎉', 'success');
          // Update user progress
          setUserProgress(prev => ({
            ...prev,
            solvedProblems: [...new Set([...prev.solvedProblems, selectedProblem.id])]
          }));
        } else {
          showToast('Some test cases failed. Try again!', 'warning');
        }
      } else {
        showToast(response.message || 'Failed to submit code', 'error');
      }
    } catch (error) {
      console.error('Error submitting code:', error);
      setOutput('Error: ' + (error.message || 'Failed to submit code'));
      showToast('Error submitting code', 'error');
    } finally {
      setIsRunning(false);
    }
  };

  // Handle confidence analysis
  const handleConfidenceAnalysis = useCallback(() => {
    if (!selectedProblem) return;
    
    const confidenceScore = 85;
    
    setUserProgress(prev => ({
      ...prev,
      confidenceScores: {
        ...prev.confidenceScores,
        [selectedProblem.id]: confidenceScore
      }
    }));

    setShowConfidenceAnalysis(true);
    showToast('Confidence analysis completed!', 'success');
  }, [selectedProblem]);

  // Handle study report
  const handleStudyReport = useCallback(() => {
    const report = {
      totalProblems: userProgress.totalProblems,
      solvedProblems: userProgress.solvedProblems,
      weakTopics: userProgress.weakTopics,
      strongTopics: userProgress.strongTopics,
      averageConfidence: Object.values(userProgress.confidenceScores).reduce((a, b) => a + b, 0) / Object.keys(userProgress.confidenceScores).length || 0,
      recommendations: [
        "Focus on Dynamic Programming problems",
        "Practice more Graph algorithms",
        "Review Array manipulation techniques"
      ]
    };
    
    setShowStudyReport(true);
    showToast('Study report generated!', 'success');
  }, [userProgress]);

  // Handle problem bookmark toggle
  const isBookmarked = useCallback((problemId) => {
    return bookmarkedProblems.includes(problemId);
  }, [bookmarkedProblems]);

  // Get difficulty color for styling
  const getDifficultyColor = useCallback((difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'hard': return '#ef4444';
      default: return '#6b7280';
    }
  }, []);

  // Get company insights for a specific company
  const getCompanyInsightsFor = useCallback((company) => {
    return companyInsights?.[company] || {
      focusAreas: [],
      commonQuestions: [],
      tips: []
    };
  }, [companyInsights]);

  const handleFetchCodingQuestions = async () => {
    setLoadingQuestions(true);
    try {
      const res = await apiService.request(`/api/coding-questions?company=${encodeURIComponent(companyInput)}&jobDescription=${encodeURIComponent(jobDescInput)}`);
      const questions = Array.isArray(res.questions) ? res.questions : Array.isArray(res) ? res : [];
      setFetchedQuestions(questions);
    } catch (err) {
      setFetchedQuestions([]);
    }
    setLoadingQuestions(false);
  };

  const handleClearCodingQuestions = () => {
    setCompanyInput('');
    setJobDescInput('');
    setFetchedQuestions([]);
  };

  // Fetch coding challenges from backend
  const fetchCodingChallenges = async () => {
    setCodingLoading(true);
    setCodingError(null);
    try {
      const res = await apiService.getCodingChallenges(challengeFilters);
      setCodingChallenges(res.data?.challenges || []);
    } catch (err) {
      setCodingError('Failed to fetch coding challenges.');
      setCodingChallenges([]);
    }
    setCodingLoading(false);
  };

  // Main render
    return (
    <div className="coding-page">
      {/* AI Coding Question Search Section as a card at the top */}
      <div className="ai-search-card" role="region" aria-label="AI Coding Question Search">
        <h3>AI Coding Question Search</h3>
        <div className="form-group">
          <label htmlFor="company-input">Company name (e.g. Google, Amazon)</label>
          <input
            id="company-input"
            type="text"
            value={companyInput}
            onChange={e => setCompanyInput(e.target.value)}
            className="form-input"
            placeholder="Enter company name"
            aria-describedby="ai-search-desc"
            autoComplete="organization"
          />
          <button type="button" className="ai-search-btn" onClick={handleFetchCodingQuestions} aria-label="Search coding questions for company" disabled={loadingQuestions}>
            {loadingQuestions ? 'Fetching...' : 'Search'}
          </button>
          <div id="ai-search-desc" className="visually-hidden">Type a company name and click Search to get AI-generated coding questions.</div>
          {fetchedQuestions.length > 0 && (
            <div className="fetched-questions-section">
              <h4>AI Fetched Coding Questions</h4>
              <ul>
                {fetchedQuestions.map((q, idx) => (
                  <li key={idx}>{q.title || q.question || JSON.stringify(q)}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* Main flex row: sidebar and main content */}
      <div className="coding-main-flex">
        <aside className="problems-sidebar" role="region" aria-label="Problem Filters and List">
          <div className="sidebar-header">
            <h2>Coding Problems</h2>
            <div className="sidebar-actions">
            <button 
                className="filter-toggle"
                onClick={() => setShowFilters(!showFilters)}
                title="Toggle Filters"
              >
                <FaFilter />
            </button>
            <button 
                className="daily-challenge-btn"
                onClick={getDailyChallenge}
                title="Daily Challenge"
              >
                <FaCalendar />
            </button>
            <button 
                className="study-report-btn"
                onClick={handleStudyReport}
              title="Study Report"
            >
                <FaRegChartBar />
            </button>
          </div>
        </div>

          {/* Filters section */}
          {showFilters && (
            <div className="filters-section">
              <div className="search-box">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Search problems..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
              <div className="filter-group">
                <label>Difficulty:</label>
                <select
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value)}
                >
                  {difficulties.map(diff => (
                    <option key={diff} value={diff}>
                      {diff === 'all' ? 'All Difficulties' : diff}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Company:</label>
                <select
                  value={filterCompany}
                  onChange={(e) => setFilterCompany(e.target.value)}
                >
                  {companies.map(company => (
                    <option key={company} value={company}>
                      {company === 'all' ? 'All Companies' : company}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Topic:</label>
                <select
                  value={filterTopic}
                  onChange={(e) => setFilterTopic(e.target.value)}
                >
                  {topics.map(topic => (
                    <option key={topic} value={topic}>
                      {topic === 'all' ? 'All Topics' : topic}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Problem list */}
          <div className="problems-list" aria-label="Coding Problems List">
            {filteredProblemsMemo.length > 0 ? (
              filteredProblemsMemo.map(problem => (
                <div
                  key={problem.id}
                  className={`problem-item ${selectedProblem?.id === problem.id ? 'active' : ''}`}
                  onClick={() => handleProblemSelect(problem)}
                >
                  <div className="problem-header">
                    <h3>{problem.title}</h3>
                    <button
                      className="bookmark-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(problem.id);
                      }}
                      title={isBookmarked(problem.id) ? 'Remove bookmark' : 'Add bookmark'}
                    >
                      {isBookmarked(problem.id) ? <FaBookmark /> : <FaRegBookmark />}
                    </button>
                  </div>

                  <div className="problem-meta">
                    <span
                      className="difficulty-badge"
                      style={{ backgroundColor: getDifficultyColor(problem.difficulty) }}
                    >
                      {problem.difficulty}
                </span>
                    <div className="problem-tags">
                      {problem.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="tag">{tag}</span>
              ))}
                    </div>
              </div>

                  <div className="problem-stats">
                    <span className="stat-item">
                      <FaStar /> {problem.stats.likes} likes
                    </span>
                    <span className="stat-item">
                      <FaThumbsDown /> {problem.stats.dislikes} dislikes
                    </span>
                    <span className="stat-item">
                      <FaRegCommentDots /> {problem.peerReviews.length} reviews
                    </span>
                  </div>

                  <div className="problem-companies">
                    {problem.companies.slice(0, 3).map(company => (
                      <span key={company} className="company-tag">{company}</span>
              ))}
            </div>
                </div>
              ))
            ) : (
              <div className="no-problems">No problems match your filters</div>
            )}
          </div>
        </aside>

        {/* Main content area */}
        <main className="coding-main-content" role="region" aria-label="Coding Problem Details and Editor">
          {selectedProblem ? (
            <>
              {/* Problem header */}
              <div className="problem-header">
                <div className="problem-title-section">
                  <h1>{selectedProblem.title}</h1>
                  <span
                    className="difficulty-badge"
                    style={{ backgroundColor: getDifficultyColor(selectedProblem.difficulty) }}
                  >
                    {selectedProblem.difficulty}
                  </span>
                </div>
            </div>
            
            <div className="problem-actions">
                <button
                  className="action-btn"
                  onClick={handleWhiteboard}
                  title="Whiteboard Mode"
                >
                  <FaDrawPolygon />
              </button>
                <button
                  className="action-btn"
                  onClick={handleVoiceCoding}
                  title="Voice Coding"
                >
                  <FaMicrophone />
                </button>
                <button
                  className="action-btn"
                  onClick={handleFlashcards}
                  title="Flashcards"
                >
                  <FaRegStickyNote />
                </button>
                <button
                  className="action-btn"
                  onClick={handleCodeHistory}
                  title="Code History"
                >
                  <FaRegClock />
                </button>
                <button
                  className="action-btn"
                  onClick={handleCodeComparison}
                  title="Code Comparison"
                >
                  <FaCode />
                </button>
                <button
                  className="action-btn"
                  onClick={handleCodeSharing}
                  title="Share Code"
                >
                  <FaShareAlt />
              </button>
              </div>
            </>
          ) : (
            <div className="no-problem-selected" aria-live="polite">Select a problem to start coding.</div>
          )}
            </main>
            
        {/* Problem description */}
        {selectedProblem && (
          <div className="problem-description">
            <div className="problem-content">
              <p>{selectedProblem.description}</p>

              <div className="examples-section">
                <h3>Examples:</h3>
                {selectedProblem.examples?.map((example, index) => (
                  <div key={index} className="example">
                    <div><strong>Input:</strong> {example.input}</div>
                    <div><strong>Output:</strong> {example.output}</div>
                    {example.explanation && (
                      <div><strong>Explanation:</strong> {example.explanation}</div>
                    )}
                  </div>
                ))}
              </div>

              <div className="constraints-section">
                <h3>Constraints:</h3>
                <ul>
                  {selectedProblem.constraints?.map((constraint, index) => (
                    <li key={index}>{constraint}</li>
              ))}
            </ul>
              </div>
          </div>

            <div className="problem-meta-info">
              <div className="stats">
                <span className="stat-item">
                  <FaStar /> {selectedProblem.stats.likes} likes
                </span>
                <span className="stat-item">
                  <FaThumbsDown /> {selectedProblem.stats.dislikes} dislikes
                </span>
                <span className="stat-item">
                  <FaRegCommentDots /> {selectedProblem.peerReviews.length} reviews
                </span>
              </div>

              <div className="problem-actions">
              <button 
                  className="action-btn"
                  onClick={handleGetHints}
                  title="Get Hints"
                >
                  <FaLightbulb /> Hints
              </button>
                <button
                  className="action-btn"
                  onClick={handleShowSolution}
                  title="Show Solution"
                >
                  <FaEye /> Solution
                </button>
                <button
                  className="action-btn"
                  onClick={handleConfidenceAnalysis}
                  title="Confidence Analysis"
                >
                  <FaBrain /> Confidence
                </button>
                <button
                  className="action-btn"
                  onClick={getCompanyInsights}
                  title="Company Insights"
                >
                  <FaBuilding /> Insights
                </button>
                <button
                  className="action-btn"
                  onClick={() => setShowAIAssistant(true)}
                  title="AI Assistant"
                >
                  <FaRobot /> AI
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Code editor */}
        <div className="code-editor-section">
          <div className="editor-header">
            <div className="language-selector">
              <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
              </select>
            </div>

            <div className="editor-actions">
              <button
                className="action-btn"
                onClick={handleFormatCode}
                title="Format Code"
              >
                <FaRegFileCode />
              </button>
              <button
                className="action-btn"
                onClick={handleExplainCode}
                title="Explain Code"
              >
                <FaRegCommentAlt />
              </button>
              <button
                className="action-btn"
                onClick={handleOptimizeCode}
                title="Optimize Code"
              >
                <FaTools />
              </button>
              <button
                className="action-btn"
                onClick={handleGenerateDocumentation}
                title="Generate Documentation"
              >
                <FaRegFileAlt />
              </button>
              <button
                className="action-btn"
                onClick={handleRunCode}
                disabled={isRunning}
                title="Run Code"
              >
                {isRunning ? <FaSpinner className="spinner" /> : <FaPlay />}
              </button>
            </div>
            <div className="code-actions">
              <button onClick={handleRunCode} disabled={isRunning}>
                {isRunning ? <FaSpinner className="spinner" /> : <FaPlay />} Run Code
              </button>
              <button onClick={handleSubmitCode}>
                <FaCheck /> Submit
              </button>
              <div className="translation-controls">
                <select 
                  value={translationLanguage}
                  onChange={handleLanguageChange}
                  className="language-select"
                >
                  {languageOptions.map(lang => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
                <button onClick={handleCodeTranslation}>
                  <FaExchangeAlt /> Translate
                </button>
              </div>
            </div>
          </div>

            <textarea
              ref={codeRef}
            className="code-editor"
              value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write your code here..."
          />
        </div>

        {/* Output section */}
        <div className="output-section">
          <h3>Output</h3>
          <pre className="output-content">
            {output || 'Run your code to see the output...'}
          </pre>
        </div>

        {/* Test cases section */}
        {showTestCases && (
          <div className="test-cases-section">
            <div className="section-header">
              <h3>Test Cases</h3>
              <button 
                className="close-btn"
                onClick={() => setShowTestCases(false)}
              >
                ×
              </button>
            </div>
            <div className="test-cases-content">
              {testCaseResults.map((result, index) => (
                <div
                  key={index}
                  className={`test-case ${result.passed ? 'passed' : 'failed'}`}
                >
                  <div className="test-case-header">
                    <span className="test-case-index">Test Case {index + 1}</span>
                    <span className={`test-case-status ${result.passed ? 'passed' : 'failed'}`}>
                      {result.passed ? '✅ Passed' : '❌ Failed'}
                    </span>
                  </div>
                  <div className="test-case-input">
                    <strong>Input:</strong> {JSON.stringify(result.input)}
                  </div>
                  <div className="test-case-expected">
                    <strong>Expected:</strong> {JSON.stringify(result.expected)}
                  </div>
                  <div className="test-case-actual">
                    <strong>Actual:</strong> {JSON.stringify(result.actual)}
                  </div>
                  {result.error && (
                    <div className="test-case-error">
                      <strong>Error:</strong> {result.error}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Performance metrics section */}
        {showPerformanceMetrics && performanceData && (
          <div className="performance-metrics-section">
            <div className="section-header">
              <h3>Performance Metrics</h3>
              <button
                className="close-btn"
                onClick={() => setShowPerformanceMetrics(false)}
              >
                ×
              </button>
            </div>
            <div className="performance-metrics-content">
              <div className="metric-item">
                <span className="metric-label">Correctness:</span>
                <span className="metric-value">{performanceData.correctness}%</span>
          </div>
              <div className="metric-item">
                <span className="metric-label">Time Complexity:</span>
                <span className="metric-value">{performanceData.timeComplexity}</span>
        </div>
              <div className="metric-item">
                <span className="metric-label">Space Complexity:</span>
                <span className="metric-value">{performanceData.spaceComplexity}</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Execution Time:</span>
                <span className="metric-value">{performanceData.executionTime}ms</span>
              </div>
            </div>
          </div>
        )}

        {/* Code analysis section */}
        {showCodeAnalysis && codeAnalysis && (
          <div className="code-analysis-section">
            <div className="section-header">
              <h3>Code Analysis</h3>
              <button 
                className="close-btn"
                onClick={() => setShowCodeAnalysis(false)}
              >
                ×
              </button>
            </div>
            <div className="code-analysis-content">
              <div className="analysis-item">
                <h4>Complexity Analysis</h4>
                      <div className="complexity-item">
                  <span className="complexity-label">Time Complexity:</span>
                  <span className="complexity-value">{codeAnalysis.timeComplexity}</span>
                      </div>
                      <div className="complexity-item">
                  <span className="complexity-label">Space Complexity:</span>
                  <span className="complexity-value">{codeAnalysis.spaceComplexity}</span>
                      </div>
                    </div>

              <div className="analysis-item">
                <h4>Suggestions</h4>
                      <ul>
                  {codeAnalysis.suggestions.map((suggestion, index) => (
                          <li key={index}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>

              {codeAnalysis.improvements && (
                <div className="analysis-item">
                  <h4>Optimizations</h4>
                  {codeAnalysis.improvements.map((improvement, index) => (
                          <div key={index} className="improvement-item">
                            <strong>{improvement.type}:</strong> {improvement.description}
                            <pre className="improvement-code">{improvement.code}</pre>
                          </div>
                        ))}
                </div>
              )}
            </div>
                      </div>
                    )}

        {/* Hints section */}
        {showHints && (
          <div className="hints-section">
            <div className="section-header">
              <h3>Hints</h3>
              <button
                className="close-btn"
                onClick={() => setShowHints(false)}
              >
                ×
              </button>
                    </div>
            <div className="hints-content">
              <div className="hints-list">
                {hints.map((hint, index) => (
                  <div key={index} className="hint-item">
                    <span className="hint-number">{index + 1}</span>
                    <span className="hint-text">{hint}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Solution section */}
        {showSolution && (
          <div className="solution-section">
            <div className="section-header">
              <h3>Solution</h3>
              <button
                className="close-btn"
                onClick={() => setShowSolution(false)}
              >
                ×
              </button>
              </div>
            <div className="solution-content">
              <pre className="solution-code">
                {selectedProblem.solution[language] || selectedProblem.solution.JavaScript}
              </pre>
            </div>
          </div>
        )}

        {/* AI Assistant section */}
        {showAIAssistant && (
          <div className="ai-assistant-section">
            <div className="section-header">
              <h3>AI Assistant</h3>
              <button 
                className="close-btn"
                onClick={() => setShowAIAssistant(false)}
              >
                ×
              </button>
            </div>
            <div className="ai-assistant-content">
              <div className="ai-messages">
                {aiMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`ai-message ${message.sender}`}
                  >
                    <div className="message-content">{message.text}</div>
                    <div className="message-time">
                      {new Date(message.timestamp).toLocaleTimeString()}
              </div>
                    </div>
                ))}
                    </div>
              <div className="ai-input">
                <input
                  type="text"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder="Ask AI for help..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendAIMessage()}
                />
                <button
                  onClick={handleSendAIMessage}
                  disabled={aiLoading}
                >
                  {aiLoading ? <FaSpinner className="spinner" /> : 'Send'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Whiteboard section */}
        {showWhiteboard && (
          <div className="whiteboard-section">
            <div className="section-header">
              <h3>Whiteboard</h3>
              <div className="whiteboard-actions">
                <button
                  className={`mode-btn ${whiteboardMode === 'drawing' ? 'active' : ''}`}
                  onClick={() => setWhiteboardMode('drawing')}
                >
                  <FaPencilAlt /> Draw
                </button>
                <button
                  className={`mode-btn ${whiteboardMode === 'text' ? 'active' : ''}`}
                  onClick={() => setWhiteboardMode('text')}
                >
                  <FaFont /> Text
                </button>
                <button
                  className={`mode-btn ${whiteboardMode === 'shapes' ? 'active' : ''}`}
                  onClick={() => setWhiteboardMode('shapes')}
                >
                  <FaShapes /> Shapes
                </button>
                <button
                  className="close-btn"
                  onClick={() => setShowWhiteboard(false)}
                >
                  ×
                </button>
              </div>
            </div>
            <div className="whiteboard-content">
              <div className="whiteboard-canvas">
                <p>Whiteboard canvas would be here</p>
                <p>Current mode: {whiteboardMode}</p>
              </div>
            </div>
          </div>
        )}

        {/* Flashcards section */}
        {showFlashcards && (
          <div className="flashcards-section">
            <div className="section-header">
              <h3>Flashcards</h3>
              <button
                className="close-btn"
                onClick={() => setShowFlashcards(false)}
              >
                ×
              </button>
            </div>
            <div className="flashcards-content">
              <div className="flashcard">
                <div className="flashcard-question">
                  <h4>Question {currentFlashcard + 1}/{problemsData.length}</h4>
                  <p>{problemsData[currentFlashcard].title}</p>
                </div>
                <div className="flashcard-actions">
                  <button
                    className="action-btn incorrect"
                    onClick={() => handleFlashcardAnswer(false)}
                  >
                    <FaTimes /> Incorrect
                  </button>
                  <button
                    className="action-btn correct"
                    onClick={() => handleFlashcardAnswer(true)}
                  >
                    <FaCheck /> Correct
                  </button>
                </div>
              </div>
              </div>
          </div>
        )}

        {/* Code History section */}
        {showCodeHistory && (
          <div className="code-history-section">
            <div className="section-header">
              <h3>Code History</h3>
              <button
                className="close-btn"
                onClick={() => setShowCodeHistory(false)}
              >
                ×
              </button>
            </div>
            <div className="code-history-content">
              <p>Code history would be shown here</p>
              <p>Previous versions of your code</p>
            </div>
          </div>
        )}

        {/* Code Comparison section */}
        {showCodeComparison && (
          <div className="code-comparison-section">
            <div className="section-header">
              <h3>Code Comparison</h3>
              <button
                className="close-btn"
                onClick={() => setShowCodeComparison(false)}
              >
                ×
              </button>
            </div>
            <div className="code-comparison-content">
              <div className="comparison-item">
                <h4>Current Code</h4>
                <pre>{code}</pre>
                    </div>
              <div className="comparison-item">
                <h4>Comparison Code</h4>
                <pre>{comparisonCode}</pre>
                  </div>
                  </div>
          </div>
        )}

        {/* Code Sharing section */}
        {showCodeSharing && (
          <div className="code-sharing-section">
            <div className="section-header">
              <h3>Share Your Code</h3>
              <button
                className="close-btn"
                onClick={() => setShowCodeSharing(false)}
              >
                ×
                    </button>
            </div>
            <div className="code-sharing-content">
              <p>Share this link with others:</p>
              <div className="share-link">
                <input type="text" value={sharedCodeLink} readOnly />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(sharedCodeLink);
                    showToast('Link copied to clipboard!', 'success');
                  }}
                >
                  Copy
                    </button>
                  </div>
                </div>
          </div>
        )}

        {/* Code Formatting section */}
        {showCodeFormatting && (
          <div className="code-formatting-section">
            <div className="section-header">
              <h3>Formatted Code</h3>
              <button
                className="close-btn"
                onClick={() => setShowCodeFormatting(false)}
              >
                ×
              </button>
            </div>
            <div className="code-formatting-content">
              <pre>{formattedCode}</pre>
            </div>
          </div>
        )}

        {/* Code Explanation section */}
        {showCodeExplanation && (
          <div className="code-explanation-section">
            <div className="section-header">
              <h3>Code Explanation</h3>
              <button
                className="close-btn"
                onClick={() => setShowCodeExplanation(false)}
              >
                ×
              </button>
            </div>
            <div className="code-explanation-content">
              <p>{codeExplanation}</p>
            </div>
          </div>
        )}

        {/* Code Optimization section */}
        {showCodeOptimization && (
          <div className="code-optimization-section">
            <div className="section-header">
              <h3>Optimized Code</h3>
              <button
                className="close-btn"
                onClick={() => setShowCodeOptimization(false)}
              >
                ×
              </button>
            </div>
            <div className="code-optimization-content">
              <pre>{optimizedCode}</pre>
            </div>
          </div>
        )}

        {/* Code Documentation section */}
        {showCodeDocumentation && (
          <div className="code-documentation-section">
            <div className="section-header">
              <h3>Code Documentation</h3>
              <button
                className="close-btn"
                onClick={() => setShowCodeDocumentation(false)}
              >
                ×
              </button>
            </div>
            <div className="code-documentation-content">
              <pre>{codeDocumentation}</pre>
            </div>
          </div>
        )}

        {/* Company Insights section */}
        {showCompanyInsights && (
          <div className="company-insights-section">
            <div className="section-header">
              <h3>Company Insights</h3>
              <button
                className="close-btn"
                onClick={() => setShowCompanyInsights(false)}
              >
                ×
              </button>
            </div>
            <div className="company-insights-content">
              {selectedProblem?.companies?.map(company => {
                const insights = getCompanyInsightsFor(company);
                return (
                  <div key={company} className="company-insight">
                    <h4>{company}</h4>
                      <div className="insight-section">
                        <h5>Focus Areas</h5>
                        <ul>
                          {insights.focusAreas.map((area, i) => (
                            <li key={i}>{area}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="insight-section">
                        <h5>Common Questions</h5>
                        <ul>
                          {insights.commonQuestions.map((question, i) => (
                            <li key={i}>{question}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="insight-section">
                        <h5>Tips</h5>
                        <ul>
                          {insights.tips.map((tip, i) => (
                            <li key={i}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Study Report section */}
        {showStudyReport && (
          <div className="study-report-section">
            <div className="section-header">
              <h3>Study Report</h3>
              <button
                className="close-btn"
                onClick={() => setShowStudyReport(false)}
              >
                ×
              </button>
            </div>
            <div className="study-report-content">
              <div className="report-summary">
                <h4>Summary</h4>
                <p>Total Problems: {userProgress.totalProblems}</p>
                <p>Solved Problems: {userProgress.solvedProblems}</p>
                <p>Average Confidence: {userProgress.confidenceScores ?
                  (Object.values(userProgress.confidenceScores).reduce((a, b) => a + b, 0) /
                   Object.keys(userProgress.confidenceScores).length).toFixed(1) : 0}%
                </p>
              </div>
              <div className="report-recommendations">
                <h4>Recommendations</h4>
                <ul>
                  <li>Focus on Dynamic Programming problems</li>
                  <li>Practice more Graph algorithms</li>
                  <li>Review Array manipulation techniques</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Coding Challenges section */}
        <div className="coding-ai-search">
          <h3>Fetch Coding Challenges from Backend</h3>
          <div className="form-group">
            <label>Difficulty</label>
          <select 
              value={challengeFilters.difficulty}
              onChange={e => setChallengeFilters(f => ({ ...f, difficulty: e.target.value }))}
            >
              <option value="">All</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
          </select>
        </div>
          <div className="form-group">
            <label>Language</label>
          <select 
              value={challengeFilters.language}
              onChange={e => setChallengeFilters(f => ({ ...f, language: e.target.value }))}
            >
              <option value="">All</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C++">C++</option>
          </select>
        </div>
          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              value={challengeFilters.category}
              onChange={e => setChallengeFilters(f => ({ ...f, category: e.target.value }))}
              placeholder="e.g. Arrays, Stack, Linked List"
            />
          </div>
          <button className="btn btn-primary" onClick={fetchCodingChallenges} disabled={codingLoading}>
            {codingLoading ? 'Fetching...' : 'Fetch Coding Challenges'}
          </button>
          {codingError && <div className="error-message">{codingError}</div>}
      </div>

        {codingChallenges.length > 0 && (
          <div className="coding-ai-results">
            <h3>Fetched Coding Challenges</h3>
            <ul>
              {codingChallenges.map((challenge, idx) => (
                <li key={challenge.id || idx}>
                  <strong>{challenge.title}</strong> - {challenge.difficulty} - {challenge.category}
                  <div>{challenge.description}</div>
                </li>
              ))}
            </ul>
                </div>
        )}
      </div>
    </div>
  );
};

export default Coding;
