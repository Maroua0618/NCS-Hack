import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Computer1 from '../assets/computer1.png';
import Computer2 from '../assets/computer2.png';
import { useNavigate } from 'react-router-dom';


const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
    })
  },[])

  const handleTakeQuiz = () => {
    // This will be handled by your router
     navigate('/quiz');
  };

  return (
    <div className="h-full bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50  relative b-0">
      {/* Floating Background Orbs */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600 rounded-full opacity-80 blur-sm"></div>
      <div className="absolute top-20 right-20 w-20 h-20 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-full opacity-70 blur-sm"></div>
      <div className="absolute bottom-20 left-16 w-24 h-24 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-full opacity-60 blur-sm"></div>
      <div className="absolute bottom-32 right-32 w-32 h-32 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-full opacity-50 blur-sm"></div>
      <div className="absolute top-1/2 left-8 w-12 h-12 bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 rounded-full opacity-60 blur-sm"></div>
      <div className="absolute top-1/3 right-12 w-14 h-14 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 rounded-full opacity-50 blur-sm"></div>
      <div className="absolute bottom-1/4 left-1/4 w-18 h-18 bg-gradient-to-br from-purple-300 via-pink-300 to-blue-300 rounded-full opacity-70 blur-sm"></div>
      <div className="absolute top-1/4 right-1/4 w-10 h-10 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-full opacity-60 blur-sm"></div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 mb-3">
        
        {/* Header Section */}
        <div className="text-center mb-8" data-aos="fade-down">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 mb-6">
            Welcome
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-800 max-w-2xl mx-auto leading-relaxed font-medium">
            wanna learn more about your primary learning<br />
            style to create a more effective learning plan?
          </p>
        </div>

        {/* Computers Section */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 mb-16 w-full max-w-6xl">
          {/* Left Computer */}
          <div className="relative flex-1 flex justify-center" data-aos="fade-right" data-aos-delay="200">
            <img 
              src={Computer1}  
              alt="./computer1.png" 
              className="w-40 h-60 sm:w-56 lg:w-72 transform hover:scale-105 transition-transform duration-300 drop-shadow-2xl"
            />
          </div>

          {/* Right Computer */}
          <div className="relative flex-1 flex justify-center" data-aos="fade-left" data-aos-delay="400">
            <img 
              src={Computer2} 
              alt="Computer 2" 
              className="w-40 h-60 sm:w-56 lg:w-72 transform hover:scale-105 transition-transform duration-300 drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-12">
          <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 text-center" data-aos="fade-up" data-aos-delay="300">
            <p className="text-gray-700 font-medium text-sm">Learn your career recommendations</p>
          </div>
          
          <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 text-center" data-aos="fade-up" data-aos-delay="300">
            <p className="text-gray-700 font-medium text-sm">Uncover your personalized study strategy</p>
          </div>
          
          <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 text-center" data-aos="fade-up" data-aos-delay="400">
            <p className="text-gray-700 font-medium text-sm">Discover your primary learning style</p>
          </div>
          
          <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 text-center" data-aos="fade-up" data-aos-delay="400">
            <p className="text-gray-700 font-medium text-sm">Learn your strengths & challenges</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center" >
          <button
            onClick={handleTakeQuiz}
            className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:from-purple-600 hover:via-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-10 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-purple-500/30"
          >
            take the quiz
          </button>
          <p className="text-gray-600 mt-3 text-sm">
            Takes 2-3 minutes, 10 questions
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;