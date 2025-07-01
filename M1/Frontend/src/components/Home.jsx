import React, { useEffect, useState, useRef } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Avatar,
  Chip,
  IconButton,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useAppContext } from './components/AppContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/animations.css';
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
  MessageCircle,
  Zap,
  Palette,
  Award,
  MessageSquare
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const [stats, setStats] = useState({ users: 0, courses: 0, achievements: 0 });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    // Initialize AOS with enhanced settings
    AOS.init({
      duration: 1200,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
      delay: 100,
    });

    // Animate stats counter
    const animateStats = async () => {
      const increment = (target, duration) => {
        let current = 0;
        const step = target / (duration / 50);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setStats(prev => ({ ...prev, users: Math.floor(current) }));
        }, 50);
      };

      setTimeout(() => {
        increment(12547, 2000);
        setTimeout(() => setStats(prev => ({ ...prev, courses: 847 })), 500);
        setTimeout(() => setStats(prev => ({ ...prev, achievements: 68392 })), 1000);
      }, 1000);
    };

    animateStats();

    // Auto-rotate testimonials
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      clearInterval(testimonialTimer);
    };
  }, []);

  useEffect(() => {
    if (isHeroInView) {
      controls.start('visible');
    }
  }, [isHeroInView, controls]);

  // Removed automatic redirect - users can visit homepage even when authenticated

  const FloatingShape = ({ className, size, top, left, animationDelay = 0, gradientVariant = 0 }) => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
      const handleScroll = () => setScrollY(window.scrollY);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Perfect gradients matching the reference image - smooth diagonal transitions
    const gradientVariations = [
      // Main gradient exactly like reference: pink/coral bottom-left to purple/blue top-right
      'linear-gradient(135deg, #FF9AA2 0%, #FFB7B2 20%, #FFDAC1 40%, #E2F0CB 60%, #B5EAD7 80%, #C7CEEA 100%)',
      'linear-gradient(135deg, #FF8A95 0%, #FFAAA5 20%, #FFD3A5 40%, #FD9853 60%, #C7CEEA 80%, #8B5DFF 100%)', 
      'linear-gradient(135deg, #FFA8B6 0%, #D4A5C4 20%, #B794C7 40%, #9B83CA 60%, #8B5DFF 80%, #6B46C1 100%)',
      'linear-gradient(135deg, #FF6B9D 0%, #E879F9 20%, #C084FC 40%, #A78BFA 60%, #8B5CF6 80%, #7C3AED 100%)',
      'linear-gradient(135deg, #F093FB 0%, #F5576C 20%, #4FACFE 40%, #00F2FE 60%, #43E97B 80%, #38F9D7 100%)',
      'linear-gradient(135deg, #FFB199 0%, #FF0844 20%, #FFB199 40%, #FF0844 60%, #C471ED 80%, #8B5DFF 100%)',
      'linear-gradient(135deg, #A8EDEA 0%, #FED6E3 20%, #FFCCD5 40%, #FFCCD5 60%, #C8B2DB 80%, #9BB5FF 100%)',
    ];

    return (
      <motion.div
        className={`floating-shape-3d ${className}`}
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: '50%', // Always a perfect circle
          top,
          left,
          zIndex: 1,
          background: gradientVariations[gradientVariant % gradientVariations.length],
          boxShadow: `
            0 20px 40px -15px rgba(255, 154, 162, 0.3),
            0 8px 16px -8px rgba(255, 183, 178, 0.2),
            0 2px 4px -1px rgba(0, 0, 0, 0.06)
          `,
          backdropFilter: 'none',
          border: 'none',
          transform: `translateY(${scrollY * (0.15 + animationDelay * 0.08)}px) translateX(${scrollY * (0.08 + animationDelay * 0.04)}px)`,
          transition: 'transform 0.1s ease-out, box-shadow 0.3s ease',
          opacity: 0.9,
        }}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.3 }
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.9, scale: 1 }}
        transition={{ duration: 0.8, delay: animationDelay * 0.2 }}
      />
    );
  };

  const GradientText = ({ children, variant = 'h2' }) => (
    <Typography
      variant={variant}
      sx={{
        background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FFEAA7)',
        backgroundSize: '300% 300%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: 'gradientShift 4s ease infinite',
        '@keyframes gradientShift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      }}
    >
      {children}
    </Typography>
  );

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Computer Science Student",
      university: "Stanford University",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=60&h=60&fit=crop&crop=face",
      quote: "StudyMate's AI-powered study plans helped me increase my GPA from 3.2 to 3.9 in just one semester. The personalized approach made all the difference!",
      rating: 5,
      achievement: "Dean's List"
    },
    {
      name: "Mike Chen",
      role: "Medical Student",
      university: "Harvard Medical School",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
      quote: "The spaced repetition flashcards made memorizing thousands of medical terms manageable. I passed my boards on the first try!",
      rating: 5,
      achievement: "Board Certified"
    },
    {
      name: "Emily Davis",
      role: "Language Learner",
      university: "Self-taught Polyglot",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
      quote: "I became fluent in French in 6 months using StudyMate's community features and progress tracking. The motivation system is incredible!",
      rating: 5,
      achievement: "C2 Certified"
    },
    {
      name: "Alex Rodriguez",
      role: "Engineering Student",
      university: "MIT",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
      quote: "The AI tutor helped me understand complex calculus concepts that I struggled with for months. Now I'm helping other students!",
      rating: 5,
      achievement: "Peer Tutor"
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', overflow: 'hidden', position: 'relative' }}>
      {/* Hero Section */}
      <Box
        ref={heroRef}
        sx={{
          background: '#E8E6F5',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: 'black',
          py: { xs: 10, md: 15 },
          textAlign: { xs: 'center', md: 'left' },
          position: 'relative',
          overflow: 'hidden',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          fontFamily: 'Rajdhani, sans-serif',
        }}
      >

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Typography 
              variant="h1" 
              component="h1" 
              sx={{ 
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 900,
                fontSize: { xs: '3rem', sm: '4rem', md: '5.5rem' },
                mb: 1,
                lineHeight: 1.1,
                color: '#9F449F',
                textAlign: 'left',
                ml: { xs: 2, md: 0 },
              }}
            >
              StudyMate
            </Typography>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            <Typography 
              variant="h3" 
              component="h2" 
              sx={{ 
                mb: 3, 
                fontSize: { xs: '1.8rem', md: '2.5rem' },
                fontWeight: 400,
                lineHeight: 1.3,
                textAlign: 'left',
                fontFamily: 'Orbitron, sans-serif',
                color: '#000000',
                ml: { xs: 2, md: 0 },
              }}
            >
              Your AI-Powered Learning Revolution
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 6, 
                fontSize: { xs: '1.1rem', md: '1.3rem' }, 
                opacity: 0.9,
                maxWidth: { xs: '700px', md: '600px' },
                mx: { xs: 'auto', md: 0 },
                lineHeight: 1.7,
                fontWeight: 300,
                textAlign: 'left',
                ml: { xs: 2, md: 0 },
              }}
            >
              Transform your learning journey with personalized AI tutoring, adaptive study plans, 
              and a community of motivated learners. Achieve your goals faster than ever before.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
          >
            <Box sx={{ 
              display: 'flex', 
              gap: 3, 
              justifyContent: { xs: 'center', md: 'flex-start' }, 
              flexWrap: 'wrap', 
              mb: 4,
              ml: { xs: 2, md: 0 },
            }}>
              <Button
                component={Link}
                to="/login"
                variant="contained"
                size="large"
                startIcon={<TrendingUp />}
                sx={{
                  bgcolor: '#9F449F',
                  color: 'black',
                  px: 5,
                  py: 2.5,
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  borderRadius: '15px',
                  // boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  '&:hover': {
                    bgcolor: 'grey.100',
                    transform: 'translateY(-3px) scale(1.02)',
                    // boxShadow: '0 15px 40px rgba(0,0,0,0.3)',
                  },
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                Get Started
              </Button>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                size="large"
                startIcon={<Play />}
                sx={{
                  borderColor: '#9F449F',
                  color: 'black',
                  px: 5,
                  py: 2.5,
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  borderRadius: '15px',
                  borderWidth: '2px',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    transform: 'translateY(-3px) scale(1.02)',
                    // boxShadow: '0 10px 30px rgba(255, 255, 255, 0.2)',
                  },
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                Watch Demo
              </Button>
            </Box>

            {/* Trust indicators */}
            {/* <Box sx={{ 
              display: 'flex', 
              justifyContent: { xs: 'center', md: 'flex-start' }, 
              alignItems: 'center', 
              gap: 4, 
              flexWrap: 'wrap', 
              opacity: 0.8 
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Star sx={{ color: '#FFD700' }} />
                <Typography variant="body2">4.9/5 Rating</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Users />
                <Typography variant="body2">50K+ Students</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Trophy sx={{ color: '#FFD700' }} />
                <Typography variant="body2">Award Winning</Typography>
              </Box>
            </Box> */}
          </motion.div>
        </Container>

        {/* Decorative Gradient Circles */}
        <Box sx={{
          position: 'absolute',
          right: { xs: '20px', md: '80px' },
          top: '50%',
          transform: 'translateY(-50%)',
          display: { xs: 'none', md: 'block' },
          zIndex: 3,
        }}>
          {/* Large Gradient Circle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 0.7, scale: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <Box sx={{
              width: '280px',
              height: '280px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FF6B9D 0%, #E879F9 25%, #C084FC 50%, #A78BFA 75%, #8B5CF6 100%)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 15px 25px rgba(0, 0, 0, 0.3)',
              opacity: 0.8,
              animation: 'float 6s ease-in-out infinite',
              '@keyframes float': {
                '0%, 100%': { transform: 'translateY(0px)' },
                '50%': { transform: 'translateY(-15px)' },
              },
            }} />
          </motion.div>

          {/* Medium Gradient Circle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -30, y: 40 }}
            animate={{ opacity: 0.6, scale: 1, x: -50, y: 60 }}
            transition={{ duration: 1.4, delay: 1.0, ease: "easeOut" }}
            whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            <Box sx={{
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'linear-gradient(225deg, #FF9AA2 0%, #FFB7B2 30%, #FFDAC1 60%, #C7CEEA 100%)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35), 0 10px 20px rgba(0, 0, 0, 0.25)',
              opacity: 0.7,
              animation: 'float 8s ease-in-out infinite 2s',
            }} />
          </motion.div>

          {/* Small Gradient Circle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 80, y: -60 }}
            animate={{ opacity: 0.5, scale: 1, x: 100, y: -80 }}
            transition={{ duration: 1.6, delay: 1.2, ease: "easeOut" }}
            whileHover={{ scale: 1.15, transition: { duration: 0.3 } }}
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            <Box sx={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'linear-gradient(315deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
              boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3), 0 8px 15px rgba(0, 0, 0, 0.2)',
              opacity: 0.6,
              animation: 'float 10s ease-in-out infinite 4s',
            }} />
          </motion.div>

          {/* Extra Small Gradient Circle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -100, y: -40 }}
            animate={{ opacity: 0.4, scale: 1, x: -120, y: -60 }}
            transition={{ duration: 1.8, delay: 1.4, ease: "easeOut" }}
            whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            <Box sx={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #4facfe 0%, #00f2fe 50%, #43e97b 100%)',
              boxShadow: '0 12px 25px rgba(0, 0, 0, 0.25), 0 6px 12px rgba(0, 0, 0, 0.15)',
              opacity: 0.5,
              animation: 'float 12s ease-in-out infinite 6s',
            }} />
          </motion.div>
        </Box>

        {/* Additional Bubbles - Top Left */}
        <Box sx={{
          position: 'absolute',
          left: '10%',
          top: '15%',
          zIndex: 1,
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            <Box sx={{
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FFB7B2 0%, #FFDAC1 50%, #E2F0CB 100%)',
              boxShadow: '0 12px 25px rgba(0, 0, 0, 0.2)',
              opacity: 0.6,
              animation: 'float 9s ease-in-out infinite 1s',
            }} />
          </motion.div>
        </Box>

        {/* Additional Bubbles - Top Right */}
        <Box sx={{
          position: 'absolute',
          right: '5%',
          top: '10%',
          zIndex: 1,
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 2.5, delay: 1.5 }}
          >
            <Box sx={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #F093FB 0%, #F5576C 50%, #4FACFE 100%)',
              boxShadow: '0 8px 15px rgba(0, 0, 0, 0.18)',
              opacity: 0.5,
              animation: 'float 11s ease-in-out infinite 3s',
            }} />
          </motion.div>
        </Box>

        {/* Additional Bubbles - Bottom Left */}
        <Box sx={{
          position: 'absolute',
          left: '3%',
          bottom: '20%',
          zIndex: 1,
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.35, scale: 1 }}
            transition={{ duration: 2.2, delay: 2 }}
          >
            <Box sx={{
              width: '110px',
              height: '110px',
              borderRadius: '50%',
              background: 'linear-gradient(225deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
              boxShadow: '0 16px 30px rgba(0, 0, 0, 0.22)',
              opacity: 0.4,
              animation: 'float 7s ease-in-out infinite 5s',
            }} />
          </motion.div>
        </Box>
      </Box>

      {/* Enhanced Stats Section */}
      <Box sx={{ 
        py: 4, 
        background: '#E8E6F5', 
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background Gradient Circles */}
        <Box sx={{
          position: 'absolute',
          left: '5%',
          top: '20%',
          zIndex: 1,
        }}>
          <Box sx={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF9AA2 0%, #FFB7B2 50%, #FFDAC1 100%)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            opacity: 0.4,
            animation: 'float 8s ease-in-out infinite',
          }} />
        </Box>
        
        <Box sx={{
          position: 'absolute',
          right: '8%',
          bottom: '15%',
          zIndex: 1,
        }}>
          <Box sx={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'linear-gradient(225deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.25)',
            opacity: 0.3,
            animation: 'float 10s ease-in-out infinite 3s',
          }} />
        </Box>

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-around', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 4,
            py: 4,
          }}>
            {/* 95% Success Rate */}
            <Box sx={{ 
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}>
              <Typography 
                variant="h2" 
                sx={{ 
                  color: '#9F449F', 
                  fontWeight: 900,
                  fontSize: { xs: '3rem', md: '4rem' },
                  fontFamily: 'Orbitron, sans-serif',
                }}
              >
                95%
              </Typography>
              <Box sx={{ 
                width: '4px', 
                height: '60px', 
                backgroundColor: '#9F449F',
                borderRadius: '2px',
                display: { xs: 'none', md: 'block' }
              }} />
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'black', 
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  textAlign: 'left',
                }}
              >
                success rate
              </Typography>
            </Box>

            {/* 50k+ Students */}
            <Box sx={{ 
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}>
              <Typography 
                variant="h2" 
                sx={{ 
                  color: '#9F449F', 
                  fontWeight: 900,
                  fontSize: { xs: '3rem', md: '4rem' },
                  fontFamily: 'Orbitron, sans-serif',
                }}
              >
                50k+
              </Typography>
              <Box sx={{ 
                width: '4px', 
                height: '60px', 
                backgroundColor: '#9F449F',
                borderRadius: '2px',
                display: { xs: 'none', md: 'block' }
              }} />
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'black', 
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  textAlign: 'left',
                }}
              >
                success rate
              </Typography>
            </Box>

            {/* 4.9 Star Rating */}
            <Box sx={{ 
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    color: '#9F449F', 
                    fontWeight: 900,
                    fontSize: { xs: '3rem', md: '4rem' },
                    fontFamily: 'Orbitron, sans-serif',
                  }}
                >
                  4.9
                </Typography>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    color: '#9F449F', 
                    fontWeight: 900,
                    fontSize: { xs: '2rem', md: '3rem' },
                  }}
                >
                  ★
                </Typography>
              </Box>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'black', 
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  textAlign: 'left',
                  ml: { xs: 0, md: 2 }
                }}
              >
                success rate
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Clean 3x3 Features Grid Section */}
      <Box sx={{ 
        py: 6, 
        background: '#E8E6F5',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background Gradient Circles */}
        <Box sx={{
          position: 'absolute',
          left: '2%',
          top: '10%',
          zIndex: 1,
        }}>
          <Box sx={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'linear-gradient(315deg, #4facfe 0%, #00f2fe 50%, #43e97b 100%)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.35)',
            opacity: 0.3,
            animation: 'float 12s ease-in-out infinite 2s',
          }} />
        </Box>
        
        <Box sx={{
          position: 'absolute',
          right: '3%',
          top: '60%',
          zIndex: 1,
        }}>
          <Box sx={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
            boxShadow: '0 18px 35px rgba(0, 0, 0, 0.3)',
            opacity: 0.4,
            animation: 'float 9s ease-in-out infinite 5s',
          }} />
        </Box>

        <Box sx={{
          position: 'absolute',
          left: '50%',
          bottom: '5%',
          transform: 'translateX(-50%)',
          zIndex: 1,
        }}>
          <Box sx={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #C084FC 0%, #A78BFA 50%, #8B5CF6 100%)',
            boxShadow: '0 12px 25px rgba(0, 0, 0, 0.25)',
            opacity: 0.35,
            animation: 'float 7s ease-in-out infinite 1s',
          }} />
        </Box>

        {/* Additional Bubbles for Features Section */}
        <Box sx={{
          position: 'absolute',
          left: '15%',
          top: '30%',
          zIndex: 1,
        }}>
          <Box sx={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            background: 'linear-gradient(225deg, #FF9AA2 0%, #FFB7B2 50%, #FFDAC1 100%)',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
            opacity: 0.4,
            animation: 'float 10s ease-in-out infinite 3s',
          }} />
        </Box>

        <Box sx={{
          position: 'absolute',
          right: '10%',
          top: '20%',
          zIndex: 1,
        }}>
          <Box sx={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.22)',
            opacity: 0.35,
            animation: 'float 8s ease-in-out infinite 7s',
          }} />
        </Box>

        <Box sx={{
          position: 'absolute',
          left: '70%',
          bottom: '25%',
          zIndex: 1,
        }}>
          <Box sx={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #4FACFE 0%, #00F2FE 50%, #43E97B 100%)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.18)',
            opacity: 0.4,
            animation: 'float 11s ease-in-out infinite 4s',
          }} />
        </Box>

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box textAlign="center" mb={4}>
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom
              sx={{ 
                fontWeight: 'bold', 
                color: '#333',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                mb: 2,
              }}
            >
              Why Choose StudyMate?
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ 
                fontSize: '1.2rem', 
                maxWidth: '700px', 
                mx: 'auto', 
                lineHeight: 1.6,
              }}
            >
              Everything you need to accelerate your learning and achieve your academic goals
            </Typography>
          </Box>

          {/* Perfect 3x3 Grid - 3 Columns, 3 Rows */}
          <Grid container spacing={4} justifyContent="center" sx={{ maxWidth: '1200px', mx: 'auto' }}>
            {[
              { 
                icon: <Target size={24} />, 
                title: 'AI-Powered Goals', 
                desc: 'Set custom learning objectives with AI-generated study plans tailored to your needs.',
                color: '#667eea',
              },
              { 
                icon: <Bot size={24} />, 
                title: 'Smart AI Tutor', 
                desc: 'Get instant help and personalized study tips from your 24/7 AI companion.',
                color: '#f093fb',
              },
              { 
                icon: <BarChart3 size={24} />, 
                title: 'Advanced Analytics', 
                desc: 'Monitor your progress with detailed insights and performance metrics.',
                color: '#4facfe',
              },
              { 
                icon: <Brain size={24} />, 
                title: 'Smart Flashcards', 
                desc: 'Create flashcards with spaced repetition algorithms for better retention.',
                color: '#43e97b',
              },
              { 
                icon: <Users size={24} />, 
                title: 'Learning Community', 
                desc: 'Connect with learners, join study groups, and find mentors.',
                color: '#fa709a',
              },
              { 
                icon: <Zap size={24} />, 
                title: 'Productivity Tools', 
                desc: 'Track sessions, manage schedules, and maintain learning habits.',
                color: '#a8edea',
              },
              { 
                icon: <Palette size={24} />, 
                title: 'Personalized Learning', 
                desc: 'Adaptive paths that adjust to your strengths and learning style.',
                color: '#ffecd2',
              },
              { 
                icon: <Award size={24} />, 
                title: 'Achievement System', 
                desc: 'Gamified experience with badges and rewards to stay motivated.',
                color: '#ffd89b',
              },
              { 
                icon: <MessageSquare size={24} />, 
                title: 'Real-time Support', 
                desc: 'Get instant help from mentors and AI assistants anytime.',
                color: '#667eea',
              },
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '300px', // Fixed height for all cards
                    width: '100%', // Full width
                    maxWidth: '350px', // Equal maximum width
                    mx: 'auto', // Center align
                    textAlign: 'center', 
                    p: 3,
                    borderRadius: '16px',
                    background: 'white',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.02)',
                      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
                      border: `2px solid ${feature.color}`,
                      '& .card-icon': {
                        transform: 'scale(1.1)',
                      },
                      '& .accent-line': {
                        width: '80px',
                        backgroundColor: feature.color,
                      },
                    },
                  }}
                >
                  <CardContent sx={{ 
                    p: 0, 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between',
                    '&:last-child': { pb: 0 }
                  }}>
                    {/* Icon Section */}
                    <Box 
                      className="card-icon"
                      sx={{ 
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}40)`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mx: 'auto',
                        mb: 2,
                        transition: 'transform 0.3s ease',
                        border: `2px solid ${feature.color}30`,
                        color: feature.color,
                      }}
                    >
                      {feature.icon}
                    </Box>
                    
                    {/* Content Section */}
                    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <Typography 
                        variant="h6" 
                        gutterBottom 
                        fontWeight="bold"
                        sx={{ 
                          mb: 2, 
                          color: '#333',
                          fontSize: '1.2rem',
                          minHeight: '30px',
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ 
                          lineHeight: 1.6, 
                          fontSize: '0.9rem',
                          minHeight: '80px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          px: 1,
                        }}
                      >
                        {feature.desc}
                      </Typography>
                    </Box>

                    {/* Accent Line */}
                    <Box
                      className="accent-line"
                      sx={{
                        width: '60px',
                        height: '3px',
                        backgroundColor: feature.color,
                        borderRadius: '2px',
                        mx: 'auto',
                        mt: 2,
                        transition: 'all 0.3s ease',
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Enhanced Testimonials Section */}
      <Box sx={{ 
        py: 8, 
        background: '#E8E6F5', 
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background Gradient Circles */}
        <Box sx={{
          position: 'absolute',
          right: '5%',
          top: '25%',
          zIndex: 1,
        }}>
          <Box sx={{
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            background: 'linear-gradient(225deg, #FF6B9D 0%, #E879F9 50%, #C084FC 100%)',
            boxShadow: '0 22px 45px rgba(0, 0, 0, 0.32)',
            opacity: 0.35,
            animation: 'float 11s ease-in-out infinite 4s',
          }} />
        </Box>
        
        <Box sx={{
          position: 'absolute',
          left: '8%',
          bottom: '20%',
          zIndex: 1,
        }}>
          <Box sx={{
            width: '110px',
            height: '110px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFB7B2 0%, #FFDAC1 50%, #E2F0CB 100%)',
            boxShadow: '0 16px 32px rgba(0, 0, 0, 0.28)',
            opacity: 0.4,
            animation: 'float 9s ease-in-out infinite 6s',
          }} />
        </Box>

        {/* Additional Bubbles for Testimonials Section */}
        <Box sx={{
          position: 'absolute',
          left: '20%',
          top: '15%',
          zIndex: 1,
        }}>
          <Box sx={{
            width: '75px',
            height: '75px',
            borderRadius: '50%',
            background: 'linear-gradient(315deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
            opacity: 0.3,
            animation: 'float 13s ease-in-out infinite 2s',
          }} />
        </Box>

        <Box sx={{
          position: 'absolute',
          right: '15%',
          bottom: '30%',
          zIndex: 1,
        }}>
          <Box sx={{
            width: '95px',
            height: '95px',
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #4FACFE 0%, #00F2FE 100%)',
            boxShadow: '0 14px 28px rgba(0, 0, 0, 0.25)',
            opacity: 0.35,
            animation: 'float 10s ease-in-out infinite 8s',
          }} />
        </Box>

        <Box sx={{
          position: 'absolute',
          left: '5%',
          top: '50%',
          zIndex: 1,
        }}>
          <Box sx={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'linear-gradient(225deg, #F093FB 0%, #F5576C 100%)',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
            opacity: 0.4,
            animation: 'float 12s ease-in-out infinite 5s',
          }} />
        </Box>

        <Box sx={{
          position: 'absolute',
          right: '25%',
          top: '10%',
          zIndex: 1,
        }}>
          <Box sx={{
            width: '65px',
            height: '65px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFB199 0%, #FF0844 100%)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.18)',
            opacity: 0.3,
            animation: 'float 9s ease-in-out infinite 1s',
          }} />
        </Box>

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box textAlign="center" mb={6} data-aos="fade-up">
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom
              sx={{ 
                fontWeight: 'bold', 
                color: 'text.primary',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                mb: 2
              }}
            >
              Success Stories
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ fontSize: '1.3rem', maxWidth: '600px', mx: 'auto', lineHeight: 1.6 }}
            >
              Join thousands of successful learners who transformed their education with StudyMate
            </Typography>
          </Box>

          {/* Automatic Testimonial Slider */}
          <Box sx={{ position: 'relative', overflow: 'hidden', maxWidth: '1200px', mx: 'auto' }}>
            <Box
              sx={{
                display: 'flex',
                transition: 'transform 0.5s ease-in-out',
                transform: `translateX(-${currentTestimonial * 33.333}%)`,
                width: '300%', // 3 cards * 100%
              }}
            >
              {testimonials.map((testimonial, index) => (
                <Box key={index} sx={{ width: '33.333%', px: 2 }}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Paper
                      sx={{
                        height: '400px', // Fixed height for all cards
                        p: 4,
                        borderRadius: 4,
                        background: 'white',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          transform: 'translateY(-8px) scale(1.02)',
                          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
                          border: '2px solid #9F449F',
                        },
                        '&::before': {
                          content: '"★★★★★"',
                          position: 'absolute',
                          top: 20,
                          right: 20,
                          color: '#FFD700',
                          fontSize: '1rem',
                        }
                      }}
                    >
                      {/* Quote Section */}
                      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                        <Typography
                          variant="body1"
                          sx={{ 
                            fontStyle: 'italic', 
                            lineHeight: 1.6,
                            fontSize: '1rem',
                            color: 'text.primary',
                            textAlign: 'center',
                            minHeight: '120px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          "{testimonial.quote}"
                        </Typography>
                      </Box>
                      
                      {/* Profile Section */}
                      <Box sx={{ textAlign: 'center' }}>
                        <Avatar 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          sx={{ 
                            width: 60, 
                            height: 60, 
                            mx: 'auto', 
                            mb: 2,
                            border: '3px solid #9F449F'
                          }}
                        />
                        <Typography variant="h6" fontWeight="bold" color="text.primary" sx={{ mb: 1 }}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {testimonial.role}
                        </Typography>
                        <Typography variant="caption" color="#9F449F" fontWeight="bold" sx={{ mb: 2, display: 'block' }}>
                          {testimonial.university}
                        </Typography>
                        
                        <Chip 
                          label={testimonial.achievement}
                          size="small"
                          sx={{ 
                            bgcolor: '#9F449F', 
                            color: 'white',
                            fontWeight: 'bold',
                          }}
                        />
                      </Box>
                    </Paper>
                  </motion.div>
                </Box>
              ))}
            </Box>

            {/* Slider Indicators */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 1 }}>
              {testimonials.slice(0, 3).map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: currentTestimonial === index ? '#9F449F' : 'rgba(159, 68, 159, 0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: '#9F449F',
                    },
                  }}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </Box>
          </Box>

          {/* Cute Featured Quote Box */}
          <Box sx={{ mt: 8, textAlign: 'center' }} data-aos="fade-up" data-aos-delay="600">
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontSize: '0.9rem' }}>
              💫 Featured Student Quote
            </Typography>
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Box sx={{ 
                maxWidth: 500, 
                mx: 'auto', 
                p: 3,
                borderRadius: 3,
                backgroundColor: 'rgba(128, 128, 128, 0.1)', // Low opacity grey
                border: '1px solid rgba(128, 128, 128, 0.2)',
                backdropFilter: 'blur(5px)',
              }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 2, 
                    fontStyle: 'italic',
                    color: '#9F449F', // Purple text color
                    fontSize: '1rem',
                    lineHeight: 1.6,
                  }}
                >
                  "{testimonials[currentTestimonial].quote}"
                </Typography>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    color: '#9F449F',
                    fontWeight: 'bold',
                  }}
                >
                  — {testimonials[currentTestimonial].name}, {testimonials[currentTestimonial].achievement}
                </Typography>
              </Box>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* Enhanced CTA Section */}
      <Box 
        sx={{ 
          background: '#E8E6F5',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: 'black', 
          py: 8,
          position: 'relative',
          overflow: 'hidden',
        }}
      >

        <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Box data-aos="fade-up">
              <Chip 
                label="🎓 Join the Learning Revolution" 
                sx={{ 
                  bgcolor: 'rgba(157, 140, 255, 0.3)', 
                  color: 'black',
                  mb: 4,
                  px: 3,
                  py: 1,
                  fontSize: '1rem',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(157, 140, 255, 0.5)'
                }} 
              />
        
              {/* Minimal CTA Container */}
              <Box 
                sx={{
                  backgroundColor: '#9F449F',
                  borderRadius: '20px',
                  padding: { xs: 4, md: 6 },
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.25)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Typography 
                  variant="h2" 
                  gutterBottom 
                  sx={{ 
                    fontFamily: '"Orbitron", "Courier New", monospace',
                    fontWeight: 900, 
                    mb: 6,
                    fontSize: { xs: '2rem', md: '3rem' },
                    lineHeight: 1.2,
                    color: 'white',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                  }}
                >
                  READY TO TRANSFORM YOUR LEARNING?
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    component={Link}
                    to="/login"
                    variant="contained"
                    size="small"
                    startIcon={<TrendingUp />}
                    sx={{
                      bgcolor: 'white',
                      color: '#9F449F',
                      px: 3,
                      py: 1.5,
                      fontSize: '0.9rem',
                      fontFamily: '"Orbitron", "Courier New", monospace',
                      fontWeight: 'bold',
                      borderRadius: '8px',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                      border: '2px solid transparent',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        transform: 'translateY(-2px) scale(1.02)',
                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
                        border: '2px solid rgba(159, 68, 159, 0.3)',
                      },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    START JOURNEY
                  </Button>
                </Box>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
