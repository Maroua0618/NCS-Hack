import React, { useState, useEffect } from 'react';
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
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Chatbot from './chatbot';
import Courses from './Courses';
import Progress from './Progress';

// Mock database data
const mockData = {
  overview: {
    coursesInProgress: 3,
    coursesCompleted: 7,
    hoursLearning: '3h 15m',
    productivity: 240
  },
  weeklyStats: [
    { day: 'SAT', value: 30 },
    { day: 'SUN', value: 80 },
    { day: 'MON', value: 60 },
    { day: 'TUE', value: 65 },
    { day: 'WED', value: 100 },
    { day: 'THU', value: 75 },
    { day: 'FRI', value: 70 }
  ],
  courses: [
    {
      id: 1,
      title: 'Introduction to Lorem Ipsum...',
      instructor: 'Shams Tabrez',
      progress: 75,
      color: 'bg-purple-200'
    },
    {
      id: 2,
      title: 'English for today',
      instructor: 'Shams Tabrez',
      progress: 60,
      color: 'bg-blue-200'
    },
    {
      id: 3,
      title: 'Basic of Lorem Ipsum color...',
      instructor: 'Shams Tabrez',
      progress: 85,
      color: 'bg-cyan-200'
    }
  ]
};




// Progress Ring Component
const ProgressRing = ({ percentage, size = 120 }) => {
  const radius = (size - 8) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

  return (
    <div className="relative">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="8"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#3b82f6"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold">{percentage}%</div>
          <div className="text-xs text-gray-500">80%</div>
        </div>
      </div>
    </div>
  );
};

// Course Progress Component
const CourseProgress = ({ percentage }) => {
  return (
    <div className="w-16 h-16">
      <svg viewBox="0 0 36 36" className="w-full h-full">
        <path
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="3"
        />
        <path
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="3"
          strokeDasharray={`${percentage}, 100`}
        />
      </svg>
    </div>
  );
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [data, setData] = useState(mockData);

  // Simulate data fetching
  useEffect(() => {
    // In a real app, you would fetch data from your database here
    setData(mockData);
  }, []);

  const navItems = [
    { id: 'progress', icon: LayoutDashboard, label: 'Progress' },
    { id: 'courses', icon: BookOpen, label: 'Courses' },
    { id: 'roadmap', icon: MapPin, label: 'RodMap' },
    { id: 'findmentor', icon: FileText, label: 'FindMentor' },
    { id: 'tutoring', icon: Radio, label: 'Tutoring' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'progress':
        return <Progress />;
      case 'courses':
        return <Courses />; 
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