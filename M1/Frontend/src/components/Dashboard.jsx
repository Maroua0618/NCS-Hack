import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  MapPin, 
  FileText, 
  Radio,
  MessageCircle,
  X,
  Search,
  Bell,
  Settings,
  User,
  Clock,
  Target,
  TrendingUp,
  CheckCircle,
  Play,
  Book,
  Video,
  Award,
  Calendar,
  ExternalLink,
  ArrowRight,
  Star,
  Zap,
  Trophy,
  RefreshCw,
  Brain,
  RotateCcw,
  Check
} from 'lucide-react';

// Import required components
import Chatbot from './Chatbot';
import Courses from './Courses';
import Progress from './Progress';

// Mock Data for Dashboard
const mockData = {
  stats: {
    totalCourses: 12,
    completedCourses: 8,
    hoursStudied: 156,
    certificates: 5
  },
  recentActivities: [
    { id: 1, type: 'course_completed', title: 'React Advanced Concepts', date: '2024-01-15' },
    { id: 2, type: 'milestone', title: 'Frontend Development', date: '2024-01-14' },
    { id: 3, type: 'study_session', title: '2 hours study session', date: '2024-01-13' }
  ],
  upcomingTasks: [
    { id: 1, title: 'Complete JavaScript Module', dueDate: '2024-01-20', priority: 'high' },
    { id: 2, title: 'Submit Portfolio Project', dueDate: '2024-01-25', priority: 'medium' },
    { id: 3, title: 'Review CSS Grid Concepts', dueDate: '2024-01-30', priority: 'low' }
  ]
};

