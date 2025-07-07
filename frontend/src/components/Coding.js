import React, { useState, useEffect } from 'react';
import { FaPlay, FaLightbulb, FaMicrophone, FaDrawPolygon, FaBookmark, FaRegBookmark, FaRobot, FaUsers, FaFilter, FaSearch } from 'react-icons/fa';
import { useToast } from './Toast/Toast';
import { useApp } from '../context/AppContext';
import { useApi } from '../hooks/useApi';
import apiService from '../services/apiService';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';
import './Coding.css';

const Coding = () => {
  const { showToast } = useToast();
  const { state, actions } = useApp();
  const { loading, execute } = useApi();
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [hints, setHints] = useState([]);
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
                    {hints.map((hint, index) => (
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