/*global console */
/*global  document */

import { 
  Play, 
  Star, 
  TrendingUp, 
  Trophy, 
  Users, 
  Target,
  Bot,
  BarChart3,
  Brain,
  Zap,
  Palette,
  MessageCircle
} from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  // const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   const testimonialTimer = setInterval(() => {
  //     setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  //   }, 5000);

  //   return () => {
  //     clearInterval(testimonialTimer);
  //   };
  // }, []);

  // Function to scroll to the features section
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };


  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Floating Gradient Bubbles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Large bubbles */}
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 opacity-60 shadow-lg animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-50 shadow-md animate-bounce"></div>
        <div className="absolute top-1/4 left-1/3 w-40 h-40 rounded-full bg-gradient-to-br from-pink-300 to-purple-500 opacity-45 shadow-xl"></div>
        <div className="absolute top-1/2 right-10 w-28 h-28 rounded-full bg-gradient-to-br from-purple-300 to-blue-400 opacity-55 shadow-lg animate-pulse"></div>
        
        {/* Medium bubbles */}
        <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-gradient-to-br from-blue-300 to-purple-300 opacity-65 shadow-md"></div>
        <div className="absolute bottom-1/3 left-1/4 w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 opacity-60 shadow-md animate-bounce"></div>
        <div className="absolute top-2/3 left-20 w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-300 opacity-55 shadow-lg"></div>
        <div className="absolute bottom-1/4 right-1/3 w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-pink-400 opacity-45 shadow-xl"></div>
        
        {/* Small bubbles */}
        <div className="absolute top-1/5 left-2/3 w-12 h-12 rounded-full bg-gradient-to-br from-purple-300 to-blue-300 opacity-70 shadow-sm animate-pulse"></div>
        <div className="absolute top-3/4 right-1/5 w-14 h-14 rounded-full bg-gradient-to-br from-pink-300 to-purple-300 opacity-65 shadow-sm"></div>
        <div className="absolute bottom-1/5 left-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-blue-300 to-purple-400 opacity-75 shadow-sm animate-bounce"></div>
        <div className="absolute top-1/6 right-2/3 w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 opacity-60 shadow-md"></div>
      </div>

      <div className="bg-purple-50 text-black py-20 md:py-32 text-center md:text-left relative overflow-hidden min-h-screen flex items-center z-10" style={{ backgroundColor: 'rgba(186, 194, 255, 0.38)' }}>
        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <div>
            <h1 className="font-black text-5xl sm:text-6xl md:text-8xl mb-2 leading-tight text-left ml-4 md:ml-0" style={{ 
              color: '#9F449F'
            }}>
              StudyMate
            </h1>
          </div>
          <div>
            <h2 className="mb-6 text-3xl md:text-5xl font-normal leading-tight text-left text-black ml-4 md:ml-0">
              Your AI-Powered Learning Revolution
            </h2>
          </div>
          <div>
            <p className="mb-12 text-lg md:text-xl opacity-90 max-w-2xl mx-auto md:mx-0 leading-relaxed font-light text-left ml-4 md:ml-0">
              Transform your learning journey with personalized AI tutoring, adaptive study plans, 
              and a community of motivated learners. Achieve your goals faster than ever before.
            </p>
          </div>
          <div>
            <div className="flex gap-6 justify-center md:justify-start flex-wrap mb-8 ml-4 md:ml-0">
              <button
                className="text-white px-8 py-4 text-xl font-bold rounded-2xl shadow-lg hover:bg-gray-100 hover:scale-105 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                style={{ backgroundColor: '#9D8CFF' }}
                onClick={() => {navigate('/login')
                  console.log('Get Started clicked')
                }}
              >
                <TrendingUp className="w-5 h-5" />
                Get Started
              </button>
              <button
                className="text-black px-8 py-4 text-xl font-bold rounded-2xl backdrop-blur-sm hover:bg-white/20 hover:scale-105 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 border-2"
                style={{ borderColor: '#9D8CFF' }}
                onClick={scrollToFeatures}
              >
                <Play className="w-5 h-5" />
                Explore Our Services
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8 bg-purple-50 relative overflow-hidden z-10">
        {/* Section-specific bubbles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-gradient-to-br from-purple-300 to-blue-300 opacity-60 shadow-lg"></div>
          <div className="absolute bottom-10 left-10 w-16 h-16 rounded-full bg-gradient-to-br from-pink-300 to-purple-300 opacity-65 shadow-md"></div>
          <div className="absolute top-1/2 left-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-pink-400 opacity-70 shadow-sm"></div>
          <div className="absolute bottom-1/3 right-1/3 w-18 h-18 rounded-full bg-gradient-to-br from-purple-400 to-blue-300 opacity-55 shadow-md"></div>
          <div className="absolute top-1/4 right-1/6 w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 opacity-75 shadow-sm"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <div className="flex justify-around items-center flex-wrap gap-8 py-8">
            <div className="text-center flex items-center gap-4">
              <h2 className="font-black text-5xl md:text-7xl" style={{ color: '#9D8CFF' }}>95%</h2>
              <div className="w-1 h-16 rounded hidden md:block" style={{ backgroundColor: '#9D8CFF' }} />
              <p className="text-black font-semibold text-lg text-left">success rate</p>
            </div>
            <div className="text-center flex items-center gap-4">
              <h2 className="font-black text-5xl md:text-7xl" style={{ color: '#9D8CFF' }}>50k+</h2>
              <div className="w-1 h-16 rounded hidden md:block" style={{ backgroundColor: '#9D8CFF' }} />
              <p className="text-black font-semibold text-lg text-left">students</p>
            </div>
            <div className="text-center flex items-center gap-4">
              <div className="flex items-center gap-2">
                <h2 className="font-black text-5xl md:text-7xl" style={{ color: '#9D8CFF' }}>4.9</h2>
                <Star className="w-8 h-8 fill-current" style={{ color: '#9D8CFF' }} />
              </div>
              <p className="text-black font-semibold text-lg text-left ml-4">rating</p>
            </div>
          </div>
        </div>
      </div>

      <div id="features-section" className="py-12 bg-purple-50 relative overflow-hidden z-10">
        {/* Features section bubbles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-5 w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-50 shadow-lg"></div>
          <div className="absolute top-1/2 right-5 w-18 h-18 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 opacity-60 shadow-md"></div>
          <div className="absolute bottom-1/4 left-1/3 w-14 h-14 rounded-full bg-gradient-to-br from-purple-300 to-blue-300 opacity-65 shadow-sm"></div>
          <div className="absolute top-1/6 right-1/4 w-12 h-12 rounded-full bg-gradient-to-br from-pink-300 to-purple-300 opacity-70 shadow-sm"></div>
          <div className="absolute top-3/4 left-1/6 w-20 h-20 rounded-full bg-gradient-to-br from-blue-300 to-pink-400 opacity-55 shadow-md"></div>
          <div className="absolute bottom-1/6 right-1/6 w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-300 opacity-60 shadow-md"></div>
          <div className="absolute top-1/8 left-2/3 w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-blue-300 opacity-75 shadow-sm"></div>
          <div className="absolute bottom-1/8 right-2/3 w-22 h-22 rounded-full bg-gradient-to-br from-purple-300 to-blue-400 opacity-50 shadow-lg"></div>
          <div className="absolute top-5/6 right-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-purple-300 opacity-65 shadow-sm"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
              Why Choose StudyMate?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Everything you need to accelerate your learning and achieve your academic goals
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              { icon: Target, title: 'AI-Powered Goals', desc: 'Set custom learning objectives with AI-generated study plans tailored to your needs.', color: 'from-blue-400 to-purple-600' },
              { icon: Bot, title: 'Smart AI Tutor', desc: 'Get instant help and personalized study tips from your 24/7 AI companion.', color: 'from-pink-400 to-purple-500' },
              { icon: BarChart3, title: 'Advanced Analytics', desc: 'Monitor your progress with detailed insights and performance metrics.', color: 'from-blue-400 to-cyan-500' },
              { icon: Brain, title: 'Smart Flashcards', desc: 'Create flashcards with spaced repetition algorithms for better retention.', color: 'from-green-400 to-blue-500' },
              { icon: Users, title: 'Learning Community', desc: 'Connect with learners, join study groups, and find mentors.', color: 'from-pink-400 to-red-500' },
              { icon: Zap, title: 'Productivity Tools', desc: 'Track sessions, manage schedules, and maintain learning habits.', color: 'from-cyan-400 to-blue-500' },
              { icon: Palette, title: 'Personalized Learning', desc: 'Adaptive paths that adjust to your strengths and learning style.', color: 'from-yellow-400 to-orange-500' },
              { icon: Trophy, title: 'Achievement System', desc: 'Gamified experience with badges and rewards to stay motivated.', color: 'from-orange-400 to-red-500' },
              { icon: MessageCircle, title: 'Real-time Support', desc: 'Get instant help from mentors and AI assistants anytime.', color: 'from-purple-400 to-pink-500' }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="mx-auto max-w-sm">
                  <div className="h-80 w-full text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:border-purple-300 flex flex-col justify-between group">
                    <div className="flex flex-col items-center">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${feature.color} flex justify-center items-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-grow flex flex-col justify-center">
                        <h3 className="text-xl font-bold mb-4 text-gray-800 min-h-[30px]">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm min-h-[80px] flex items-center justify-center text-center px-2">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                    <div className={`w-16 h-1 bg-gradient-to-r ${feature.color} rounded mx-auto mt-4 transition-all duration-300 group-hover:w-20`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Ready For Your Next Challenge Section */}
      <div className="py-16 relative overflow-hidden z-10" style={{ backgroundColor: 'rgba(186, 194, 255, 0.38)' }}>
        {/* Challenge section bubbles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-1/4 w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 opacity-65 shadow-md"></div>
          <div className="absolute bottom-10 right-1/4 w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-55 shadow-lg"></div>
          <div className="absolute top-1/2 left-10 w-12 h-12 rounded-full bg-gradient-to-br from-pink-300 to-purple-300 opacity-70 shadow-sm"></div>
          <div className="absolute top-1/3 right-10 w-14 h-14 rounded-full bg-gradient-to-br from-purple-300 to-blue-300 opacity-65 shadow-sm"></div>
          <div className="absolute bottom-1/3 left-1/2 w-18 h-18 rounded-full bg-gradient-to-br from-blue-300 to-pink-400 opacity-60 shadow-md"></div>
          <div className="absolute top-1/6 right-1/3 w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 opacity-75 shadow-sm"></div>
          <div className="absolute bottom-1/6 left-1/3 w-22 h-22 rounded-full bg-gradient-to-br from-purple-400 to-blue-300 opacity-50 shadow-lg"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <div className="text-center">
            <div className="rounded-3xl p-12 shadow-2xl border border-purple-400/30 backdrop-blur-sm" style={{ backgroundColor: '#9F449F' }}>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-wider uppercase">
                Ready For Your Next Challenge?
              </h2>
              <button
                onClick={() => navigate('/login')}
                className="bg-white px-10 py-4 text-lg font-bold rounded-2xl shadow-lg hover:bg-gray-100 hover:scale-105 hover:-translate-y-1 transition-all duration-300 uppercase tracking-wide border-2 border-white"
                style={{ color: '#9F449F' }}
              >
                Create New Goal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;