// Roadmap Component with 3D Milestones and AI Flashcards
const Roadmap = () => {
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFlashcardModalOpen, setIsFlashcardModalOpen] = useState(false);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userGoal, setUserGoal] = useState(null);

  // Generate roadmap and flashcards based on stored user preferences
  useEffect(() => {
    const storedGoal = localStorage.getItem('userStudyGoal');
    if (storedGoal) {
      setUserGoal(JSON.parse(storedGoal));
    }

    // Simulate AI-generated roadmap and flashcards
    setTimeout(() => {
      const goal = storedGoal ? JSON.parse(storedGoal) : null;
      const generatedRoadmap = generateRoadmap(goal);
      const generatedFlashcards = generateFlashcards(goal);
      setMilestones(generatedRoadmap);
      setFlashcards(generatedFlashcards);
      setIsLoading(false);
    }, 2000);
  }, []);

  const generateRoadmap = (goalData) => {
    const topic = goalData?.topic || 'General Learning';
    const timeCommitment = goalData?.timeCommitment || 'self-paced';
    
    return [
      {
        id: 1,
        title: "Foundation & Setup",
        description: `Master the fundamentals of ${topic} and establish your learning environment`,
        status: "completed",
        estimatedTime: timeCommitment === '1week' ? "2-3 days" : 
                      timeCommitment === '2weeks' ? "1 week" : "1-2 weeks",
        difficulty: "Beginner",
        position: { x: 50, y: 20 },
        resources: [
          { type: "video", title: `${topic} Fundamentals`, url: "#", duration: "45 min" },
          { type: "article", title: "Getting Started Guide", url: "#", readTime: "15 min" },
          { type: "practice", title: "Basic Exercises", url: "#", exercises: 8 }
        ],
        skills: ["Basic Concepts", "Environment Setup", "Tool Familiarization"],
        xp: 150,
        color: "from-green-400 to-green-600"
      },
      {
        id: 2,
        title: "Core Concepts",
        description: `Deep dive into essential ${topic} principles and methodologies`,
        status: "in-progress",
        estimatedTime: timeCommitment === '1week' ? "1 week" : 
                      timeCommitment === '2weeks' ? "1-2 weeks" : "2-3 weeks",
        difficulty: "Intermediate",
        position: { x: 30, y: 40 },
        resources: [
          { type: "video", title: "Advanced Concepts", url: "#", duration: "2.5 hours" },
          { type: "article", title: "Best Practices", url: "#", readTime: "30 min" },
          { type: "project", title: "Practice Project", url: "#", complexity: "Intermediate" },
          { type: "quiz", title: "Knowledge Assessment", url: "#", questions: 25 }
        ],
        skills: ["Problem Solving", "Critical Thinking", "Pattern Recognition", "Analysis"],
        xp: 300,
        color: "from-blue-400 to-blue-600"
      },
      {
        id: 3,
        title: "Advanced Applications",
        description: `Apply ${topic} concepts to complex real-world scenarios`,
        status: "locked",
        estimatedTime: timeCommitment === '1week' ? "1-2 weeks" : 
                      timeCommitment === '2weeks' ? "2-3 weeks" : "3-4 weeks",
        difficulty: "Advanced",
        position: { x: 70, y: 60 },
        resources: [
          { type: "video", title: "Expert Masterclass", url: "#", duration: "4 hours" },
          { type: "article", title: "Industry Case Studies", url: "#", readTime: "45 min" },
          { type: "project", title: "Portfolio Project", url: "#", complexity: "Advanced" },
          { type: "mentorship", title: "Expert Consultation", url: "#", duration: "1 hour" }
        ],
        skills: ["Advanced Problem Solving", "System Design", "Optimization", "Innovation"],
        xp: 500,
        color: "from-purple-400 to-purple-600"
      },
      {
        id: 4,
        title: "Practical Mastery",
        description: `Build comprehensive projects demonstrating ${topic} expertise`,
        status: "locked",
        estimatedTime: timeCommitment === '1week' ? "1-2 weeks" : 
                      timeCommitment === '2weeks' ? "2-3 weeks" : "3-4 weeks",
        difficulty: "Expert",
        position: { x: 20, y: 80 },
        resources: [
          { type: "project", title: "Capstone Project", url: "#", complexity: "Expert" },
          { type: "video", title: "Industry Standards", url: "#", duration: "2 hours" },
          { type: "practice", title: "Expert Challenges", url: "#", exercises: 20 },
          { type: "portfolio", title: "Professional Showcase", url: "#", deliverables: 5 }
        ],
        skills: ["Project Management", "Quality Assurance", "Performance", "Documentation"],
        xp: 750,
        color: "from-orange-400 to-orange-600"
      },
      {
        id: 5,
        title: "Expertise & Leadership",
        description: `Become a ${topic} expert and mentor others in the community`,
        status: "locked",
        estimatedTime: timeCommitment === '1week' ? "2-3 weeks" : 
                      timeCommitment === '2weeks' ? "3-4 weeks" : "4-6 weeks",
        difficulty: "Master",
        position: { x: 80, y: 95 },
        resources: [
          { type: "video", title: "Leadership in Tech", url: "#", duration: "3 hours" },
          { type: "article", title: "Future Trends", url: "#", readTime: "60 min" },
          { type: "project", title: "Open Source Contribution", url: "#", complexity: "Master" },
          { type: "mentorship", title: "Become a Mentor", url: "#", commitment: "Ongoing" }
        ],
        skills: ["Expertise", "Leadership", "Mentoring", "Innovation", "Community Building"],
        xp: 1000,
        color: "from-red-400 to-red-600"
      }
    ];
  };

  const generateFlashcards = (goalData) => {
    const topic = goalData?.topic || 'General Learning';
    
    return [
      {
        id: 1,
        question: `What are the fundamental principles of ${topic}?`,
        answer: `The fundamental principles include understanding core concepts, applying best practices, maintaining consistent methodology, and focusing on problem-solving approaches specific to ${topic}.`,
        category: "Fundamentals",
        difficulty: "Beginner"
      },
      {
        id: 2,
        question: `How do you approach complex problems in ${topic}?`,
        answer: `Break down complex problems into smaller components, analyze each part systematically, apply relevant methodologies, test solutions iteratively, and document the process for future reference.`,
        category: "Problem Solving",
        difficulty: "Intermediate"
      },
      {
        id: 3,
        question: `What are the best practices for ${topic} projects?`,
        answer: `Follow industry standards, maintain clean and organized code/work, document thoroughly, test regularly, collaborate effectively, and continuously learn from feedback and new developments.`,
        category: "Best Practices",
        difficulty: "Intermediate"
      },
      {
        id: 4,
        question: `How do you stay updated with ${topic} trends?`,
        answer: `Follow industry leaders, read relevant publications, participate in communities, attend conferences/webinars, practice with new tools, and engage in continuous learning through various resources.`,
        category: "Professional Development",
        difficulty: "Advanced"
      },
      {
        id: 5,
        question: `What makes someone an expert in ${topic}?`,
        answer: `Deep understanding of fundamentals, ability to solve complex problems, experience with various tools and methodologies, capacity to teach others, and continuous contribution to the community.`,
        category: "Expertise",
        difficulty: "Expert"
      }
    ];
  };

  const toggleMilestoneStatus = (milestoneId) => {
    setMilestones(prev => prev.map(milestone => {
      if (milestone.id === milestoneId && milestone.status !== 'locked') {
        const newStatus = milestone.status === 'completed' ? 'in-progress' : 'completed';
        return { ...milestone, status: newStatus };
      }
      return milestone;
    }));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-8 h-8 text-white" />;
      case 'in-progress': return <Play className="w-6 h-6 text-white" />;
      case 'locked': return <div className="w-3 h-3 bg-white rounded-full opacity-60"></div>;
      default: return <div className="w-3 h-3 bg-white rounded-full opacity-60"></div>;
    }
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'video': return <Video size={16} className="text-red-500" />;
      case 'article': return <FileText size={16} className="text-blue-500" />;
      case 'project': return <Target size={16} className="text-purple-500" />;
      case 'practice': return <Play size={16} className="text-green-500" />;
      case 'quiz': return <CheckCircle size={16} className="text-orange-500" />;
      case 'mentorship': return <User size={16} className="text-indigo-500" />;
      case 'portfolio': return <Star size={16} className="text-yellow-500" />;
      default: return <Book size={16} className="text-gray-500" />;
    }
  };

  const completedMilestones = milestones.filter(m => m.status === 'completed').length;
  const totalXP = milestones.filter(m => m.status === 'completed').reduce((sum, m) => sum + m.xp, 0);
  const progressPercentage = milestones.length > 0 ? Math.round((completedMilestones / milestones.length) * 100) : 0;

  const nextFlashcard = () => {
    setIsFlipped(false);
    setCurrentFlashcardIndex((prev) => (prev + 1) % flashcards.length);
  };

  const prevFlashcard = () => {
    setIsFlipped(false);
    setCurrentFlashcardIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  if (isLoading) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">AI is Creating Your Roadmap</h3>
          <p className="text-gray-600 mb-6">Analyzing your preferences and generating personalized content...</p>
          <div className="flex justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Progress</h3>
              <p className="text-2xl font-bold">{progressPercentage}%</p>
            </div>
            <Trophy className="w-8 h-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Experience</h3>
              <p className="text-2xl font-bold">{totalXP}</p>
            </div>
            <Zap className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-700 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Completed</h3>
              <p className="text-2xl font-bold">{completedMilestones}/{milestones.length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-700 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Flashcards</h3>
              <p className="text-2xl font-bold">{flashcards.length}</p>
            </div>
            <Brain className="w-8 h-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setIsFlashcardModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
        >
          <Brain size={20} />
          Study Flashcards
        </button>
      </div>

      {/* 3D Roadmap Visualization */}
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mb-2">
            <MapPin className="text-purple-600" />
            Your Learning Journey
          </h2>
          <p className="text-gray-600">Interactive roadmap with milestone achievements</p>
        </div>

        {/* 3D Milestone Map */}
        <div className="relative h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl overflow-hidden">
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
            {milestones.map((milestone, index) => {
              if (index < milestones.length - 1) {
                const current = milestone.position;
                const next = milestones[index + 1].position;
                return (
                  <line
                    key={`line-${milestone.id}`}
                    x1={`${current.x}%`}
                    y1={`${current.y}%`}
                    x2={`${next.x}%`}
                    y2={`${next.y}%`}
                    stroke="#e5e7eb"
                    strokeWidth="3"
                    strokeDasharray={milestone.status === 'completed' ? "none" : "10,5"}
                  />
                );
              }
              return null;
            })}
          </svg>

          {/* 3D Milestone Circles */}
          {milestones.map((milestone, index) => (
            <div
              key={milestone.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ 
                left: `${milestone.position.x}%`, 
                top: `${milestone.position.y}%`,
                zIndex: 10
              }}
              onClick={() => setSelectedMilestone(milestone)}
            >
              {/* 3D Circle */}
              <div 
                className={`w-20 h-20 rounded-full bg-gradient-to-br ${milestone.color} shadow-2xl transform transition-all duration-300 hover:scale-125 flex items-center justify-center relative group-hover:shadow-3xl`}
                style={{
                  boxShadow: `
                    0 20px 40px rgba(0,0,0,0.3),
                    inset 0 2px 4px rgba(255,255,255,0.4),
                    inset 0 -2px 4px rgba(0,0,0,0.2)
                  `
                }}
              >
                {getStatusIcon(milestone.status)}
                
                {/* Pulse effect for in-progress */}
                {milestone.status === 'in-progress' && (
                  <>
                    <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-30"></div>
                    <div className="absolute inset-0 rounded-full bg-blue-400 animate-pulse opacity-20"></div>
                  </>
                )}

                {/* Glow effect for completed */}
                {milestone.status === 'completed' && (
                  <div className="absolute inset-0 rounded-full bg-green-400 opacity-30 animate-pulse"></div>
                )}

                {/* Number badge */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white border-2 border-purple-400 rounded-full flex items-center justify-center text-xs font-bold text-purple-600 shadow-lg">
                  {index + 1}
                </div>
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg">
                  {milestone.title}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Milestone List */}
        <div className="mt-8 space-y-4">
          {milestones.map((milestone) => (
            <div key={milestone.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${milestone.color} flex items-center justify-center shadow-lg`}>
                  {getStatusIcon(milestone.status)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{milestone.title}</h3>
                  <p className="text-sm text-gray-600">{milestone.estimatedTime} • {milestone.xp} XP</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  milestone.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                  milestone.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  milestone.difficulty === 'Advanced' ? 'bg-orange-100 text-orange-800' :
                  milestone.difficulty === 'Expert' ? 'bg-red-100 text-red-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {milestone.difficulty}
                </span>
                <button
                  onClick={() => setSelectedMilestone(milestone)}
                  className="text-purple-600 hover:text-purple-800 font-medium text-sm"
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestone Detail Modal */}
      {selectedMilestone && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${selectedMilestone.color} flex items-center justify-center shadow-2xl`}>
                  {getStatusIcon(selectedMilestone.status)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{selectedMilestone.title}</h3>
                  <p className="text-gray-600 mt-1">{selectedMilestone.description}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMilestone(null)}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                <X size={24} />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <Clock className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <div className="text-sm text-gray-600">Duration</div>
                <div className="font-semibold">{selectedMilestone.estimatedTime}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <div className="text-sm text-gray-600">XP Reward</div>
                <div className="font-semibold">{selectedMilestone.xp}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <Book className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                <div className="text-sm text-gray-600">Resources</div>
                <div className="font-semibold">{selectedMilestone.resources.length}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <Target className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <div className="text-sm text-gray-600">Skills</div>
                <div className="font-semibold">{selectedMilestone.skills.length}</div>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Skills You'll Learn</h4>
              <div className="flex flex-wrap gap-2">
                {selectedMilestone.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Learning Resources</h4>
              <div className="space-y-3">
                {selectedMilestone.resources.map((resource, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group">
                    <div className="flex-shrink-0">
                      {getResourceIcon(resource.type)}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-800">{resource.title}</h5>
                      <div className="text-sm text-gray-600">
                        {resource.duration && `Duration: ${resource.duration}`}
                        {resource.readTime && `Read time: ${resource.readTime}`}
                        {resource.exercises && `${resource.exercises} exercises`}
                        {resource.complexity && `Complexity: ${resource.complexity}`}
                        {resource.questions && `${resource.questions} questions`}
                        {resource.deliverables && `${resource.deliverables} deliverables`}
                        {resource.commitment && `Commitment: ${resource.commitment}`}
                      </div>
                    </div>
                    <button className="text-purple-600 hover:text-purple-800 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              {selectedMilestone.status !== 'locked' && (
                <button
                  onClick={() => {
                    toggleMilestoneStatus(selectedMilestone.id);
                    setSelectedMilestone(null);
                  }}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                    selectedMilestone.status === 'completed'
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {selectedMilestone.status === 'completed' ? 'Mark as Incomplete' : 'Mark as Complete'}
                </button>
              )}
              <button
                onClick={() => setSelectedMilestone(null)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Flashcards Modal */}
      {isFlashcardModalOpen && flashcards.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <Brain className="text-purple-600" />
                AI-Generated Flashcards
              </h3>
              <button
                onClick={() => setIsFlashcardModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Progress */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{currentFlashcardIndex + 1} of {flashcards.length}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  flashcards[currentFlashcardIndex].difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                  flashcards[currentFlashcardIndex].difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  flashcards[currentFlashcardIndex].difficulty === 'Advanced' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {flashcards[currentFlashcardIndex].difficulty}
                </span>
              </div>

              {/* Flashcard */}
              <div 
                className="relative h-64 cursor-pointer perspective-1000"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <div className={`absolute inset-0 w-full h-full transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                  {/* Front */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl p-6 flex items-center justify-center backface-hidden border-2 border-purple-200">
                    <div className="text-center">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">Question</h4>
                      <p className="text-gray-700 text-lg">{flashcards[currentFlashcardIndex].question}</p>
                      <p className="text-purple-600 text-sm mt-4">Click to reveal answer</p>
                    </div>
                  </div>

                  {/* Back */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-xl p-6 flex items-center justify-center backface-hidden rotate-y-180 border-2 border-green-200">
                    <div className="text-center">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">Answer</h4>
                      <p className="text-gray-700">{flashcards[currentFlashcardIndex].answer}</p>
                      <p className="text-green-600 text-sm mt-4">Click to see question</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={prevFlashcard}
                  disabled={flashcards.length <= 1}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Previous
                </button>

                <button
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Flip Card
                </button>

                <button
                  onClick={nextFlashcard}
                  disabled={flashcards.length <= 1}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentFlashcardIndex + 1) / flashcards.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('progress');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [data, setData] = useState(mockData);

  useEffect(() => {
    setData(mockData);
  }, []);

  const navItems = [
    { id: 'progress', icon: LayoutDashboard, label: 'Progress' },
    { id: 'courses', icon: BookOpen, label: 'Courses' },
    { id: 'roadmap', icon: MapPin, label: 'RodMap' },
    { id: 'findmentor', icon: FileText, label: 'FindMentor' },
    { id: 'tutoring', icon: Radio, label: 'Tutoring' }
  ];

  // Navigation function to pass to Courses
  const handleNavigateToRoadmap = useCallback(() => {
    setActiveTab('roadmap');
  }, []);

  // Handle hash navigation
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && navItems.find(item => item.id === hash)) {
      setActiveTab(hash);
    }
  }, [navItems]);

  const renderContent = () => {
    switch (activeTab) {
      case 'progress':
        return <Progress />;
      case 'courses':
        return <Courses onNavigateToRoadmap={handleNavigateToRoadmap} />; 
      case 'roadmap':
        return <Roadmap />;
      default:
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 capitalize">{activeTab}</h2>
            <p className="text-gray-600">This is the {activeTab} page. Content will be loaded here.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-16 lg:w-64 h-full bg-slate-800 text-white z-40">
        {/* Logo */}
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <BookOpen size={20} className="text-white" />
            </div>
            <span className="font-semibold text-lg hidden lg:block">Dashboard</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-700 transition-colors ${
                activeTab === item.id ? 'bg-blue-600' : ''
              }`}
            >
              <item.icon size={20} />
              <span className="hidden lg:block">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-16 lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800 capitalize">{activeTab}</h1>
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="search"
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="p-2 text-gray-600 hover:text-gray-800">
                <Bell size={20} />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-800">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && (
              <div className="mb-6">
                <h2 className="text-sm font-medium text-gray-500 mb-4">OVERVIEW</h2>
              </div>
            )}
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Chatbot Modal */}
      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </div>
  );
};

export default Dashboard;