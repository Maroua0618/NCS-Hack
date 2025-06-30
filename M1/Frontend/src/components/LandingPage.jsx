import React, { useEffect, useState } from 'react';
import { Star, Play, Menu } from 'lucide-react';

const StudyMateLanding = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200 relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-16 w-20 h-20 bg-gradient-to-r from-pink-400 to-orange-300 rounded-full opacity-70 animate-pulse"></div>
        <div className="absolute top-32 right-32 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-80 animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-16 h-16 bg-gradient-to-r from-orange-300 to-pink-300 rounded-full opacity-60 animate-pulse delay-1000"></div>
        <div className="absolute top-60 left-80 w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-70 animate-bounce delay-500"></div>
        <div className="absolute bottom-60 right-40 w-24 h-24 bg-gradient-to-r from-pink-300 to-orange-200 rounded-full opacity-50 animate-pulse delay-700"></div>
        <div className="absolute top-96 right-20 w-14 h-14 bg-gradient-to-r from-purple-300 to-blue-300 rounded-full opacity-60 animate-bounce delay-300"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-8 py-6">
        <div className="flex items-center space-x-8">
          <div className="text-2xl font-bold text-gray-800">StudyMate</div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">Home</a>
            <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">About</a>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="px-6 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            Sign In
          </button>
          <button className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
            Login
          </button>
          <Menu className="md:hidden text-2xl text-gray-700" />
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div>
              <h2 className="text-pink-500 text-lg font-semibold mb-2">StudyMate:</h2>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                Transform Your
                <br />
                Learning Journey
              </h1>
            </div>
            
            <p className="text-gray-600 text-lg leading-relaxed max-w-md">
              Join thousands of successful learners who achieved their goals with AI-powered study plans, intelligent tracking, and personalized guidance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Get Started
              </button>
              <button className="px-8 py-4 bg-white text-purple-600 rounded-xl hover:bg-gray-50 transition-all duration-300 border border-purple-200 shadow-lg">
                Our Services
              </button>
            </div>
          </div>

          {/* Right Content - Visual Elements */}
          <div className={`relative transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {/* Main Circle */}
            <div className="relative mx-auto w-80 h-80 lg:w-96 lg:h-96">
              {/* Blue Border Rectangle */}
              <div className="absolute inset-0 border-2 border-blue-400 rounded-3xl transform rotate-3"></div>
              
              {/* Main Circle Container */}
              <div className="relative w-full h-full bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <div className="w-64 h-64 lg:w-80 lg:h-80 bg-gradient-to-br from-white/40 to-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
                  <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-full shadow-2xl animate-pulse"></div>
                </div>
              </div>
              
              {/* Size Label */}
              <div className="absolute -top-8 right-8 bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                520 × 520
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold text-purple-600 mb-2">95%</div>
            <div className="text-gray-600 uppercase tracking-wide text-sm">Success Rate</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold text-pink-500 mb-2">50k+</div>
            <div className="text-gray-600 uppercase tracking-wide text-sm">Happy Users</div>
          </div>
          
          <div className="text-center flex items-center justify-center">
            <div className="text-4xl lg:text-5xl font-bold text-purple-600 mb-2">4.9</div>
            <Star className="text-yellow-400 text-2xl ml-2 mb-2 fill-current" />
            <div className="ml-4">
              <div className="text-gray-600 uppercase tracking-wide text-sm">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className={`mt-12 max-w-2xl mx-auto transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search for courses, topics, or skills..."
              className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-purple-500 text-white p-3 rounded-xl hover:bg-purple-600 transition-colors">
              <Play className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyMateLanding;