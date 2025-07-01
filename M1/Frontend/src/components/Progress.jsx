/*global document */
/*global setTimeout */

import React, { useState, useEffect } from 'react';
import { BookOpen, Target, Clock, TrendingUp, MoreHorizontal, GraduationCap } from 'lucide-react';

const AnalyticsOverview = () => {
  // Mock data - replace with actual database calls
  const [analyticsData] = useState({
    overview: {
      coursesInProgress: 3,
      classesInProgress: 3,
      completedGoals: 7,
      hoursLearning: "3h 15m",
      productivity: 240
    },
    studyStatistics: {
      weeklyData: [
        { day: 'SAT', hours: 1 },
        { day: 'SUN', hours: 4 },
        { day: 'MON', hours: 3 },
        { day: 'TUE', hours: 3.5 },
        { day: 'WED', hours: 6 },
        { day: 'THU', hours: 4.5 },
        { day: 'FRI', hours: 5 }
      ]
    },
    weeklyProgress: {
      courses: 45,
      prototypes: 80
    },
    myCourses: [
      {
        id: 1,
        title: "Introduction to lorem ipsum...",
        instructor: "Shams Tabrez",
        progress: 65,
        color: "bg-purple-400"
      },
      {
        id: 2,
        title: "English for today",
        instructor: "Shams Tabrez",
        progress: 40,
        color: "bg-blue-400"
      },
      {
        id: 3,
        title: "Basic of Lorem ipsum color...",
        instructor: "Shams Tabrez",
        progress: 75,
        color: "bg-cyan-400"
      }
    ]
  });

  const [viewMode, setViewMode] = useState('week');

  useEffect(() => {
    // Simulate AOS animation
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }, []);

  const maxHours = Math.max(...analyticsData.studyStatistics.weeklyData.map(d => d.hours));

  const CircularProgress = ({ percentage, size = 120, strokeWidth = 8, color = "#3B82F6" }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-800">{percentage}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">OVERVIEW</h1>
        </div>

        {/* Overview Stats */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8"
          data-aos="fade-up"
          style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}
        >
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">Courses in progress</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">{analyticsData.overview.coursesInProgress}</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">Classes in progress</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">{analyticsData.overview.classesInProgress}</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">completed goals</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">{analyticsData.overview.completedGoals}</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">Hours Learning</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">{analyticsData.overview.hoursLearning}</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">productivity</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">{analyticsData.overview.productivity}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Study Statistics */}
          <div 
            className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm"
            data-aos="fade-up"
            style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">STUDY STATISTICS</h2>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button 
                  onClick={() => setViewMode('week')}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                    viewMode === 'week' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Week
                </button>
                <button 
                  onClick={() => setViewMode('month')}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                    viewMode === 'month' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Month
                </button>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="flex items-end justify-between h-64 mb-4">
              {analyticsData.studyStatistics.weeklyData.map((data, index) => (
                <div key={data.day} className="flex flex-col items-center flex-1 mx-1">
                  <div 
                    className="w-full bg-blue-400 rounded-t-lg transition-all duration-1000 ease-out hover:bg-blue-500"
                    style={{ 
                      height: `${(data.hours / maxHours) * 200}px`,
                      animationDelay: `${index * 100}ms`
                    }}
                    title={`${data.hours} hours`}
                  ></div>
                  <span className="text-sm text-gray-600 mt-2 font-medium">{data.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Progress Ring */}
          <div 
            className="bg-white rounded-2xl p-6 shadow-sm"
            data-aos="fade-left"
            style={{ opacity: 0, transform: 'translateX(20px)', transition: 'all 0.6s ease' }}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-6">Weekly Progress Ring</h2>
            
            <div className="flex justify-center items-center gap-8 mb-6">
              {/* Courses Ring */}
              <div className="text-center">
                <CircularProgress 
                  percentage={analyticsData.weeklyProgress.courses} 
                  size={100} 
                  strokeWidth={8}
                  color="#60A5FA" 
                />
                <div className="mt-2">
                  <div className="text-lg font-bold text-gray-800">{analyticsData.weeklyProgress.courses}%</div>
                  <div className="text-xs text-gray-600">Courses</div>
                </div>
              </div>
              
              {/* Prototypes Ring */}
              <div className="text-center">
                <CircularProgress 
                  percentage={analyticsData.weeklyProgress.prototypes} 
                  size={100} 
                  strokeWidth={8}
                  color="#1E40AF" 
                />
                <div className="mt-2">
                  <div className="text-lg font-bold text-gray-800">{analyticsData.weeklyProgress.prototypes}%</div>
                  <div className="text-xs text-gray-600">Prototypes</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* My Courses */}
        <div 
          className="bg-white rounded-2xl p-6 shadow-sm"
          data-aos="fade-up"
          style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6">MY COURSES</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analyticsData.myCourses.map((course) => (
              <div key={course.id} className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-gray-600" />
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{course.title}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-600">{course.instructor}</span>
                  </div>
                </div>
                
                {/* Progress Circle */}
                <div className="flex justify-center">
                  <div className="relative">
                    <CircularProgress 
                      percentage={course.progress} 
                      size={80} 
                      strokeWidth={6}
                      color={course.color.includes('purple') ? '#8B5CF6' : course.color.includes('blue') ? '#3B82F6' : '#06B6D4'} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsOverview;