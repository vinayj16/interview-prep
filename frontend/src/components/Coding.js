import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  FaPlay, FaStop, FaCode, FaLightbulb, FaRobot, FaBookmark, FaRegBookmark,
  FaFilter, FaSearch, FaClock, FaTrophy, FaBuilding, FaTag, FaUsers,
  FaChartLine, FaHistory, FaShare, FaDownload, FaUpload, FaEye,
  FaMicrophone, FaMicrophoneSlash, FaPalette, FaFileCode, FaGraduationCap,
  FaSpinner, FaTimes, FaCheck, FaExclamationTriangle
} from 'react-icons/fa';
import { useToast } from './Toast/Toast';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import './Coding.css';

// Mock coding problems data
const codingProblems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    companies: ["Google", "Amazon", "Microsoft"],
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
    // Your code here
}`,
      python: `def two_sum(nums, target):
    # Your code here
    pass`,
      java: `public int[] twoSum(int[] nums, int target) {
    // Your code here
}`
    },
    solution: {
      javascript: `function twoSum(nums, target) {
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
      python: `def two_sum(nums, target):
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []`,
      java: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[] { map.get(complement), i };
        }
        map.put(nums[i], i);
    }
    return new int[0];
}`
    },
    testCases: [
      { input: "[2,7,11,15], 9", expected: "[0,1]" },
      { input: "[3,2,4], 6", expected: "[1,2]" },
      { input: "[3,3], 6", expected: "[0,1]" }
    ],
    acceptanceRate: 49.2,
    averageTime: "15 min"
  },
  {
    id: 2,
    title: "Reverse Linked List",
    difficulty: "Easy",
    category: "Linked List",
    companies: ["Facebook", "Apple", "Microsoft"],
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    examples: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]",
        explanation: "The linked list is reversed."
      }
    ],
    constraints: [
      "The number of nodes in the list is the range [0, 5000].",
      "-5000 <= Node.val <= 5000"
    ],
    starterCode: {
      javascript: `function reverseList(head) {
    // Your code here
}`,
      python: `def reverse_list(head):
    # Your code here
    pass`,
      java: `public ListNode reverseList(ListNode head) {
    // Your code here
}`
    },
    solution: {
      javascript: `function reverseList(head) {
    let prev = null;
    let current = head;
    
    while (current !== null) {
        let next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    return prev;
}`,
      python: `def reverse_list(head):
    prev = None
    current = head
    
    while current:
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node
    
    return prev`,
      java: `public ListNode reverseList(ListNode head) {
    ListNode prev = null;
    ListNode current = head;
    
    while (current != null) {
        ListNode next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    return prev;
}`
    },
    testCases: [
      { input: "[1,2,3,4,5]", expected: "[5,4,3,2,1]" },
      { input: "[1,2]", expected: "[2,1]" },
      { input: "[]", expected: "[]" }
    ],
    acceptanceRate: 71.8,
    averageTime: "12 min"
  },
  {
    id: 3,
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    companies: ["Amazon", "Google", "Bloomberg"],
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    examples: [
      {
        input: 's = "()"',
        output: "true",
        explanation: "The string contains valid parentheses."
      },
      {
        input: 's = "()[]{}"',
        output: "true",
        explanation: "All brackets are properly closed."
      },
      {
        input: 's = "(]"',
        output: "false",
        explanation: "Brackets are not properly matched."
      }
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    starterCode: {
      javascript: `function isValid(s) {
    // Your code here
}`,
      python: `def is_valid(s):
    # Your code here
    pass`,
      java: `public boolean isValid(String s) {
    // Your code here
}`
    },
    solution: {
      javascript: `function isValid(s) {
    const stack = [];
    const mapping = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (let char of s) {
        if (char in mapping) {
            if (stack.length === 0 || stack.pop() !== mapping[char]) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }
    
    return stack.length === 0;
}`,
      python: `def is_valid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in mapping:
            if not stack or stack.pop() != mapping[char]:
                return False
        else:
            stack.append(char)
    
    return len(stack) == 0`,
      java: `public boolean isValid(String s) {
    Stack<Character> stack = new Stack<>();
    Map<Character, Character> mapping = new HashMap<>();
    mapping.put(')', '(');
    mapping.put('}', '{');
    mapping.put(']', '[');
    
    for (char c : s.toCharArray()) {
        if (mapping.containsKey(c)) {
            if (stack.isEmpty() || stack.pop() != mapping.get(c)) {
                return false;
            }
        } else {
            stack.push(c);
        }
    }
    
    return stack.isEmpty();
}`
    },
    testCases: [
      { input: '"()"', expected: "true" },
      { input: '"()[]{}"', expected: "true" },
      { input: '"(]"', expected: "false" },
      { input: '"([)]"', expected: "false" },
      { input: '"{[]}"', expected: "true" }
    ],
    acceptanceRate: 40.1,
    averageTime: "18 min"
  }
];

const Coding = () => {
  const { showToast } = useToast();
  const { state, actions } = useApp();
  
  // Core state
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);
  
  // Filter and search state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterCompany, setFilterCompany] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // UI state
  const [showTestCases, setShowTestCases] = useState(false);
  const [bookmarkedProblems, setBookmarkedProblems] = useState(new Set());
  const [solvedProblems, setSolvedProblems] = useState(new Set());
  
  // AI and advanced features state
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);
  const [aiAnalysis, setAIAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showCodeHistory, setShowCodeHistory] = useState(false);
  const [codeHistory, setCodeHistory] = useState([]);
  
  // Voice coding state
  const [isVoiceCoding, setIsVoiceCoding] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  // Code visualization state
  const [showCodeVisualization, setShowCodeVisualization] = useState(false);
  
  // Test results state
  const [testResults, setTestResults] = useState([]);

  // Filter problems based on search and filters
  const filteredProblems = useMemo(() => {
    return codingProblems.filter(problem => {
      const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           problem.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = filterDifficulty === 'all' || problem.difficulty === filterDifficulty;
      const matchesCategory = filterCategory === 'all' || problem.category === filterCategory;
      const matchesCompany = filterCompany === 'all' || problem.companies.includes(filterCompany);
      
      return matchesSearch && matchesDifficulty && matchesCategory && matchesCompany;
    });
  }, [searchTerm, filterDifficulty, filterCategory, filterCompany]);

  // Get unique values for filters
  const difficulties = [...new Set(codingProblems.map(p => p.difficulty))];
  const categories = [...new Set(codingProblems.map(p => p.category))];
  const companies = [...new Set(codingProblems.flatMap(p => p.companies))];

  // Load initial data
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('codingBookmarks');
    const savedSolved = localStorage.getItem('codingSolved');
    
    if (savedBookmarks) {
      setBookmarkedProblems(new Set(JSON.parse(savedBookmarks)));
    }
    
    if (savedSolved) {
      setSolvedProblems(new Set(JSON.parse(savedSolved)));
    }
    
    // Select first problem by default
    if (codingProblems.length > 0) {
      setSelectedProblem(codingProblems[0]);
      setCode(codingProblems[0].starterCode[language]);
    }
  }, []);

  // Update code when language or problem changes
  useEffect(() => {
    if (selectedProblem) {
      setCode(selectedProblem.starterCode[language] || '// Code not available for this language');
    }
  }, [selectedProblem, language]);

  // Save bookmarks and solved problems
  useEffect(() => {
    localStorage.setItem('codingBookmarks', JSON.stringify([...bookmarkedProblems]));
  }, [bookmarkedProblems]);

  useEffect(() => {
    localStorage.setItem('codingSolved', JSON.stringify([...solvedProblems]));
  }, [solvedProblems]);

  const handleProblemSelect = useCallback((problem) => {
    setSelectedProblem(problem);
    setCode(problem.starterCode[language]);
    setOutput('');
    setShowSolution(false);
    setShowHints(false);
    setShowTestCases(false);
    setAIAnalysis(null);
    setTestResults([]);
  }, [language]);

  const handleRunCode = useCallback(async () => {
    if (!code.trim()) {
      showToast('Please write some code first!', 'warning');
      return;
    }

    setIsRunning(true);
    setOutput('Running code...');

    try {
      // Simulate code execution
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock execution result
      const mockOutput = `Code executed successfully!
Input: ${selectedProblem?.testCases[0]?.input || 'No test case'}
Output: ${selectedProblem?.testCases[0]?.expected || 'No expected output'}
Execution time: ${Math.floor(Math.random() * 100) + 50}ms
Memory usage: ${Math.floor(Math.random() * 20) + 10}MB`;

      setOutput(mockOutput);
      
      // Save to code history
      const historyEntry = {
        id: Date.now(),
        code,
        language,
        timestamp: new Date().toISOString(),
        problemId: selectedProblem?.id,
        output: mockOutput
      };
      
      setCodeHistory(prev => [historyEntry, ...prev.slice(0, 9)]); // Keep last 10
      
      showToast('Code executed successfully!', 'success');
    } catch (error) {
      setOutput(`Error: ${error.message}`);
      showToast('Code execution failed', 'error');
    } finally {
      setIsRunning(false);
    }
  }, [code, selectedProblem, language, showToast]);

  const handleSubmitSolution = useCallback(async () => {
    if (!code.trim()) {
      showToast('Please write some code first!', 'warning');
      return;
    }

    setIsRunning(true);
    
    try {
      // Simulate solution submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock test results
      const mockResults = selectedProblem?.testCases.map((testCase, index) => ({
        id: index,
        input: testCase.input,
        expected: testCase.expected,
        actual: testCase.expected, // Mock: assume all pass
        passed: Math.random() > 0.2, // 80% pass rate
        executionTime: Math.floor(Math.random() * 100) + 10
      })) || [];

      setTestResults(mockResults);
      setShowTestCases(true);
      
      const passedCount = mockResults.filter(r => r.passed).length;
      const totalCount = mockResults.length;
      
      if (passedCount === totalCount) {
        setSolvedProblems(prev => new Set([...prev, selectedProblem.id]));
        actions.updateStats({
          problemsSolved: state.stats.problemsSolved + 1,
          totalPoints: state.stats.totalPoints + (selectedProblem.difficulty === 'Easy' ? 10 : selectedProblem.difficulty === 'Medium' ? 20 : 30)
        });
        
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        
        showToast(`All test cases passed! 🎉`, 'success');
      } else {
        showToast(`${passedCount}/${totalCount} test cases passed`, 'warning');
      }
    } catch (error) {
      showToast('Submission failed', 'error');
    } finally {
      setIsRunning(false);
    }
  }, [code, selectedProblem, actions, state.stats, showToast]);

  const handleGetAIAnalysis = useCallback(async () => {
    if (!code.trim()) {
      showToast('Please write some code first!', 'warning');
      return;
    }

    setIsAnalyzing(true);
    setShowAIAnalysis(true);

    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockAnalysis = {
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        codeQuality: 85,
        suggestions: [
          'Consider adding input validation',
          'Variable names could be more descriptive',
          'Add comments for complex logic'
        ],
        strengths: [
          'Efficient algorithm implementation',
          'Good use of data structures',
          'Clean code structure'
        ],
        improvements: [
          'Handle edge cases better',
          'Optimize for readability',
          'Consider alternative approaches'
        ]
      };
      
      setAIAnalysis(mockAnalysis);
      showToast('AI analysis completed!', 'success');
    } catch (error) {
      showToast('AI analysis failed', 'error');
    } finally {
      setIsAnalyzing(false);
    }
  }, [code, showToast]);

  const handleGetHints = useCallback(async () => {
    if (!selectedProblem) return;

    setShowHints(true);
    
    // Mock hints based on problem
    const mockHints = [
      'Think about using a hash map to store values',
      'Consider the two-pointer technique',
      'What data structure would help track seen elements?'
    ];
    
    showToast('Hints revealed!', 'info');
  }, [selectedProblem, showToast]);

  const toggleBookmark = useCallback((problemId) => {
    setBookmarkedProblems(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(problemId)) {
        newBookmarks.delete(problemId);
        showToast('Bookmark removed', 'info');
      } else {
        newBookmarks.add(problemId);
        showToast('Problem bookmarked!', 'success');
      }
      return newBookmarks;
    });
  }, [showToast]);

  const toggleVoiceCoding = useCallback(() => {
    if (!isVoiceCoding) {
      // Start voice coding
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        setIsVoiceCoding(true);
        setIsListening(true);
        showToast('Voice coding activated! Start speaking...', 'info');
        
        // Mock voice recognition
        setTimeout(() => {
          setIsListening(false);
          showToast('Voice input processed', 'success');
        }, 3000);
      } else {
        showToast('Speech recognition not supported in this browser', 'error');
      }
    } else {
      setIsVoiceCoding(false);
      setIsListening(false);
      showToast('Voice coding deactivated', 'info');
    }
  }, [isVoiceCoding, showToast]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#10b981';
      case 'Medium': return '#f59e0b';
      case 'Hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="coding-page">
      {/* AI Search Section */}
      <div className="ai-search-card">
        <div className="search-header">
          <h2>🤖 AI-Powered Coding Practice</h2>
          <p>Search for problems, get AI hints, and track your progress</p>
        </div>
        
        <div className="search-controls">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search problems by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> Filters
          </button>
        </div>

        {showFilters && (
          <div className="filters-section">
            <div className="filter-group">
              <label>Difficulty:</label>
              <select value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value)}>
                <option value="all">All</option>
                {difficulties.map(diff => (
                  <option key={diff} value={diff}>{diff}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>Category:</label>
              <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="all">All</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>Company:</label>
              <select value={filterCompany} onChange={(e) => setFilterCompany(e.target.value)}>
                <option value="all">All</option>
                {companies.map(company => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="coding-main-flex">
        {/* Problems Sidebar */}
        <div className="problems-sidebar">
          <div className="sidebar-header">
            <h2>Problems ({filteredProblems.length})</h2>
          </div>
          
          <div className="problems-list">
            {filteredProblems.length === 0 ? (
              <div className="no-problems">
                <p>No problems match your filters</p>
              </div>
            ) : (
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
                    >
                      {bookmarkedProblems.has(problem.id) ? <FaBookmark /> : <FaRegBookmark />}
                    </button>
                  </div>
                  
                  <div className="problem-meta">
                    <span 
                      className="difficulty-badge"
                      style={{ backgroundColor: getDifficultyColor(problem.difficulty) }}
                    >
                      {problem.difficulty}
                    </span>
                    <span className="category">{problem.category}</span>
                  </div>
                  
                  <div className="problem-stats">
                    <div className="stat-item">
                      <FaClock />
                      <span>{problem.averageTime}</span>
                    </div>
                    <div className="stat-item">
                      <FaTrophy />
                      <span>{problem.acceptanceRate}%</span>
                    </div>
                  </div>
                  
                  <div className="problem-companies">
                    {problem.companies.slice(0, 3).map(company => (
                      <span key={company} className="company-tag">{company}</span>
                    ))}
                  </div>
                  
                  {solvedProblems.has(problem.id) && (
                    <div className="solved-indicator">
                      <FaCheck /> Solved
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="coding-main-content">
          {!selectedProblem ? (
            <div className="no-problem-selected">
              <h2>Select a Problem</h2>
              <p>Choose a coding problem from the sidebar to start practicing</p>
            </div>
          ) : (
            <>
              {/* Problem Header */}
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
                    onClick={() => toggleBookmark(selectedProblem.id)}
                    title="Bookmark"
                  >
                    {bookmarkedProblems.has(selectedProblem.id) ? <FaBookmark /> : <FaRegBookmark />}
                  </button>
                  
                  <button
                    className="action-btn"
                    onClick={handleGetHints}
                    title="Get Hints"
                  >
                    <FaLightbulb />
                  </button>
                  
                  <button
                    className="action-btn"
                    onClick={() => setShowSolution(!showSolution)}
                    title="View Solution"
                  >
                    <FaEye />
                  </button>
                </div>
              </div>

              {/* Problem Description */}
              <div className="problem-description">
                <div className="problem-content">
                  <p>{selectedProblem.description}</p>
                  
                  <div className="examples-section">
                    <h3>Examples</h3>
                    {selectedProblem.examples.map((example, index) => (
                      <div key={index} className="example">
                        <strong>Input:</strong> {example.input}<br />
                        <strong>Output:</strong> {example.output}<br />
                        {example.explanation && (
                          <>
                            <strong>Explanation:</strong> {example.explanation}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="constraints-section">
                    <h3>Constraints</h3>
                    <ul>
                      {selectedProblem.constraints.map((constraint, index) => (
                        <li key={index}>{constraint}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="problem-meta-info">
                  <div className="stats">
                    <div className="stat-item">
                      <FaTrophy />
                      <span>{selectedProblem.acceptanceRate}% Acceptance</span>
                    </div>
                    <div className="stat-item">
                      <FaClock />
                      <span>Avg: {selectedProblem.averageTime}</span>
                    </div>
                  </div>
                  
                  <div className="problem-companies">
                    <h4>Companies</h4>
                    {selectedProblem.companies.map(company => (
                      <span key={company} className="company-tag">
                        <FaBuilding /> {company}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Code Editor Section */}
              <div className="code-editor-section">
                <div className="editor-header">
                  <div className="language-selector">
                    <label>Language:</label>
                    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python</option>
                      <option value="java">Java</option>
                    </select>
                  </div>
                  
                  <div className="editor-actions">
                    <button
                      className="action-btn"
                      onClick={toggleVoiceCoding}
                      title="Voice Coding"
                    >
                      {isVoiceCoding ? <FaMicrophone /> : <FaMicrophoneSlash />}
                      {isListening && <span className="listening-indicator">●</span>}
                    </button>
                    
                    <button
                      className="action-btn"
                      onClick={() => setShowCodeHistory(!showCodeHistory)}
                      title="Code History"
                    >
                      <FaHistory />
                    </button>
                  </div>
                </div>
                
                <textarea
                  className="code-editor"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Write your code here..."
                  spellCheck={false}
                />
                
                <div className="code-actions">
                  <button
                    className="run-btn"
                    onClick={handleRunCode}
                    disabled={isRunning}
                  >
                    {isRunning ? <FaSpinner className="spinner" /> : <FaPlay />}
                    {isRunning ? 'Running...' : 'Run Code'}
                  </button>
                  
                  <button
                    className="submit-btn"
                    onClick={handleSubmitSolution}
                    disabled={isRunning}
                  >
                    {isRunning ? <FaSpinner className="spinner" /> : <FaCheck />}
                    Submit
                  </button>
                  
                  <button
                    className="ai-btn"
                    onClick={handleGetAIAnalysis}
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? <FaSpinner className="spinner" /> : <FaRobot />}
                    AI Analysis
                  </button>
                </div>
              </div>

              {/* Output Section */}
              {output && (
                <div className="output-section">
                  <h3>Output</h3>
                  <pre className="output-content">{output}</pre>
                </div>
              )}

              {/* Test Cases Section */}
              {showTestCases && testResults.length > 0 && (
                <div className="test-cases-section">
                  <div className="section-header">
                    <h3>Test Results</h3>
                    <button
                      className="close-btn"
                      onClick={() => setShowTestCases(false)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                  
                  <div className="test-cases-content">
                    {testResults.map((result, index) => (
                      <div
                        key={result.id}
                        className={`test-case ${result.passed ? 'passed' : 'failed'}`}
                      >
                        <div className="test-case-header">
                          <span>Test Case {index + 1}</span>
                          <span className={`test-case-status ${result.passed ? 'passed' : 'failed'}`}>
                            {result.passed ? 'PASSED' : 'FAILED'}
                          </span>
                        </div>
                        <div><strong>Input:</strong> {result.input}</div>
                        <div><strong>Expected:</strong> {result.expected}</div>
                        <div><strong>Actual:</strong> {result.actual}</div>
                        <div><strong>Time:</strong> {result.executionTime}ms</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Analysis Section */}
              {showAIAnalysis && (
                <div className="ai-analysis-section">
                  <div className="section-header">
                    <h3>🤖 AI Code Analysis</h3>
                    <button
                      className="close-btn"
                      onClick={() => setShowAIAnalysis(false)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                  
                  {isAnalyzing ? (
                    <div className="analyzing">
                      <FaSpinner className="spinner" />
                      <p>Analyzing your code...</p>
                    </div>
                  ) : aiAnalysis ? (
                    <div className="analysis-content">
                      <div className="complexity-analysis">
                        <h4>Complexity Analysis</h4>
                        <p><strong>Time Complexity:</strong> {aiAnalysis.timeComplexity}</p>
                        <p><strong>Space Complexity:</strong> {aiAnalysis.spaceComplexity}</p>
                        <p><strong>Code Quality Score:</strong> {aiAnalysis.codeQuality}/100</p>
                      </div>
                      
                      <div className="suggestions">
                        <h4>Suggestions</h4>
                        <ul>
                          {aiAnalysis.suggestions.map((suggestion, index) => (
                            <li key={index}>{suggestion}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="strengths">
                        <h4>Strengths</h4>
                        <ul>
                          {aiAnalysis.strengths.map((strength, index) => (
                            <li key={index} className="strength">
                              <FaCheck /> {strength}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="improvements">
                        <h4>Areas for Improvement</h4>
                        <ul>
                          {aiAnalysis.improvements.map((improvement, index) => (
                            <li key={index} className="improvement">
                              <FaExclamationTriangle /> {improvement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : null}
                </div>
              )}

              {/* Hints Section */}
              {showHints && (
                <div className="hints-section">
                  <div className="section-header">
                    <h3>💡 Hints</h3>
                    <button
                      className="close-btn"
                      onClick={() => setShowHints(false)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                  
                  <div className="hints-content">
                    <div className="hint">
                      <strong>Hint 1:</strong> Think about using a hash map to store values you've seen before.
                    </div>
                    <div className="hint">
                      <strong>Hint 2:</strong> For each number, calculate what its complement should be.
                    </div>
                    <div className="hint">
                      <strong>Hint 3:</strong> You only need to iterate through the array once.
                    </div>
                  </div>
                </div>
              )}

              {/* Solution Section */}
              {showSolution && (
                <div className="solution-section">
                  <div className="section-header">
                    <h3>💡 Solution</h3>
                    <button
                      className="close-btn"
                      onClick={() => setShowSolution(false)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                  
                  <div className="solution-content">
                    <pre className="solution-code">
                      {selectedProblem.solution[language]}
                    </pre>
                  </div>
                </div>
              )}

              {/* Code History Section */}
              {showCodeHistory && codeHistory.length > 0 && (
                <div className="code-history-section">
                  <div className="section-header">
                    <h3>📝 Code History</h3>
                    <button
                      className="close-btn"
                      onClick={() => setShowCodeHistory(false)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                  
                  <div className="history-content">
                    {codeHistory.map((entry, index) => (
                      <div key={entry.id} className="history-entry">
                        <div className="history-header">
                          <span>Version {index + 1}</span>
                          <span>{new Date(entry.timestamp).toLocaleString()}</span>
                          <button
                            className="restore-btn"
                            onClick={() => setCode(entry.code)}
                          >
                            Restore
                          </button>
                        </div>
                        <pre className="history-code">{entry.code.substring(0, 200)}...</pre>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Coding;