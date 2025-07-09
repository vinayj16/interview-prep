<<<<<<< HEAD
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

=======
import React, { useState, useEffect } from 'react';
import { FaPlay, FaLightbulb, FaMicrophone, FaDrawPolygon, FaBookmark, FaRegBookmark, FaRobot, FaUsers, FaFilter, FaSearch } from 'react-icons/fa';
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
import { useToast } from './Toast/Toast';
import { useApp } from '../context/AppContext';
import { useApi } from '../hooks/useApi';
import apiService from '../services/apiService';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';
import './Coding.css';

<<<<<<< HEAD
import {
  FaPlay,
  FaLightbulb,
  FaMicrophone,
  FaDrawPolygon,
  FaBookmark,
  FaRegBookmark,
  FaRobot,
  FaUsers,
  FaFilter,
  FaSearch,
  FaStar,
  FaThumbsUp,
  FaThumbsDown,
  FaCalendar,
  FaTrophy,
  FaBrain,
  FaCode,
  FaCheck,
  FaTimes,
  FaSpinner,
  FaRegLightbulb,
  FaRegComment,
  FaRegCommentDots,
  FaRegClipboard,
  FaRegSave,
  FaRegTrashAlt,
  FaRegEye,
  FaRegEyeSlash,
  FaRegClock,
  FaRegChartBar,
  FaRegListAlt,
  FaRegFileCode,
  FaRegFileAlt,
  FaRegQuestionCircle,
  FaRegSmile,
  FaRegFrown,
  FaRegMeh,
  FaRegHandPointRight,
  FaRegHandPointLeft,
  FaRegHandPointUp,
  FaRegHandPointDown,
  FaRegCommentAlt,
  FaRegStickyNote,
  FaRegBuilding,
  FaShareAlt,
  FaEye,
  FaBuilding,
  FaTools,
  FaPencilAlt,
  FaFont,
  FaShapes,
} from 'react-icons/fa';
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
  },
  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "Easy",
    topic: "Stack",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    examples: [
      { input: "s = \"()\"", output: "true" },
      { input: "s = \"()[]{}\"", output: "true" },
      { input: "s = \"(]\"", output: "false" }
    ],
    companies: ["Google", "Amazon", "Microsoft", "Facebook"],
    tags: ["String", "Stack"],
    solution: {
      JavaScript: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };

  for (let char of s) {
    if (char in map) {
      if (stack.pop() !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}`,
      Python: `def isValid(s):
  stack = []
  mapping = {')': '(', '}': '{', ']': '['}

  for char in s:
    if char in mapping:
      top_element = stack.pop() if stack else '#'
      if mapping[char] != top_element:
        return False
    else:
      stack.append(char)

  return not stack`,
      Java: `class Solution {
  public boolean isValid(String s) {
    Stack<Character> stack = new Stack<>();
    Map<Character, Character> map = new HashMap<>();
    map.put(')', '(');
    map.put('}', '{');
    map.put(']', '[');

    for (char c : s.toCharArray()) {
      if (map.containsKey(c)) {
        if (stack.isEmpty() || stack.pop() != map.get(c)) {
          return false;
        }
      } else {
        stack.push(c);
      }
    }
    return stack.isEmpty();
  }
}`
    },
    hints: [
      "Use a stack data structure",
      "Push opening brackets onto the stack",
      "When you see a closing bracket, check if it matches the top of the stack"
    ],
    testCases: [
      { input: "()", expected: true },
      { input: "()[]{}", expected: true },
      { input: "(]", expected: false },
      { input: "([)]", expected: false },
      { input: "{[]}", expected: true }
    ],
    stats: {
      acceptanceRate: 78,
      avgTime: 12,
      likes: 980,
      dislikes: 67,
      solutions: 1890
    },
    dailyChallenge: true,
    premium: false,
    relatedProblems: [20, 22, 32],
    confidenceScore: null,
    userRating: null,
    peerReviews: []
  },
  {
    id: 3,
    title: "Maximum Subarray",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    description: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
      { input: "nums = [1]", output: "1", explanation: "The subarray [1] has the largest sum 1." }
    ],
    companies: ["Google", "Amazon", "Microsoft", "Apple", "Facebook"],
    tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
    solution: {
      JavaScript: `function maxSubArray(nums) {
  let maxCurrent = maxGlobal = nums[0];
  for (let i = 1; i < nums.length; i++) {
    maxCurrent = Math.max(nums[i], maxCurrent + nums[i]);
    if (maxCurrent > maxGlobal) {
      maxGlobal = maxCurrent;
    }
  }
  return maxGlobal;
}`,
      Python: `def maxSubArray(nums):
  max_current = max_global = nums[0]
  for num in nums[1:]:
    max_current = max(num, max_current + num)
    if max_current > max_global:
      max_global = max_current
  return max_global`,
      Java: `class Solution {
  public int maxSubArray(int[] nums) {
    int maxCurrent = nums[0], maxGlobal = nums[0];
    for (int i = 1; i < nums.length; i++) {
      maxCurrent = Math.max(nums[i], maxCurrent + nums[i]);
      if (maxCurrent > maxGlobal) {
        maxGlobal = maxCurrent;
      }
    }
    return maxGlobal;
  }
}`
    },
    hints: [
      "Use Kadane's algorithm",
      "Keep track of current sum and maximum sum",
      "If current sum becomes negative, reset it to 0"
    ],
    testCases: [
      { input: [-2,1,-3,4,-1,2,1,-5,4], expected: 6 },
      { input: [1], expected: 1 },
      { input: [5,4,-1,7,8], expected: 23 }
    ],
    stats: {
      acceptanceRate: 72,
      avgTime: 25,
      likes: 1450,
      dislikes: 89,
      solutions: 3120
    },
    dailyChallenge: false,
    premium: false,
    relatedProblems: [53, 152, 918],
    confidenceScore: null,
    userRating: null,
    peerReviews: []
  },
  // Add more problems...
  {
    id: 4,
    title: "Merge Two Binary Trees",
    difficulty: "Easy",
    topic: "Trees",
    description: "You are given two binary trees root1 and root2. Merge the two trees into a new binary tree. The merge rule is that if two nodes overlap, then sum node values up as the new value of the merged node.",
    examples: [
      {
        input: "root1 = [1,3,2,5], root2 = [2,1,3,null,4,null,7]",
        output: "[3,4,5,5,4,null,7]",
        explanation: "Merged tree:\n  3     \n / \\   \n4   5  \n/ \\  \\ \n5  4   7"
      }
    ],
    companies: ["Google", "Microsoft", "Facebook"],
    tags: ["Tree", "Recursion"],
    solution: {
      JavaScript: `function mergeTrees(root1, root2) {
  if (!root1) return root2;
  if (!root2) return root1;

  root1.val += root2.val;
  root1.left = mergeTrees(root1.left, root2.left);
  root1.right = mergeTrees(root1.right, root2.right);

  return root1;
}`,
      Python: `def mergeTrees(root1, root2):
  if not root1: return root2
  if not root2: return root1

  root1.val += root2.val
  root1.left = mergeTrees(root1.left, root2.left)
  root1.right = mergeTrees(root1.right, root2.right)

  return root1`,
      Java: `class Solution {
  public TreeNode mergeTrees(TreeNode root1, TreeNode root2) {
    if (root1 == null) return root2;
    if (root2 == null) return root1;

    root1.val += root2.val;
    root1.left = mergeTrees(root1.left, root2.left);
    root1.right = mergeTrees(root1.right, root2.right);

    return root1;
  }
}`
    },
    hints: [
      "Use a recursive approach",
      "Handle null nodes by returning the non-null node",
      "When both nodes exist, sum their values"
    ],
    testCases: [
      {
        input: { root1: [1,3,2,5], root2: [2,1,3,null,4,null,7] },
        expected: [3,4,5,5,4,null,7]
      },
      {
        input: { root1: [1], root2: [1,2] },
        expected: [2,2]
      }
    ],
    stats: {
      acceptanceRate: 75,
      avgTime: 20,
      likes: 870,
      dislikes: 55,
      solutions: 1980
    },
    dailyChallenge: false,
    premium: false,
    relatedProblems: [100, 104, 617],
    confidenceScore: null,
    userRating: null,
    peerReviews: []
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    description: "Given a string s, return the longest palindromic substring in s.",
    examples: [
      { input: "s = \"babad\"", output: "\"bab\"", explanation: "\"aba\" is also a valid answer." },
      { input: "s = \"cbbd\"", output: "\"bb\"" }
    ],
    companies: ["Amazon", "Microsoft", "Facebook"],
    tags: ["String", "Dynamic Programming"],
    solution: {
      JavaScript: `function longestPalindrome(s) {
  let start = 0, end = 0;

  for (let i = 0; i < s.length; i++) {
    const len1 = expandAroundCenter(s, i, i);
    const len2 = expandAroundCenter(s, i, i + 1);
    const len = Math.max(len1, len2);
    if (len > end - start) {
      start = i - Math.floor((len - 1) / 2);
      end = i + Math.floor(len / 2);
    }
  }

  return s.substring(start, end + 1);
}

function expandAroundCenter(s, left, right) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--;
    right++;
  }
  return right - left - 1;
}`,
      Python: `def longestPalindrome(s):
  def expandAroundCenter(left, right):
    while left >= 0 and right < len(s) and s[left] == s[right]:
      left -= 1
      right += 1
    return right - left - 1

  start = end = 0
  for i in range(len(s)):
    len1 = expandAroundCenter(i, i)
    len2 = expandAroundCenter(i, i + 1)
    max_len = max(len1, len2)
    if max_len > end - start:
      start = i - (max_len - 1) // 2
      end = i + max_len // 2

  return s[start:end + 1]`,
      Java: `class Solution {
  public String longestPalindrome(String s) {
    int start = 0, end = 0;
    for (int i = 0; i < s.length(); i++) {
      int len1 = expandAroundCenter(s, i, i);
      int len2 = expandAroundCenter(s, i, i + 1);
      int len = Math.max(len1, len2);
      if (len > end - start) {
        start = i - (len - 1) / 2;
        end = i + len / 2;
      }
    }
    return s.substring(start, end + 1);
  }

  private int expandAroundCenter(String s, int left, int right) {
    while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
      left--;
      right++;
    }
    return right - left - 1;
  }
}`
    },
    hints: [
      "Consider expanding around the center of palindromes",
      "Handle both odd and even length palindromes",
      "Use a helper function to expand and find the length of palindromes"
    ],
    testCases: [
      { input: "babad", expected: "bab" },
      { input: "cbbd", expected: "bb" },
      { input: "a", expected: "a" },
      { input: "ac", expected: "a" }
    ],
    stats: {
      acceptanceRate: 65,
      avgTime: 30,
      likes: 1200,
      dislikes: 90,
      solutions: 2500
    },
    dailyChallenge: true,
    premium: false,
    relatedProblems: [5, 647, 516],
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

// Enhanced Coding component
const Coding = () => {
  const { showToast } = useToast();
  const { state, actions } = useApp();
  const { loading: apiLoading, execute } = useApi();
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState(null);
=======
const Coding = () => {
  const { showToast } = useToast();
  const { state, actions } = useApp();
  const { loading, execute } = useApi();
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
  const [isRunning, setIsRunning] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [hints, setHints] = useState([]);
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterCompany, setFilterCompany] = useState('all');
<<<<<<< HEAD
  const [filterTopic, setFilterTopic] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [bookmarkedProblems, setBookmarkedProblems] = useState(getBookmarkedProblems());
  const [showPeerReviews, setShowPeerReviews] = useState(false);
  const [peerReviews, setPeerReviews] = useState([]);
  const [showConfidenceAnalysis, setShowConfidenceAnalysis] = useState(false);
  const [showStudyReport, setShowStudyReport] = useState(false);
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const [whiteboardMode, setWhiteboardMode] = useState('drawing');
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [flashcardProgress, setFlashcardProgress] = useState({});
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiMessages, setAiMessages] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [showTestCases, setShowTestCases] = useState(false);
  const [testCaseResults, setTestCaseResults] = useState([]);
  const [showPerformanceMetrics, setShowPerformanceMetrics] = useState(false);
  const [performanceData, setPerformanceData] = useState(null);
  const [showCodeAnalysis, setShowCodeAnalysis] = useState(false);
  const [codeAnalysis, setCodeAnalysis] = useState(null);
  const [showCompanyInsights, setShowCompanyInsights] = useState(false);
  const [companyInsights, setCompanyInsights] = useState(null);
  const [showDailyChallenge, setShowDailyChallenge] = useState(false);
  const [dailyChallenge, setDailyChallenge] = useState(null);
  const [showVoiceCoding, setShowVoiceCoding] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [showCodeHistory, setShowCodeHistory] = useState(false);
  const [codeHistory, setCodeHistory] = useState([]);
  const [showCodeComparison, setShowCodeComparison] = useState(false);
  const [comparisonCode, setComparisonCode] = useState('');
  const [showCodeSharing, setShowCodeSharing] = useState(false);
  const [sharedCodeLink, setSharedCodeLink] = useState('');
  const [showCodeFormatting, setShowCodeFormatting] = useState(false);
  const [formattedCode, setFormattedCode] = useState('');
  const [showCodeExplanation, setShowCodeExplanation] = useState(false);
  const [codeExplanation, setCodeExplanation] = useState('');
  const [showCodeOptimization, setShowCodeOptimization] = useState(false);
  const [optimizedCode, setOptimizedCode] = useState('');
  const [codeDocumentation, setCodeDocumentation] = useState('');
  const [showCodeVisualization, setShowCodeVisualization] = useState(false);
  const [codeVisualization, setCodeVisualization] = useState(null);
  const [showCodeTranslation, setShowCodeTranslation] = useState(false);
  const [translatedCode, setTranslatedCode] = useState('');
  const [translationLanguage, setTranslationLanguage] = useState('python');
  const [showCodeDebugging, setShowCodeDebugging] = useState(false);
  const [debuggingSteps, setDebuggingSteps] = useState([]);
  const [testResults, setTestResults] = useState([]);
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
  const [showCodeDocumentation, setShowCodeDocumentation] = useState(false);
  const [codeDocumentationReport, setCodeDocumentationReport] = useState(null);
  const [showCodeTesting, setShowCodeTesting] = useState(false);
  const [codeTestingReport, setCodeTestingReport] = useState(null);
  const [showCodeDeployment, setShowCodeDeployment] = useState(false);
  const [codeDeploymentReport, setCodeDeploymentReport] = useState(null);
  const [companyInput, setCompanyInput] = useState('');
  const [jobDescInput, setJobDescInput] = useState('');
  const [fetchedQuestions, setFetchedQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [codingChallenges, setCodingChallenges] = useState([]);
  const [codingLoading, setCodingLoading] = useState(false);
  const [codingError, setCodingError] = useState(null);
  const [challengeFilters, setChallengeFilters] = useState({ difficulty: '', language: '', category: '' });

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
  const filteredProblems = useMemo(() => {
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
          // This is a simplified execution - in a real app you would properly execute the code
          let result;
          if (language === 'javascript') {
            // eslint-disable-next-line no-new-func
            const fn = new Function('input', code + `\nreturn ${selectedProblem.id === 1 ? 'twoSum' : 'solution'}(...input);`);
            result = fn(testCase.input);
          } else {
            // For other languages, we would need a proper execution environment
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
        timeComplexity: 'O(n)', // This would be calculated in a real implementation
        spaceComplexity: 'O(1)', // This would be calculated in a real implementation
        executionTime: 120 // ms - would be measured in a real implementation
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
        totalTimeSpent: prev.totalTimeSpent + 15, // minutes
        confidenceScores: {
          ...prev.confidenceScores,
          [selectedProblem.id]: 85 // Example confidence score
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
  }, [selectedProblem, code, language]);

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
  }, [selectedProblem]);

  // Show solution
  const handleShowSolution = useCallback(() => {
    if (selectedProblem) {
      setShowSolution(true);
      showToast('Solution revealed! Make sure you understand it.', 'warning');
    }
  }, [selectedProblem]);

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
    // In a real implementation, this would use a code formatter
    setFormattedCode(code);
    setShowCodeFormatting(true);
    showToast('Code formatted!', 'success');
  }, [code]);

  // Explain code
  const handleExplainCode = useCallback(() => {
    // In a real implementation, this would use an AI service to explain the code
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
    // In a real implementation, this would use an AI service to optimize the code
    const optimized = `// Optimized version of your code
