# 🚀 Advanced Interview Preparation Platform

A comprehensive, AI-powered interview preparation platform with cutting-edge features designed to help developers excel in technical interviews.

## ✨ Key Features

### 🤖 AI-Powered Learning
- **AI Code Feedback**: Get instant analysis of your code with complexity analysis, suggestions, and optimizations
- **AI Hints**: Smart hints that adapt to your current solution approach
- **Confidence Scoring**: AI estimates your confidence level based on time taken, attempts, and solution quality
- **Personalized Recommendations**: AI-generated study plans based on your performance patterns

### 📅 Daily Challenges & Gamification
- **Daily Challenge System**: New problem every day with streak tracking
- **Progress Tracking**: Visual progress indicators and achievement badges
- **Streak Maintenance**: Motivational system to encourage consistent practice
- **Performance Analytics**: Detailed insights into your learning journey

### 👥 Community & Collaboration
- **Peer Review System**: Submit and review solutions from other users
- **Voting System**: Upvote/downvote helpful reviews
- **Community Insights**: Learn from the collective wisdom of the community
- **Code Sharing**: Share your solutions and get feedback

### 🏢 Company-Specific Preparation
- **Company Filtering**: Filter problems by specific companies (Google, Amazon, Microsoft, etc.)
- **Company Insights**: Detailed information about interview processes, focus areas, and tips
- **Interview Rounds**: Understand what to expect in different interview stages
- **Common Questions**: Company-specific problem patterns and frequently asked questions

### 🎤 Voice & Accessibility Features
- **Voice Coding**: Dictate your code using speech-to-text technology
- **Accessibility Support**: Voice commands and screen reader compatibility
- **Mobile-Friendly**: Responsive design for practice on any device

### 🖊️ Whiteboard Simulator
- **Drawing Mode**: Sketch diagrams, flowcharts, and visual solutions
- **Text Mode**: Write pseudocode and explanations
- **Shape Tools**: Create professional diagrams for system design questions
- **Real Interview Experience**: Simulate actual whiteboard interview conditions

### 📚 Flashcards & Spaced Repetition
- **Interactive Flashcards**: Learn concepts through spaced repetition
- **Topic Coverage**: Comprehensive coverage of DSA, system design, and CS fundamentals
- **Progress Tracking**: Monitor your retention and understanding
- **Adaptive Learning**: Cards appear based on your performance

### 📊 Advanced Analytics & Reports
- **Study Reports**: Comprehensive analysis of your learning progress
- **Weakness Identification**: AI identifies areas needing improvement
- **Strength Mapping**: Visual representation of your strong topics
- **Recommendation Engine**: Personalized suggestions for next steps

### 🔍 Enhanced Problem Management
- **Rich Problem Metadata**: Acceptance rates, average solve times, company tags
- **Advanced Filtering**: Filter by difficulty, topic, company, and more
- **Bookmarking System**: Save problems for later review
- **Problem Evolution**: Track your progress on specific problems over time

## 🛠️ Technical Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **CSS3**: Advanced styling with gradients, animations, and responsive design
- **Canvas Confetti**: Celebration animations for achievements
- **React Icons**: Comprehensive icon library

### AI Integration
- **Simulated AI Services**: Mock AI responses for code analysis and hints
- **Confidence Scoring Algorithm**: Mathematical model for confidence estimation
- **Personalization Engine**: User behavior analysis and recommendations

### Data Management
- **Local Storage**: Persistent user data and preferences
- **State Management**: React hooks for complex state management
- **Real-time Updates**: Dynamic UI updates based on user interactions

## 🎯 Advanced Features Breakdown

### 1. AI Code Analysis
```javascript
// Example AI feedback response
{
  analysis: {
    timeComplexity: "O(n²) - Consider using a hash map for O(n) solution",
    spaceComplexity: "O(1) - Good space efficiency",
    codeQuality: "Good variable naming and structure",
    suggestions: [
      "Consider using a hash map to reduce time complexity",
      "Add input validation for edge cases"
    ]
  },
  improvements: [
    {
      type: "optimization",
      description: "Use hash map for O(n) time complexity",
      code: "// Optimized solution code"
    }
  ]
}
```

