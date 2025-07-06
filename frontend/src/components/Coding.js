import React, { useState, useEffect } from 'react';
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
    
    // Simulate code execution
    setTimeout(() => {
      setOutput(`Code executed successfully!
      
Test Case 1: ✅ Passed
Test Case 2: ✅ Passed
Test Case 3: ✅ Passed

Time Complexity: O(n)
Space Complexity: O(1)

Great job! Your solution is correct.`);
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
                  <option value="all">All</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
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
            </div>
          )}

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
                    {bookmarkedProblems.has(problem.id) ? <FaBookmark /> : <FaRegBookmark />}
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
                  </div>
                </div>
              </div>

              {/* Code Editor */}
              <div className="editor-section">
                <div className="editor-header">
                  <div className="language-selector">
                    <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python</option>
                      <option value="java">Java</option>
                    </select>
                  </div>
                  
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
                    </button>
                  </div>
                </div>

                <textarea
                  className="code-editor"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Write your code here..."
                />

                <div className="editor-footer">
                  <button 
                    className="btn btn-primary"
                    onClick={handleRunCode}
                    disabled={isRunning}
                  >
                    <FaPlay /> {isRunning ? 'Running...' : 'Run Code'}
                  </button>
                  
                  <button 
                    className="btn btn-secondary"
                    onClick={handleGetHints}
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
              {showHints && (
                <div className="hints-section">
                  <h3>💡 Hints</h3>
                  <div className="hints-list">
                    {selectedProblem.hints.map((hint, index) => (
                      <div key={index} className="hint-item">
                        <span className="hint-number">{index + 1}</span>
                        <span className="hint-text">{hint}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Solution Section */}
              {showSolution && (
                <div className="solution-section">
                  <h3>🔍 Solution</h3>
                  <pre className="solution-code">{selectedProblem.solution}</pre>
                </div>
              )}
            </>
          ) : (
            <div className="no-problem-selected">
              <h2>Select a problem to start coding</h2>
              <p>Choose a problem from the sidebar to begin your practice session.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Coding;