${code.replace(/\/\/.+/g, '')} // Comments removed for brevity
// Additional optimizations would be applied here`;

    setOptimizedCode(optimized);
    setShowCodeOptimization(true);
    showToast('Code optimized!', 'success');
  }, [code]);

  // Generate documentation
  const handleGenerateDocumentation = useCallback(() => {
    // In a real implementation, this would generate proper documentation
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
    // In a real implementation, this would generate a shareable link
    const link = `https://example.com/share?code=${encodeURIComponent(code)}`;
    setSharedCodeLink(link);
    setShowCodeSharing(true);
    showToast('Code sharing link generated!', 'success');
  }, [code]);

  // Handle code translation
  const handleCodeTranslation = useCallback(() => {
    // In a real implementation, this would translate the code to another language
    const translated = `# Translated to Python
${code.replace(/function /g, 'def ').replace(/\{|\}/g, '')}`;

    setTranslatedCode(translated);
    setShowCodeTranslation(true);
    showToast('Code translated!', 'success');
  }, [code, translationLanguage]);

  // Handle code debugging
  const handleCodeDebugging = useCallback(() => {
    // In a real implementation, this would debug the code
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
    // This would run comprehensive tests in a real implementation
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
    // This would refactor the code in a real implementation
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
    // This would review the code in a real implementation
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
    // This would calculate code metrics in a real implementation
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
    // This would analyze code quality in a real implementation
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
    // This would analyze code security in a real implementation
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
    // This would analyze code complexity in a real implementation
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
    // This would check code against standards in a real implementation
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
    // This would check code against best practices in a real implementation
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
    // This would identify code patterns in a real implementation
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
    // This would identify code anti-patterns in a real implementation
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
    // This would analyze code performance in a real implementation
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
    // This would analyze code maintainability in a real implementation
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
    // This would analyze code readability in a real implementation
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
    // This would analyze code documentation in a real implementation
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
    // This would generate a testing report in a real implementation
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
  }, [code]);

  // Handle code deployment
  const handleCodeDeployment = useCallback(() => {
    // This would generate a deployment report in a real implementation
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
  }, [code]);

  // Get daily challenge
  const getDailyChallenge = useCallback(() => {
    // In a real implementation, this would fetch from an API
    const challenge = problemsData.find(p => p.dailyChallenge);
    setDailyChallenge(challenge);
    setShowDailyChallenge(true);
    showToast('Daily challenge loaded!', 'success');
  }, []);

  // Get company insights
  const getCompanyInsights = useCallback(() => {
    // In a real implementation, this would fetch from an API
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

  // Handle confidence analysis
  const handleConfidenceAnalysis = useCallback(() => {
    if (!selectedProblem) return;

    // In a real implementation, this would calculate based on actual performance
    const confidenceScore = 85; // Example score

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
      <div className="coding-container">
        {/* AI Coding Question Search Section */}
        <div className="ai-search-section">
          <h3>AI Coding Question Search</h3>
          <div className="form-group">
            <label htmlFor="company-input">Company name (e.g. Google)</label>
            <input
              id="company-input"
              type="text"
              placeholder="Company name (e.g. Google)"
              value={companyInput}
              onChange={e => setCompanyInput(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="jobdesc-input">Paste job description here...</label>
            <textarea
              id="jobdesc-input"
              placeholder="Paste job description here..."
              value={jobDescInput}
              onChange={e => setJobDescInput(e.target.value)}
              rows={3}
            />
          </div>
          <div className="ai-search-actions">
            <button className="btn btn-primary" onClick={handleFetchCodingQuestions} disabled={loadingQuestions}>
              {loadingQuestions ? 'Fetching...' : 'Fetch coding questions'}
            </button>
            <button className="btn btn-secondary" onClick={handleClearCodingQuestions}>
              Clear
            </button>
          </div>
        </div>
        {/* Optionally, display fetched questions below the AI search section */}
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
        {/* Sidebar with problem list */}
        <div className="problems-sidebar">
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
=======
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Mock problems data
  const [problems] = useState([
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      examples: [
        { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
        { input: "nums = [3,2,4], target = 6", output: "[1,2]" }
      ],
      companies: ["Google", "Amazon", "Microsoft"],
      tags: ["Array", "Hash Table"],
      solution: `function twoSum(nums, target) {
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
      defaultHints: [
        "Think about using a hash map to store numbers you've seen",
        "For each number, check if its complement exists in the hash map",
        "The complement is target - current number"
      ]
    },
    {
      id: 2,
      title: "Valid Parentheses",
      difficulty: "Easy",
      description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      examples: [
        { input: "s = \"()\"", output: "true" },
        { input: "s = \"()[]{}\"", output: "true" },
        { input: "s = \"(]\"", output: "false" }
      ],
      companies: ["Facebook", "Google", "Amazon"],
      tags: ["String", "Stack"],
      solution: `function isValid(s) {
    const stack = [];
    const map = { ')': '(', '}': '{', ']': '[' };
    
    for (let char of s) {
        if (char in map) {
            if (stack.pop() !== map[char]) return false;
        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
}`,
      defaultHints: [
        "Use a stack data structure",
        "Push opening brackets onto the stack",
        "When you see a closing bracket, check if it matches the top of the stack"
      ]
    },
    // Add more problems...
  ]);

  const companies = ["Google", "Amazon", "Microsoft", "Facebook", "Apple", "Netflix"];

  useEffect(() => {
    // Load bookmarked problems from state
    // This is now handled by the global state
  }, []);

  const filteredProblems = problems.filter(problem => {
    const matchesDifficulty = filterDifficulty === 'all' || problem.difficulty.toLowerCase() === filterDifficulty;
    const matchesCompany = filterCompany === 'all' || problem.companies.includes(filterCompany);
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesDifficulty && matchesCompany && matchesSearch;
  });

  const handleProblemSelect = (problem) => {
    setSelectedProblem(problem);
    setCode(getStarterCode(problem, language));
    setOutput('');
    setShowHints(false);
    setShowSolution(false);
    setHints([]);
  };

  const getStarterCode = (problem, lang) => {
    const starters = {
      javascript: `// ${problem.title}
function solution() {
    // Your code here
    
}`,
      python: `# ${problem.title}
def solution():
    # Your code here
    pass`,
      java: `// ${problem.title}
public class Solution {
    public void solution() {
        // Your code here
        
    }
}`
    };
    return starters[lang] || starters.javascript;
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    if (selectedProblem) {
      setCode(getStarterCode(selectedProblem, newLanguage));
    }
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('Running...');
    
    try {
      if (state.backendConnected) {
        const result = await execute(
          () => apiService.analyzeCode(code, language, selectedProblem.description),
          { showErrorToast: false }
        );
        
        if (result.success) {
          setOutput(`Code Analysis:
          
Time Complexity: ${result.data.timeComplexity}
Space Complexity: ${result.data.spaceComplexity}
Code Quality: ${result.data.codeQuality}

Suggestions:
${result.data.suggestions.join('\n')}

Test Results: ✅ All test cases passed!`);
        }
      } else {
        // Simulate code execution for offline mode
        setTimeout(() => {
          setOutput(`Code executed successfully!
          
Test Case 1: ✅ Passed
Test Case 2: ✅ Passed
Test Case 3: ✅ Passed

Time Complexity: O(n)
Space Complexity: O(1)

Great job! Your solution is correct.`);
          
          // Update stats
          actions.updateStats({
            problemsSolved: state.stats.problemsSolved + 1,
            totalPoints: state.stats.totalPoints + 10
          });
          
          showToast('Code executed successfully!', 'success');
        }, 2000);
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const toggleBookmark = (problemId) => {
    if (state.bookmarks.has(problemId)) {
      actions.removeBookmark(problemId);
      showToast('Removed from bookmarks', 'info');
    } else {
      actions.addBookmark(problemId);
      showToast('Added to bookmarks', 'success');
    }
  };

  const handleGetHints = async () => {
    if (selectedProblem.defaultHints) {
      setHints(selectedProblem.defaultHints);
      setShowHints(true);
      showToast('Hints revealed! Try to solve it yourself first.', 'info');
      return;
    }

    try {
      if (state.backendConnected) {
        const result = await execute(
          () => apiService.generateHints(selectedProblem.description, code),
          { showErrorToast: false }
        );
        
        if (result.success) {
          setHints(result.data.map(hint => hint.hint || hint));
          setShowHints(true);
          showToast('AI hints generated!', 'success');
        }
      } else {
        setHints(selectedProblem.defaultHints || ['Try breaking down the problem into smaller steps']);
        setShowHints(true);
        showToast('Hints revealed!', 'info');
      }
    } catch (error) {
      setHints(['Try breaking down the problem into smaller steps']);
      setShowHints(true);
      showToast('Default hints provided', 'info');
    }
  };

  const handleShowSolution = () => {
    setShowSolution(true);
    showToast('Solution revealed! Make sure you understand it.', 'warning');
  };

  return (
    <div className="coding-page">
      <div className="coding-container">
        {/* Problems Sidebar */}
        <div className="problems-sidebar">
          <div className="sidebar-header">
            <h2>Problems</h2>
            <button 
              className="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter />
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="filters">
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
              <div className="search-box">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Search problems..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
<<<<<<< HEAD

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
=======
              
              <div className="filter-group">
                <label>Difficulty:</label>
                <select 
                  value={filterDifficulty} 
                  onChange={(e) => setFilterDifficulty(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
                </select>
              </div>

              <div className="filter-group">
                <label>Company:</label>
<<<<<<< HEAD
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
=======
                <select 
                  value={filterCompany} 
                  onChange={(e) => setFilterCompany(e.target.value)}
                >
                  <option value="all">All Companies</option>
                  {companies.map(company => (
                    <option key={company} value={company}>{company}</option>
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
                  ))}
                </select>
              </div>
            </div>
          )}

<<<<<<< HEAD
          {/* Problem list */}
          <div className="problems-list">
            {filteredProblems.length > 0 ? (
              filteredProblems.map(problem => (
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
                    <span className="acceptance-rate">✅ {problem.stats.acceptanceRate}%</span>
                    <span className="avg-time">⏱️ {problem.stats.avgTime}min</span>
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
        </div>

        {/* Main content area */}
        <div className="main-content">
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
              </div>

              {/* Problem description */}
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
=======
          {/* Problems List */}
          <div className="problems-list">
            {filteredProblems.map(problem => (
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
                  >
                    {state.bookmarks.has(problem.id) ? <FaBookmark /> : <FaRegBookmark />}
                  </button>
                </div>
                <div className="problem-meta">
                  <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>
                    {problem.difficulty}
                  </span>
                  <div className="problem-tags">
                    {problem.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="problem-companies">
                  {problem.companies.slice(0, 3).map(company => (
                    <span key={company} className="company">{company}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {selectedProblem ? (
            <>
              {/* Problem Description */}
              <div className="problem-section">
                <div className="problem-title">
                  <h1>{selectedProblem.title}</h1>
                  <span className={`difficulty ${selectedProblem.difficulty.toLowerCase()}`}>
                    {selectedProblem.difficulty}
                  </span>
                </div>
                
                <div className="problem-description">
                  <p>{selectedProblem.description}</p>
                </div>

                <div className="problem-examples">
                  <h3>Examples:</h3>
                  {selectedProblem.examples.map((example, index) => (
                    <div key={index} className="example">
                      <div><strong>Input:</strong> {example.input}</div>
                      <div><strong>Output:</strong> {example.output}</div>
                    </div>
                  ))}
                </div>

                <div className="problem-tags-section">
                  <h4>Tags:</h4>
                  <div className="tags">
                    {selectedProblem.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="problem-companies-section">
                  <h4>Companies:</h4>
                  <div className="companies">
                    {selectedProblem.companies.map(company => (
                      <span key={company} className="company">{company}</span>
                    ))}
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
                  </div>
                </div>
              </div>

<<<<<<< HEAD
              {/* Code editor */}
              <div className="code-editor-section">
                <div className="editor-header">
                  <div className="language-selector">
                    <select
                      value={language}
                      onChange={(e) => handleLanguageChange(e.target.value)}
                    >
=======
              {/* Code Editor */}
              <div className="editor-section">
                <div className="editor-header">
                  <div className="language-selector">
                    <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python</option>
                      <option value="java">Java</option>
                    </select>
                  </div>
<<<<<<< HEAD

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
=======
                  
                  <div className="editor-actions">
                    <button className="action-btn" title="Voice Coding">
                      <FaMicrophone />
                    </button>
                    <button className="action-btn" title="Whiteboard Mode">
                      <FaDrawPolygon />
                    </button>
                    <button className="action-btn" onClick={handleGetHints} title="Get AI Hints">
                      <FaRobot />
                    </button>
                    <button className="action-btn" title="Peer Reviews">
                      <FaUsers />
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
                    </button>
                  </div>
                </div>

                <textarea
<<<<<<< HEAD
                  ref={codeRef}
=======
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
                  className="code-editor"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Write your code here..."
                />
<<<<<<< HEAD
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
=======

                <div className="editor-footer">
                  <button 
                    className="btn btn-primary"
                    onClick={handleRunCode}
                    disabled={isRunning || loading}
                  >
                    {isRunning || loading ? (
                      <LoadingSpinner size="small" message="" />
                    ) : (
                      <><FaPlay /> Run Code</>
                    )}
                  </button>
                  
                  <button 
                    className="btn btn-secondary"
                    onClick={handleGetHints}
                    disabled={loading}
                  >
                    <FaLightbulb /> Get Hints
                  </button>
                  
                  <button 
                    className="btn btn-warning"
                    onClick={handleShowSolution}
                  >
                    Show Solution
                  </button>
                </div>
              </div>

              {/* Output Section */}
              <div className="output-section">
                <h3>Output</h3>
                <pre className="output-content">{output || 'Run your code to see the output...'}</pre>
              </div>

              {/* Hints Section */}
              {showHints && hints.length > 0 && (
                <div className="hints-section">
                  <h3>💡 Hints</h3>
                  <div className="hints-list">
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
                    {hints.map((hint, index) => (
                      <div key={index} className="hint-item">
                        <span className="hint-number">{index + 1}</span>
                        <span className="hint-text">{hint}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

<<<<<<< HEAD
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
                    {selectedProblem.companies.map(company => {
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

              {/* Confidence Analysis section */}
              {showConfidenceAnalysis && (
                <div className="confidence-analysis-section">
                  <div className="section-header">
                    <h3>Confidence Analysis</h3>
                    <button
                      className="close-btn"
                      onClick={() => setShowConfidenceAnalysis(false)}
                    >
                      ×
                    </button>
                  </div>
                  <div className="confidence-analysis-content">
                    <div className="confidence-score">
                      <h4>Your Confidence Score</h4>
                      <div className="score-display">
                        {userProgress.confidenceScores[selectedProblem.id] || 0}/100
                      </div>
                      <div className="confidence-bar">
                        <div
                          className="confidence-fill"
                          style={{ width: `${userProgress.confidenceScores[selectedProblem.id] || 0}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="confidence-insights">
                      <h4>Insights</h4>
                      <ul>
                        <li>Time taken: 15 minutes (vs avg 12 minutes)</li>
                        <li>Attempts: 1 (excellent!)</li>
                        <li>Topic strength: Medium</li>
                      </ul>
                    </div>
                  </div>
=======
              {/* Solution Section */}
              {showSolution && (
                <div className="solution-section">
                  <h3>🔍 Solution</h3>
                  <pre className="solution-code">{selectedProblem.solution}</pre>
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
                </div>
              )}
            </>
          ) : (
            <div className="no-problem-selected">
              <h2>Select a problem to start coding</h2>
              <p>Choose a problem from the sidebar to begin your practice session.</p>
<<<<<<< HEAD
              <button
                className="daily-challenge-btn"
                onClick={getDailyChallenge}
              >
                <FaCalendar /> Try Today's Challenge
              </button>
=======
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
            </div>
          )}
        </div>
      </div>
<<<<<<< HEAD
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
=======
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
    </div>
  );
};

<<<<<<< HEAD
export default Coding;
=======
export default Coding;
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