### 2. Confidence Scoring Algorithm
```javascript
const calculateConfidenceScore = (timeSpent, attempts, difficulty, avgTime) => {
  const timeFactor = Math.max(0, 1 - (timeSpent - avgTime) / avgTime);
  const attemptFactor = Math.max(0, 1 - (attempts - 1) * 0.2);
  const difficultyMultiplier = difficulty === 'Easy' ? 1 : difficulty === 'Medium' ? 1.2 : 1.5;
  
  return Math.min(100, Math.max(0, (timeFactor + attemptFactor) * 50 * difficultyMultiplier));
};
```

### 3. Company Insights System
```javascript
const companyInsights = {
  Google: {
    interviewRounds: ["Phone Screen", "Onsite (4-5 rounds)", "System Design"],
    focusAreas: ["Algorithms", "System Design", "Data Structures"],
    commonQuestions: ["Two Sum variations", "Tree traversals", "Dynamic Programming"],
    tips: ["Practice whiteboard coding", "Focus on clean code"]
  }
};
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd interview-prepration

# Install frontend dependencies
cd frontend
npm install

# Start the development server
npm start
```

### Backend Setup (Optional)
```bash
# Install backend dependencies
cd backend
npm install

# Start the backend server
npm start
```

## 📱 Usage Guide

### 1. Daily Challenges
- Check the daily challenge banner on the main page
- Click "Start Challenge" to begin
- Complete the problem to maintain your streak

### 2. AI Features
- Write your code in the editor
- Click "🤖 Get AI Feedback" for code analysis
- Click "💡 Need Help?" for AI-generated hints

### 3. Peer Reviews
- Click "👥 Peer Reviews" to view community feedback
- Vote on helpful reviews
- Submit your own reviews to help others

### 4. Company Preparation
- Use the company filter to find relevant problems
- Click company tags for detailed insights
- Review company-specific interview tips

### 5. Advanced Tools
- **Voice Coding**: Enable voice mode and click the microphone
- **Whiteboard**: Click the whiteboard button for drawing mode
- **Flashcards**: Access the flashcard system for concept review
- **Study Reports**: Generate comprehensive progress reports

## 🎨 UI/UX Features

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interface

### Visual Feedback
- Smooth animations and transitions
- Progress indicators and loading states
- Celebration animations for achievements

### Accessibility
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support

## 🔮 Future Enhancements

### Planned Features
- **Real AI Integration**: Connect to OpenAI, Claude, or similar APIs
- **Video Explanations**: AI-generated video solutions
- **Mock Interview Scheduler**: Schedule practice interviews with mentors
- **Competition Mode**: Weekly coding competitions
- **Mobile App**: Native mobile application
- **Offline Mode**: Practice without internet connection

### Advanced AI Features
- **Natural Language to Code**: Convert descriptions to code
- **Live AI Interviewer**: AI roleplays as an interviewer
- **Behavioral Answer Generator**: AI helps craft STAR stories
- **Custom Question Generator**: AI creates new problems based on parameters

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for details.

### Development Setup
```bash
# Fork the repository
# Create a feature branch
git checkout -b feature/amazing-feature

# Make your changes
# Add tests if applicable

# Commit your changes
git commit -m 'Add amazing feature'

# Push to the branch
git push origin feature/amazing-feature

# Open a Pull Request
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- The open-source community for inspiration
- All contributors and users of this platform

---

**Ready to ace your next interview? Start practicing with our advanced features today! 🎯**

# Interview Preparation Platform

A comprehensive interview preparation platform with AI-powered features for coding practice, MCQs, resume generation, and interview preparation.

## 🚀 Features

- **AI-Powered Resume Generation**: Generate professional resumes using Google's Generative AI
- **Coding Practice**: Extensive collection of coding problems with solutions
- **MCQs**: Company-specific multiple choice questions
- **Interview Reviews**: Company interview experiences and reviews
- **Learning Roadmaps**: Structured learning paths for different domains
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Theme**: Toggle between themes for better user experience

## 🛠️ Tech Stack

### Frontend
- React 17
- React Router DOM
- React Icons
- CSS3 with custom properties
- Responsive design

### Backend
- Node.js
- Express.js
- Google Generative AI (Gemini)
- CORS enabled
- Environment-based configuration

## 📦 Installation

### Prerequisites
- Node.js >= 16.0.0
- npm >= 8.0.0

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd interview-preparation
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp backend/env.example backend/.env
   
   # Edit backend/.env with your configuration
   # Add your Google AI API key
   ```

