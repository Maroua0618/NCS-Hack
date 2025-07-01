/*global setTimeout */
/*global document */

import React, { useState, useEffect } from 'react';
import { Calendar, BookOpen, Trophy, Clock, ChevronLeft, ChevronRight, MoreHorizontal, Award, Eye, X, Monitor, Beaker, BarChart3, Palette, Globe, Heart } from 'lucide-react';

const Courses = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    domain: '',
    topic: '',
    description: '',
    currentLevel: '',
    timeCommitment: '',
    dailyTime: ''
  });
  
  // Mock data - replace with actual database calls
  const [dashboardData] = useState({
    progress: {
      percentage: 30,
      level: "Beginner",
      character: "🎯"
    },
    todaysPlans: [
      {
        id: 1,
        title: "Assignment 04",
        description: "Nisl, venenatis id cursus volutpat cursus interdum enim mauris.",
        dueDate: "Oct 02, 2022",
        type: "assignment"
      },
      {
        id: 2,
        title: "Enim erat elit diam donec",
        description: "Quisque et tristique eu est sed id sapien, nullam erat.",
        lessons: 5,
        quizzes: 4,
        instructor: "Shams Tabrez",
        type: "course"
      }
    ],
    enrolledCourses: [
      {
        id: 1,
        title: "Basic of English Language",
        progress: "Progress",
        lessons: 2,
        totalLessons: 10,
        quizzes: 3,
        totalQuizzes: 5,
        color: "bg-purple-200"
      },
      {
        id: 2,
        title: "Introduction the web development",
        progress: "Progress",
        lessons: 0,
        totalLessons: 10,
        color: "bg-blue-200"
      },
      {
        id: 3,
        title: "Basic data-structure and algorithm",
        progress: "Completed",
        certificate: true,
        color: "bg-purple-300"
      },
      {
        id: 4,
        title: "Lorem ipsum codor la hala madrid",
        progress: "Completed",
        certificate: true,
        color: "bg-blue-300"
      }
    ]
  });

  useEffect(() => {
    // Simulate AOS animation
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 200);
    });
  }, []);


  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  // Form handling functions
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDomainSelect = (domain) => {
    setFormData(prev => ({
      ...prev,
      domain: domain
    }));
  };

  const handleTimeCommitmentSelect = (timeCommitment) => {
    setFormData(prev => ({
      ...prev,
      timeCommitment: timeCommitment
    }));
  };

  const handleSubmitGoal = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsLoading(false);
      setIsGoalModalOpen(false);
      // Reset form
      setFormData({
        domain: '',
        topic: '',
        description: '',
        currentLevel: '',
        timeCommitment: '',
        dailyTime: ''
      });
      
      // Navigate to roadmap (you'll need to implement this in your parent component)
      // For now, we'll show an alert and you can modify this to navigate
      alert('Your personalized study plan has been generated! Redirecting to roadmap...');
      
      // If you have a callback prop or navigation function, call it here
      // Example: onNavigateToRoadmap?.();
      // or if using react-router: navigate('/roadmap');
    }, 3000);
  };

  // Domain options with icons
  const domains = [
    { name: 'Technology', icon: Monitor },
    { name: 'Science', icon: Beaker },
    { name: 'Business', icon: BarChart3 },
    { name: 'Arts & Design', icon: Palette },
    { name: 'Languages', icon: Globe },
    { name: 'Health', icon: Heart }
  ];

  // Time commitment options
  const timeCommitments = [
    { label: '1 Week', sublabel: 'Intensive', value: '1-week' },
    { label: '2 Weeks', sublabel: 'Focused', value: '2-weeks' },
    { label: '1 Month', sublabel: 'Balanced', value: '1-month' },
    { label: 'Custom', sublabel: 'Flexible', value: 'custom' }
  ];

  // Study Goal Modal Component
  const StudyGoalModal = () => {
    if (!isGoalModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
          {/* Close Button */}
          <button
            onClick={() => setIsGoalModalOpen(false)}
            className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>

          {!isLoading ? (
            <form onSubmit={handleSubmitGoal}>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-2">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800">Create Your Study Goal</h2>
                </div>
                <p className="text-gray-600">Tell us what you want to learn and we'll create a personalized plan that adapts to your progress</p>
              </div>

              {/* Choose Your Domain */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Choose Your Domain</h3>
                <div className="grid grid-cols-3 gap-4">
                  {domains.map((domain) => {
                    const IconComponent = domain.icon;
                    return (
                      <button
                        key={domain.name}
                        type="button"
                        onClick={() => handleDomainSelect(domain.name)}
                        className={`p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                          formData.domain === domain.name
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <IconComponent size={24} className={`mx-auto mb-2 ${
                          formData.domain === domain.name ? 'text-purple-600' : 'text-gray-600'
                        }`} />
                        <div className={`text-sm font-medium ${
                          formData.domain === domain.name ? 'text-purple-800' : 'text-gray-700'
                        }`}>
                          {domain.name}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Specific Topic */}
              <div className="mb-6">
                <label className="block text-lg font-semibold mb-3 text-gray-800">
                  What specific topic do you want to master?
                </label>
                <input
                  type="text"
                  name="topic"
                  value={formData.topic}
                  onChange={handleInputChange}
                  placeholder="e.g., React.js, Spanish Conversation, Digital Marketing..."
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-lg font-semibold mb-3 text-gray-800">
                  Tell us more about your learning goals
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe what you want to achieve, your motivation, or any specific skills you want to develop..."
                  rows={4}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Current Level */}
              <div className="mb-6">
                <label className="block text-lg font-semibold mb-3 text-gray-800">
                  Your current level
                </label>
                <select
                  name="currentLevel"
                  value={formData.currentLevel}
                  onChange={handleInputChange}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="">Select your current level</option>
                  <option value="beginner">Beginner - Just starting out</option>
                  <option value="intermediate">Intermediate - Some experience</option>
                  <option value="advanced">Advanced - Experienced learner</option>
                  <option value="expert">Expert - Looking to specialize</option>
                </select>
              </div>

              {/* Time Commitment */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">How much time do you have?</h3>
                <div className="grid grid-cols-2 gap-4">
                  {timeCommitments.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleTimeCommitmentSelect(option.value)}
                      className={`p-4 rounded-xl border-2 text-center transition-all hover:shadow-md ${
                        formData.timeCommitment === option.value
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`font-semibold ${
                        formData.timeCommitment === option.value ? 'text-purple-800' : 'text-gray-800'
                      }`}>
                        {option.label}
                      </div>
                      <div className={`text-sm ${
                        formData.timeCommitment === option.value ? 'text-purple-600' : 'text-gray-600'
                      }`}>
                        {option.sublabel}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Daily Study Time */}
              <div className="mb-8">
                <label className="block text-lg font-semibold mb-3 text-gray-800">
                  Daily study time available
                </label>
                <select
                  name="dailyTime"
                  value={formData.dailyTime}
                  onChange={handleInputChange}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="">Select daily time commitment</option>
                  <option value="15-30">15-30 minutes</option>
                  <option value="30-60">30-60 minutes</option>
                  <option value="1-2">1-2 hours</option>
                  <option value="2-4">2-4 hours</option>
                  <option value="4+">4+ hours</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-4 px-6 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all transform hover:scale-[1.02] shadow-lg"
              >
                GENERATE MY STUDY PLAN
              </button>
            </form>
          ) : (
            // Loading State
            <div className="text-center py-12">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <BookOpen className="w-10 h-10 text-white" />
                </div>
                <div className="flex justify-center space-x-1 mb-4">
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">AI is Analyzing Your Preferences</h3>
              <p className="text-gray-600 mb-2">Please hold on while we create your personalized study plan...</p>
              <p className="text-gray-500 text-sm">This usually takes a few seconds</p>
              <div className="mt-6 bg-gray-100 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-600 to-purple-700 rounded-full animate-pulse"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Progress and Goals */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Progress Section */}
            <div 
              className="bg-white rounded-2xl p-6 shadow-sm"
              data-aos="fade-up"
              style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Progress</h2>
              
              {/* Progress Illustration */}
              <div className="relative bg-gradient-to-r from-purple-200 to-blue-200 rounded-2xl p-8 mb-6 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-4 left-8">
                  <div className="w-8 h-6 bg-white rounded-full opacity-70"></div>
                </div>
                <div className="absolute top-6 right-12">
                  <div className="w-6 h-4 bg-white rounded-full opacity-50"></div>
                </div>
                
                {/* Trees */}
                <div className="absolute bottom-8 left-12">
                  <div className="w-4 h-6 bg-purple-600 rounded-full"></div>
                  <div className="w-2 h-4 bg-purple-800 mx-auto"></div>
                </div>
                <div className="absolute bottom-8 left-24">
                  <div className="w-5 h-7 bg-purple-700 rounded-full"></div>
                  <div className="w-2 h-4 bg-purple-900 mx-auto"></div>
                </div>
                <div className="absolute bottom-8 right-24">
                  <div className="w-4 h-6 bg-purple-600 rounded-full"></div>
                  <div className="w-2 h-4 bg-purple-800 mx-auto"></div>
                </div>
                <div className="absolute bottom-8 right-12">
                  <div className="w-5 h-7 bg-purple-700 rounded-full"></div>
                  <div className="w-2 h-4 bg-purple-900 mx-auto"></div>
                </div>
                
                {/* Character */}
                <div className="absolute bottom-8 left-1/3">
                  <div className="text-4xl">🎯</div>
                </div>
                
                {/* Trophy */}
                <div className="absolute bottom-8 right-8">
                  <div className="bg-blue-500 rounded-lg p-3">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="absolute bottom-6 left-8 right-8">
                  <div className="bg-purple-600 h-2 rounded-full">
                    <div 
                      className="bg-purple-800 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${dashboardData.progress.percentage}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Progress Text */}
                <div className="absolute bottom-1 left-8 text-sm font-medium text-purple-800">
                  {dashboardData.progress.percentage}%
                </div>
                <div className="absolute bottom-1 right-8 text-sm font-medium text-purple-800">
                  {dashboardData.progress.level}
                </div>
              </div>
              
              {/* Create Goal Button */}
              <button 
                onClick={() => setIsGoalModalOpen(true)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-2xl transition-colors duration-200"
              >
                create a new goal
              </button>
            </div>
            
            {/* Enrolled Courses */}
            <div 
              className="bg-white rounded-2xl p-6 shadow-sm"
              data-aos="fade-up"
              style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Enrolled Courses</h2>
    
              </div>
              
              <div className="space-y-4">
                {dashboardData.enrolledCourses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors duration-200">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${course.color} rounded-xl flex items-center justify-center`}>
                        <BookOpen className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">{course.title}</h3>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            course.progress === 'Completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {course.progress}
                          </span>
                          {course.certificate && (
                            <button className="text-blue-500 hover:text-blue-600 text-xs font-medium flex items-center gap-1">
                              <Award className="w-3 h-3" />
                              View Certificate
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {course.lessons !== undefined && (
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">{course.lessons}/{course.totalLessons}</span>
                        </div>
                      )}
                      {course.quizzes !== undefined && (
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">{course.quizzes}/{course.totalQuizzes}</span>
                        </div>
                      )}
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column - Calendar and Today's Plans */}
          <div className="space-y-6">
            
            {/* Calendar */}
            <div 
              className="bg-white rounded-2xl p-6 shadow-sm"
              data-aos="fade-left"
              style={{ opacity: 0, transform: 'translateX(20px)', transition: 'all 0.6s ease' }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => navigateMonth(-1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => navigateMonth(1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <div key={day} className="text-center text-xs font-medium text-gray-500 p-2">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth(currentDate).map((day, index) => (
                  <div key={index} className="aspect-square flex items-center justify-center">
                    {day && (
                      <button className={`w-8 h-8 text-sm rounded-lg hover:bg-blue-100 transition-colors duration-200 ${
                        day === 30 ? 'bg-blue-500 text-white' : 
                        day === 2 ? 'bg-blue-100 text-blue-600' : 
                        'text-gray-700 hover:text-blue-600'
                      }`}>
                        {day}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Today's Plans */}
            <div 
              className="bg-white rounded-2xl p-6 shadow-sm"
              data-aos="fade-left"
              style={{ opacity: 0, transform: 'translateX(20px)', transition: 'all 0.6s ease' }}
            >
              <h3 className="font-bold text-gray-800 mb-4">Today's Plans</h3>
              
              <div className="space-y-4">
                {dashboardData.todaysPlans.map((plan) => (
                  <div key={plan.id} className="border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-colors duration-200">
                    {plan.type === 'assignment' ? (
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className="font-semibold text-gray-800">{plan.title}</h4>
                              <span className="text-xs text-gray-500">Due Date</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{plan.description}</p>
                        <p className="text-xs text-gray-500">{plan.dueDate}</p>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 mb-1">{plan.title}</h4>
                            <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>{plan.lessons} lessons</span>
                                <span>{plan.quizzes} quizzes</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                                <span className="text-xs text-gray-600">{plan.instructor}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Character illustration */}
                        <div className="flex justify-end">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                            <div className="text-2xl">👨‍🎓</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Study Goal Modal */}
      <StudyGoalModal />
    </div>
  );
};

export default Courses;