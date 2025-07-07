import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button, Grid, Chip, TextField, CircularProgress, IconButton, Tooltip, Select, MenuItem, InputAdornment, Alert } from '@mui/material';
import { FaPlay, FaLightbulb, FaMicrophone, FaDrawPolygon, FaBookmark, FaRegBookmark, FaRobot, FaUsers, FaFilter, FaSearch } from 'react-icons/fa';
import { useToast } from './Toast/Toast';
import './Coding.css';

const Coding = ({ user }) => {
  const { showToast } = useToast();
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [bookmarkedProblems, setBookmarkedProblems] = useState(new Set());
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterCompany, setFilterCompany] = useState('all');
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
      hints: [
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
      hints: [
        "Use a stack data structure",
        "Push opening brackets onto the stack",
        "When you see a closing bracket, check if it matches the top of the stack"
      ]
    },
    {
      id: 3,
      title: "Merge Two Sorted Lists",
      difficulty: "Easy",
      description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a sorted manner.",
      examples: [
        { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" }
      ],
      companies: ["Amazon", "Microsoft", "Apple"],
      tags: ["Linked List", "Recursion"],
      solution: `function mergeTwoLists(list1, list2) {
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (list1 && list2) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }
    
    current.next = list1 || list2;
    return dummy.next;
}`,
      hints: [
        "Use a dummy node to simplify the logic",
        "Compare the values of the current nodes",
        "Move the pointer of the smaller value"
      ]
    },
    {
      id: 4,
      title: "Maximum Subarray",
      difficulty: "Medium",
      description: "Given an integer array nums, find the contiguous subarray which has the largest sum and return its sum.",
      examples: [
        { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6" },
        { input: "nums = [1]", output: "1" }
      ],
      companies: ["Google", "Amazon", "Facebook"],
      tags: ["Array", "Dynamic Programming"],
      solution: `function maxSubArray(nums) {
    let maxSoFar = nums[0];
    let maxEndingHere = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    
    return maxSoFar;
}`,
      hints: [
        "This is Kadane's algorithm",
        "Keep track of the maximum sum ending at current position",
        "At each step, decide whether to extend the existing subarray or start a new one"
      ]
    },
    {
      id: 5,
      title: "Climbing Stairs",
      difficulty: "Easy",
      description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
      examples: [
        { input: "n = 2", output: "2" },
        { input: "n = 3", output: "3" }
      ],
      companies: ["Amazon", "Google", "Adobe"],
      tags: ["Dynamic Programming", "Math"],
      solution: `function climbStairs(n) {
    if (n <= 2) return n;
    
    let prev2 = 1;
    let prev1 = 2;
    
    for (let i = 3; i <= n; i++) {
        let current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}`,
      hints: [
        "This is similar to the Fibonacci sequence",
        "The number of ways to reach step n is the sum of ways to reach step n-1 and n-2",
        "You can optimize space by only keeping track of the last two values"
      ]
    }
  ]);

  const companies = ["Google", "Amazon", "Microsoft", "Facebook", "Apple", "Netflix", "Adobe"];

  useEffect(() => {
    // Load bookmarked problems from localStorage
    const saved = localStorage.getItem('bookmarkedProblems');
    if (saved) {
      setBookmarkedProblems(new Set(JSON.parse(saved)));
    }
  }, []);

  useEffect(() => {
    // Save bookmarked problems to localStorage
    localStorage.setItem('bookmarkedProblems', JSON.stringify([...bookmarkedProblems]));
  }, [bookmarkedProblems]);

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
  };

  const getStarterCode = (problem, lang) => {
    const starters = {
      javascript: `// ${problem.title}\nfunction solution() {\n    // Your code here\n    \n}`,
      python: `# ${problem.title}\ndef solution():\n    # Your code here\n    pass`,
      java: `// ${problem.title}\npublic class Solution {\n    public void solution() {\n        // Your code here\n        \n    }\n}`
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
    
    // Simulate code execution
    setTimeout(() => {
      setOutput(`Code executed successfully!\n\nTest Case 1: ✅ Passed\nTest Case 2: ✅ Passed\nTest Case 3: ✅ Passed\n\nTime Complexity: O(n)\nSpace Complexity: O(1)\n\nGreat job! Your solution is correct.`);
      setIsRunning(false);
      showToast('Code executed successfully!', 'success');
    }, 2000);
  };

  const toggleBookmark = (problemId) => {
    const newBookmarks = new Set(bookmarkedProblems);
    if (newBookmarks.has(problemId)) {
      newBookmarks.delete(problemId);
      showToast('Removed from bookmarks', 'info');
    } else {
      newBookmarks.add(problemId);
      showToast('Added to bookmarks', 'success');
    }
    setBookmarkedProblems(newBookmarks);
  };

  const handleGetHints = () => {
    setShowHints(true);
    showToast('Hints revealed! Try to solve it yourself first.', 'info');
  };

  const handleShowSolution = () => {
    setShowSolution(true);
    showToast('Solution revealed! Make sure you understand it.', 'warning');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '80vh', background: 'background.default' }}>
      {/* Problems Sidebar */}
      <Box sx={{ width: { xs: 240, md: 320 }, borderRight: 1, borderColor: 'divider', p: 2, bgcolor: 'background.paper' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6" fontWeight={700}>Problems</Typography>
          <Tooltip title="Show Filters">
            <IconButton onClick={() => setShowFilters(!showFilters)} aria-label="Toggle Filters">
              <FaFilter />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Filters */}
        {showFilters && (
          <Box mb={2}>
            <TextField
              label="Search problems..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaSearch />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            
            <Select
              value={filterDifficulty}
              onChange={e => setFilterDifficulty(e.target.value)}
              size="small"
              fullWidth
              sx={{ mb: 2 }}
            >
              <MenuItem value="all">All Difficulties</MenuItem>
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
            </Select>

            <Select
              value={filterCompany}
              onChange={e => setFilterCompany(e.target.value)}
              size="small"
              fullWidth
            >
              <MenuItem value="all">All Companies</MenuItem>
              {companies.map(company => (
                <MenuItem key={company} value={company}>{company}</MenuItem>
              ))}
            </Select>
          </Box>
        )}

        {/* Problems List */}
        <Box sx={{ overflowY: 'auto', maxHeight: '70vh' }}>
          {filteredProblems.map(problem => (
            <Card
              key={problem.id}
              variant={selectedProblem?.id === problem.id ? 'elevation' : 'outlined'}
              elevation={selectedProblem?.id === problem.id ? 4 : 0}
              sx={{ mb: 2, cursor: 'pointer', borderLeft: selectedProblem?.id === problem.id ? '4px solid #1976d2' : 'none', bgcolor: selectedProblem?.id === problem.id ? 'action.selected' : 'background.paper' }}
              onClick={() => handleProblemSelect(problem)}
              aria-label={`Select problem: ${problem.title}`}
            >
              <CardContent sx={{ pb: '8px !important' }}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography fontWeight={700}>{problem.title}</Typography>
                  <IconButton size="small" onClick={e => { e.stopPropagation(); toggleBookmark(problem.id); }} aria-label={bookmarkedProblems.has(problem.id) ? 'Remove Bookmark' : 'Add Bookmark'}>
                    {bookmarkedProblems.has(problem.id) ? <FaBookmark color="#1976d2" /> : <FaRegBookmark />}
                  </IconButton>
                </Box>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <Chip label={problem.difficulty} size="small" color={problem.difficulty === 'Easy' ? 'success' : problem.difficulty === 'Medium' ? 'warning' : 'error'} />
                  <div className="problem-tags">
                    {problem.tags.slice(0, 2).map(tag => (
                      <Chip key={tag} label={tag} size="small" variant="outlined" />
                    ))}
                  </div>
                </Box>
                <Box mt={1} display="flex" flexWrap="wrap" gap={0.5}>
                  {problem.companies.slice(0, 3).map(company => (
                    <Chip key={company} label={company} size="small" color="info" variant="outlined" />
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, p: { xs: 1, sm: 3 } }}>
        {selectedProblem ? (
          <>
            <Card elevation={2} sx={{ mb: 3, p: 3 }}>
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <Typography variant="h5" fontWeight={700}>{selectedProblem.title}</Typography>
                <Chip label={selectedProblem.difficulty} size="small" color={selectedProblem.difficulty === 'Easy' ? 'success' : selectedProblem.difficulty === 'Medium' ? 'warning' : 'error'} />
              </Box>
              <Typography color="text.secondary" mb={2}>{selectedProblem.description}</Typography>
              <Box mb={2}>
                <Typography fontWeight={600}>Examples:</Typography>
                {selectedProblem.examples.map((example, idx) => (
                  <Card key={idx} variant="outlined" sx={{ mb: 1, p: 1 }}>
                    <Typography><strong>Input:</strong> {example.input}</Typography>
                    <Typography><strong>Output:</strong> {example.output}</Typography>
                  </Card>
                ))}
              </Box>
              <Box mb={2}>
                <Typography fontWeight={600}>Tags:</Typography>
                <Box display="flex" gap={1} flexWrap="wrap">
                  {selectedProblem.tags.map(tag => (
                    <Chip key={tag} label={tag} size="small" variant="outlined" />
                  ))}
                </Box>
              </Box>
              <Box mb={2}>
                <Typography fontWeight={600}>Companies:</Typography>
                <Box display="flex" gap={1} flexWrap="wrap">
                  {selectedProblem.companies.map(company => (
                    <Chip key={company} label={company} size="small" color="info" variant="outlined" />
                  ))}
                </Box>
              </Box>
            </Card>

            {/* Code Editor */}
            <Card elevation={2} sx={{ mb: 3, p: 3 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Select value={language} onChange={e => handleLanguageChange(e.target.value)} size="small">
                  <MenuItem value="javascript">JavaScript</MenuItem>
                  <MenuItem value="python">Python</MenuItem>
                  <MenuItem value="java">Java</MenuItem>
                </Select>
                <Box display="flex" gap={1}>
                  <Tooltip title="Voice Coding"><IconButton><FaMicrophone /></IconButton></Tooltip>
                  <Tooltip title="Whiteboard Mode"><IconButton><FaDrawPolygon /></IconButton></Tooltip>
                  <Tooltip title="Get AI Hints"><IconButton onClick={handleGetHints}><FaRobot /></IconButton></Tooltip>
                  <Tooltip title="Peer Reviews"><IconButton><FaUsers /></IconButton></Tooltip>
                </Box>
              </Box>
              <TextField
                multiline
                minRows={10}
                maxRows={20}
                fullWidth
                value={code}
                onChange={e => setCode(e.target.value)}
                placeholder="Write your code here..."
                sx={{ fontFamily: 'Fira Mono, monospace', mb: 2 }}
                InputProps={{ style: { fontFamily: 'Fira Mono, monospace' } }}
                aria-label="Code Editor"
              />
              <Box display="flex" gap={2}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={isRunning ? <CircularProgress size={18} /> : <FaPlay />}
                  onClick={handleRunCode}
                  disabled={isRunning}
                  aria-label="Run Code"
                >
                  {isRunning ? 'Running...' : 'Run Code'}
                </Button>
                <Button variant="outlined" color="info" startIcon={<FaLightbulb />} onClick={handleGetHints}>Get Hints</Button>
                <Button variant="outlined" color="warning" onClick={handleShowSolution}>Show Solution</Button>
              </Box>
            </Card>

            {/* Output Section */}
            <Card elevation={2} sx={{ mb: 3, p: 3 }}>
              <Typography fontWeight={600} mb={1}>Output</Typography>
              <Box sx={{ bgcolor: 'background.default', borderRadius: 1, p: 2, minHeight: 80 }}>
                <Typography component="pre" sx={{ fontFamily: 'Fira Mono, monospace', m: 0 }}>
                  {output || 'Run your code to see the output...'}
                </Typography>
              </Box>
            </Card>

            {/* Hints Section */}
            {showHints && (
              <Alert severity="info" sx={{ mb: 2 }} icon={<FaLightbulb />}>
                <Typography fontWeight={700}>Hints</Typography>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {selectedProblem.hints.map((hint, idx) => (
                    <li key={idx}>{hint}</li>
                  ))}
                </ul>
              </Alert>
            )}

            {/* Solution Section */}
            {showSolution && (
              <Alert severity="success" sx={{ mb: 2 }}>
                <Typography fontWeight={700}>Solution</Typography>
                <Typography component="pre" sx={{ fontFamily: 'Fira Mono, monospace', m: 0 }}>
                  {selectedProblem.solution}
                </Typography>
              </Alert>
            )}
          </>
        ) : (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="60vh">
            <Typography variant="h5" fontWeight={700} mb={2}>Select a problem to start coding</Typography>
            <Typography color="text.secondary">Choose a problem from the sidebar to begin your practice session.</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Coding;