4. **Start development servers**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start them separately
   npm run backend  # Backend on port 3000
   npm run frontend # Frontend on port 3001
   ```

## 🌐 Deployment

### Deploy to Render

1. **Fork/Clone the repository to your GitHub account**

2. **Connect to Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository

3. **Configure the service**
   - **Name**: `interview-prep-platform`
   - **Environment**: `Node`
   - **Build Command**: `npm run install-all && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: `Starter` (or your preferred plan)

4. **Set Environment Variables**
   - `NODE_ENV`: `production`
   - `GOOGLE_AI_API_KEY`: Your Google AI API key
   - `CORS_ORIGIN`: Your Render app URL
   - `JWT_SECRET`: Auto-generated by Render

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your application

### Alternative: Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Set production environment variables**
   ```bash
   export NODE_ENV=production
   export GOOGLE_AI_API_KEY=your_api_key
   export CORS_ORIGIN=your_domain
   ```

3. **Start the production server**
   ```bash
   npm start
   ```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3000` |
| `GOOGLE_AI_API_KEY` | Google AI API key | Required |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:3000` |
| `JWT_SECRET` | JWT secret for auth | Auto-generated |

### API Endpoints

- `GET /` - Health check
- `POST /generate-resume` - Generate AI resume
- `GET /mcqs` - Get company-specific MCQs
- `GET /interview-questions` - Get coding questions
- `GET /reviews` - Get company reviews

## 📁 Project Structure

```
interview-preparation/
├── backend/                 # Backend API server
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   └── env.example         # Environment variables template
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.js         # Main app component
│   │   └── apiService.js  # API communication
│   ├── public/            # Static files
│   └── package.json       # Frontend dependencies
├── package.json           # Root package.json
├── render.yaml            # Render deployment config
└── README.md             # This file
```

## 🚀 Available Scripts

### Root Level
- `npm run install-all` - Install all dependencies
- `npm run build` - Build frontend for production
- `npm run start` - Start production server
- `npm run dev` - Start development servers
- `npm run backend` - Start backend only
- `npm run frontend` - Start frontend only

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## 🔒 Security

- Environment variables for sensitive data
- CORS configuration for API access
- Input validation and sanitization
- Secure API key handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🔄 Updates

Stay updated with the latest features and improvements by:

1. Following the repository
2. Checking the releases page
3. Reading the changelog

---

**Built with ❤️ for interview preparation** 
# Interview Preparation Platform

A modern, full-featured web application to help users prepare for technical interviews. Practice coding problems, MCQs, and roadmap topics, track your progress, and get company-specific questions—all in one place.

## Features

- **User Authentication:** Sign up, login, logout, and password reset for a personalized experience.
- **Coding Workspace:**
  - Solve coding problems in multiple languages (JavaScript, Python, Java)
  - Run code and see test case results instantly
  - Custom test cases and code saving
  - Hints and solutions
- **MCQs:**
  - Practice multiple-choice questions
  - Filter by company, topic, and difficulty
- **Roadmap:**
  - Study structured topics for DSA, Web Development, System Design, and more
- **Progress Tracking:**
  - Track solved problems, MCQs, and roadmap progress
  - Bookmark favorite questions
- **Gamification:**
  - Earn badges, maintain streaks, and climb the leaderboard
- **Notifications:**
  - Get reminders for study goals, new content, and achievements
- **Modern UI/UX:**
  - Responsive, accessible, and beautiful design
  - Dark mode and theme switching
- **Admin Panel:** (Planned)
  - Manage problems, MCQs, and users
- **Community:** (Planned)
  - Comments, discussions, and user submissions

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/interview-preparation-platform.git
   cd interview-preparation-platform/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend
- The backend is located in the `../backend` directory. See its README for setup instructions.

## Project Structure

```
frontend/
  src/
    components/   # React components (Header, Footer, Coding, MCQs, etc.)
    images/       # Static images and SVGs
    App.js        # Main app component
    apiService.js # API calls (planned for backend integration)
    ...
  public/
    index.html    # Main HTML file
  package.json    # Project dependencies
```

## Technologies Used
- React (with Hooks)
- React Router
- CSS Modules
- [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) for celebration effects
- [react-icons](https://react-icons.github.io/react-icons/)
- LocalStorage for progress/bookmarks (will migrate to backend)

## Contributing

Contributions are welcome! Please open issues and pull requests for new features, bug fixes, or improvements.

## License

MIT

---

*This project is under active development. More features, backend integration, and community tools are coming soon!*
# interview-prep
