/* global console */
import React, { useState } from 'react';
import { Brain, CheckCircle, ArrowRight, BarChart3, BookOpen, Eye, Ear, Hand, FileText, Lightbulb, Target, Users, Clock, User, Heart, Zap, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { updateQuizResults } from '../api.js'; 


const convertMBTIToPersonalityStyle = (mbtiType) => {
  const mbtiToPersonalityMap = {
    // Analytical - thinking, systematic, data-driven
    'INTJ': 'Analytical', 'INTP': 'Analytical', 'ISTJ': 'Analytical',
    
    // Driver - goal-oriented, decisive, results-focused  
    'ENTJ': 'Driver', 'ESTJ': 'Driver', 'ESTP': 'Driver',
    
    // Amiable - supportive, team-oriented, relationship-focused
    'ISFJ': 'Amiable', 'ESFJ': 'Amiable', 'INFJ': 'Amiable', 
    'ENFJ': 'Amiable', 'ISFP': 'Amiable',
    
    // Expressive - enthusiastic, creative, people-oriented
    'ENFP': 'Expressive', 'ESFP': 'Expressive', 'INFP': 'Expressive', 
    'ENTP': 'Expressive', 'ISTP': 'Expressive'
  };
  
  return mbtiToPersonalityMap[mbtiType] || 'Analytical';
};


// Function to extract learning style name without "Learner" suffix
const extractLearningStyleName = (primaryStyle) => {
  return primaryStyle.replace(' Learner', '');
};

// Function to save quiz results to database
const saveQuizResultsToDatabase = async (userId, quizResult) => {
  try {
    const updateData = {
      learningStyle: extractLearningStyleName(quizResult.primaryStyle),
      personalityStyle: convertMBTIToPersonalityStyle(quizResult.personalityType),
      testResults: {
        learningStyleScore: {
          ...quizResult.learningScores,
          personalityScores: quizResult.personalityScores,
          mbtiType: quizResult.personalityType,
          primaryStyle: quizResult.primaryStyle,
          secondaryStyle: quizResult.secondaryStyle,
          personalityTraits: quizResult.personalityTraits,
          studyStrategies: quizResult.studyStrategies,
          careerSuggestions: quizResult.careerSuggestions,
          toolRecommendations: quizResult.toolRecommendations,
          insights: quizResult.learningPersonalityInsights,
          workingStyle: quizResult.workingStyle,
          motivationFactors: quizResult.motivationFactors,
          strengths: quizResult.strengths,
          challenges: quizResult.challenges,
          summary: quizResult.summary,
          isAiGenerated: quizResult.isAiGenerated || false
        },
        completedAt: new Date()
      },
      quiz: 1
    };

    console.log('Sending update data:', updateData);

    // Use the API function
    const response = await updateQuizResults(userId, updateData);
    
    console.log('API response:', response);
    
    if (response.data && response.data.success) {
      console.log('Quiz results saved successfully:', response.data);
      return response.data.data.user;
    } else {
      throw new Error('API response indicates failure');
    }

  } catch (error) {
    console.error('Error saving quiz results:', error);
    
    // Log more details about the error
    if (error.response) {
      console.error('Server responded with error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    
    throw error;
  }
};






const LearningPersonalityQuiz = () => {

const handleQuizCompletion = async (analysis) => {
  try {
    setResult(analysis);
    setIsAnalyzing(false);
    
    // Get current user ID - improve this based on your auth system
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
      console.warn('No user ID found in localStorage');
      return;
    }

    // Validate that userId looks like a MongoDB ObjectId
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      console.error('Invalid user ID format:', userId);
      return;
    }

    console.log('Quiz completed, results stored in state. Will save to DB when user clicks "Start Your Journey"');
    
  } catch (error) {
    console.error('Error in handleQuizCompletion:', error);
    // Still show results even if there's an error
    setResult(analysis);
    setIsAnalyzing(false);
  }
};

const resetQuiz = async () => {
  try {
    setIsSaving(true); // Show loading state
    
    // Get current user ID
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
      console.warn('No user ID found in localStorage');
      navigate('/dashboard');
      return;
    }

    // Validate that userId looks like a MongoDB ObjectId
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      console.error('Invalid user ID format:', userId);
      navigate('/dashboard');
      return;
    }

    // Save quiz results to database if we have results
    if (result) {
      console.log('Saving quiz results to database before navigation...');
      
      try {
        const savedUser = await saveQuizResultsToDatabase(userId, result);
        console.log('Quiz results saved successfully:', savedUser);
      } catch (saveError) {
        console.error('Error saving quiz results:', saveError);
        // Continue with navigation even if save fails
      }
    }

    // Navigate to dashboard
    navigate('/dashboard'); 
    
  } catch (error) {
    console.error('Error in resetQuiz:', error);
    // Navigate anyway
    navigate('/dashboard');
  } finally {
    setIsSaving(false); // Hide loading state
  }
};




    const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const apiKey = 'AIzaSyDjDymMRKf1p8cT4ayV9wHiyd5jFmvBBdQ'; // Replace with your actual API key

const questions = [
    {
      id: 1,
      question: "When you need to remember directions to a new place, what works best for you?",
      options: [
        { text: "I draw a map or visualize the route in my mind", value: "visual", weight: 3, personality: { openness: 2, conscientiousness: 1 } },
        { text: "I listen to verbal directions and repeat them to myself", value: "auditory", weight: 3, personality: { extraversion: 1, agreeableness: 1 } },
        { text: "I need to walk or drive the route once to remember it", value: "kinesthetic", weight: 3, personality: { openness: 2, extraversion: 1 } },
        { text: "I write down step-by-step directions", value: "reading", weight: 3, personality: { conscientiousness: 2, neuroticism: -1 } }
      ]
    },
    {
      id: 2,
      question: "In a classroom setting, you learn best when:",
      options: [
        { text: "The teacher uses diagrams, charts, and visual aids", value: "visual", weight: 3, personality: { openness: 1, conscientiousness: 1 } },
        { text: "The teacher explains things verbally and encourages discussion", value: "auditory", weight: 3, personality: { extraversion: 2, agreeableness: 1 } },
        { text: "You can participate in hands-on activities and experiments", value: "kinesthetic", weight: 3, personality: { openness: 2, extraversion: 1 } },
        { text: "You can take detailed notes and read textbooks", value: "reading", weight: 3, personality: { conscientiousness: 2, openness: -1 } }
      ]
    },
    {
      id: 3,
      question: "When learning a new skill, you prefer to:",
      options: [
        { text: "Watch someone demonstrate it first", value: "visual", weight: 3, personality: { conscientiousness: 1, neuroticism: 1 } },
        { text: "Have someone explain it step by step", value: "auditory", weight: 3, personality: { agreeableness: 2, extraversion: 1 } },
        { text: "Jump right in and learn by doing", value: "kinesthetic", weight: 3, personality: { openness: 2, extraversion: 2, neuroticism: -1 } },
        { text: "Read instructions or a manual first", value: "reading", weight: 3, personality: { conscientiousness: 2, neuroticism: 1 } }
      ]
    },
    {
      id: 4,
      question: "When you're trying to concentrate, you:",
      options: [
        { text: "Need a clean, organized, visually appealing space", value: "visual", weight: 2, personality: { conscientiousness: 2, neuroticism: 1 } },
        { text: "Can focus better with some background music or sounds", value: "auditory", weight: 2, personality: { openness: 1, extraversion: 1 } },
        { text: "Need to move around or fidget with something", value: "kinesthetic", weight: 2, personality: { openness: 1, neuroticism: 1 } },
        { text: "Prefer complete silence to read and think", value: "reading", weight: 2, personality: { conscientiousness: 1, extraversion: -2 } }
      ]
    },
    {
      id: 5,
      question: "Your ideal study group would involve:",
      options: [
        { text: "Creating mind maps and visual presentations together", value: "visual", weight: 2, personality: { openness: 2, conscientiousness: 1 } },
        { text: "Discussing concepts and explaining things to each other", value: "auditory", weight: 2, personality: { extraversion: 2, agreeableness: 2 } },
        { text: "Working on projects and building things together", value: "kinesthetic", weight: 2, personality: { openness: 2, agreeableness: 1 } },
        { text: "Sharing notes and writing summaries together", value: "reading", weight: 2, personality: { conscientiousness: 2, agreeableness: 1 } }
      ]
    },
    {
      id: 6,
      question: "When you have free time, you most enjoy:",
      options: [
        { text: "Watching movies, looking at art, or browsing visual content", value: "visual", weight: 2, personality: { openness: 2, extraversion: -1 } },
        { text: "Listening to music, podcasts, or having conversations", value: "auditory", weight: 2, personality: { extraversion: 2, openness: 1 } },
        { text: "Playing sports, exercising, or working with your hands", value: "kinesthetic", weight: 2, personality: { extraversion: 1, conscientiousness: 1, neuroticism: -1 } },
        { text: "Reading books, writing, or solving puzzles", value: "reading", weight: 2, personality: { openness: 1, extraversion: -2, conscientiousness: 1 } }
      ]
    },
    {
      id: 7,
      question: "When someone is explaining something complex to you:",
      options: [
        { text: "You ask them to draw it out or show you examples", value: "visual", weight: 3, personality: { openness: 1, agreeableness: 1 } },
        { text: "You listen carefully and ask clarifying questions", value: "auditory", weight: 3, personality: { agreeableness: 2, conscientiousness: 1 } },
        { text: "You want to try it yourself right away", value: "kinesthetic", weight: 3, personality: { openness: 2, extraversion: 1, neuroticism: -1 } },
        { text: "You prefer to get written instructions or materials", value: "reading", weight: 3, personality: { conscientiousness: 2, extraversion: -1 } }
      ]
    },
    {
      id: 8,
      question: "Your memory works best when you:",
      options: [
        { text: "Associate information with images or visual cues", value: "visual", weight: 3, personality: { openness: 2, conscientiousness: 1 } },
        { text: "Repeat information out loud or hear it multiple times", value: "auditory", weight: 3, personality: { extraversion: 1, conscientiousness: 1 } },
        { text: "Connect information to physical experiences or movements", value: "kinesthetic", weight: 3, personality: { openness: 2, extraversion: 1 } },
        { text: "Write things down and review your notes", value: "reading", weight: 3, personality: { conscientiousness: 3, neuroticism: 1 } }
      ]
    },
    {
  id: 9,
  question: "When taking a test, you perform better when:", // Fixed typo
  options: [
    { text: "Questions include diagrams, charts, or visual elements", value: "visual", weight: 2, personality: { openness: 1, conscientiousness: 1 } },
    { text: "You can read questions out loud or hear them spoken", value: "auditory", weight: 2, personality: { extraversion: 1, neuroticism: 1 } },
    { text: "You can move around or use stress balls while thinking", value: "kinesthetic", weight: 2, personality: { openness: 1, neuroticism: 2 } },
    { text: "Questions are clearly written with detailed instructions", value: "reading", weight: 2, personality: { conscientiousness: 2, neuroticism: 1 } }
  ]
},
    {
      id: 10,
      question: "Your biggest strength in learning is:",
      options: [
        { text: "Seeing the big picture and understanding visual relationships", value: "visual", weight: 3, personality: { openness: 2, conscientiousness: 1 } },
        { text: "Processing information through discussion and verbal reasoning", value: "auditory", weight: 3, personality: { extraversion: 2, agreeableness: 2 } },
        { text: "Learning through trial and error and practical application", value: "kinesthetic", weight: 3, personality: { openness: 3, neuroticism: -1 } },
        { text: "Analyzing detailed information and organizing thoughts in writing", value: "reading", weight: 3, personality: { conscientiousness: 3, openness: 1 } }
      ]
    },
    {
      id: 11,
      question: "In social situations, you typically:",
      options: [
        { text: "Observe and take in the visual details of your surroundings", value: "visual", weight: 1, personality: { extraversion: -1, openness: 2, conscientiousness: 1 } },
        { text: "Engage in conversations and enjoy meeting new people", value: "auditory", weight: 1, personality: { extraversion: 3, agreeableness: 2 } },
        { text: "Prefer active, hands-on group activities", value: "kinesthetic", weight: 1, personality: { extraversion: 2, openness: 2 } },
        { text: "Feel more comfortable in quiet, small group settings", value: "reading", weight: 1, personality: { extraversion: -2, conscientiousness: 1, neuroticism: 1 } }
      ]
    },
    {
      id: 12,
      question: "When facing a challenging problem, you:",
      options: [
        { text: "Create diagrams or visual models to understand it", value: "visual", weight: 2, personality: { openness: 2, conscientiousness: 2 } },
        { text: "Talk it through with others to gain different perspectives", value: "auditory", weight: 2, personality: { extraversion: 2, agreeableness: 2, openness: 1 } },
        { text: "Experiment with different approaches hands-on", value: "kinesthetic", weight: 2, personality: { openness: 3, extraversion: 1, neuroticism: -1 } },
        { text: "Research thoroughly and plan your approach carefully", value: "reading", weight: 2, personality: { conscientiousness: 3, openness: 1 } }
      ]
    }
  ];

  const analyzeWithGemini = async (learningScores, personalityScores, selectedAnswers) => {
    if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
      return generateBasicAnalysis(learningScores, personalityScores, selectedAnswers);
    }
    try {
      const responsesSummary = selectedAnswers.map((answer, index) => 
        `Q${index + 1}: ${questions[index].question}\nAnswer: ${answer.text}`
      ).join('\n\n');
      const prompt = `
        Based on these learning style and personality quiz responses, provide a comprehensive analysis:
        QUIZ RESPONSES: ${responsesSummary}
        LEARNING STYLE SCORES: Visual: ${learningScores.visual}, Auditory: ${learningScores.auditory}, Kinesthetic: ${learningScores.kinesthetic}, Reading/Writing: ${learningScores.reading}
        PERSONALITY SCORES (Big Five): Openness: ${personalityScores.openness}, Conscientiousness: ${personalityScores.conscientiousness}, Extraversion: ${personalityScores.extraversion}, Agreeableness: ${personalityScores.agreeableness}, Neuroticism: ${personalityScores.neuroticism}
        Please provide a JSON response with the structure: { "primaryStyle": "dominant learning style", "secondaryStyle": "second highest style", "personalityType": "MBTI type (e.g., INTJ, INTP)", "personalityTraits": ["4-5 MBTI-based traits"], "learningPersonalityInsights": ["3-4 insights"], "studyStrategies": ["6-7 techniques"], "careerSuggestions": ["4-5 careers"], "toolRecommendations": ["5-6 tools"], "challenges": ["2-3 challenges"], "strengths": ["4-5 strengths"], "workingStyle": ["3-4 insights"], "motivationFactors": ["3-4 motivators"], "summary": "3-4 sentence summary" }
      `;
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.7, topK: 1, topP: 1, maxOutputTokens: 2048 }, safetySettings: [{ category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }, { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" }, { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }, { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }] })
      });
      if (!response.ok) throw new Error(`API call failed with status: ${response.status}`);
      const data = await response.json();
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) throw new Error('Invalid response format');
      const aiResponseText = data.candidates[0].content.parts[0].text;
      let aiAnalysis = JSON.parse(aiResponseText.match(/\{[\s\S]*\}/)[0]);
      const basicAnalysis = generateBasicAnalysis(learningScores, personalityScores, selectedAnswers);
      return {
        ...basicAnalysis,
        personalityType: aiAnalysis.personalityType,
        personalityTraits: aiAnalysis.personalityTraits,
        learningPersonalityInsights: aiAnalysis.learningPersonalityInsights,
        studyStrategies: aiAnalysis.studyStrategies,
        careerSuggestions: aiAnalysis.careerSuggestions,
        toolRecommendations: aiAnalysis.toolRecommendations,
        challenges: aiAnalysis.challenges,
        strengths: aiAnalysis.strengths,
        workingStyle: aiAnalysis.workingStyle,
        motivationFactors: aiAnalysis.motivationFactors,
        summary: aiAnalysis.summary,
        isAiGenerated: true
      };
    } catch (error) {
      console.error('Gemini API error:', error);
      return generateBasicAnalysis(learningScores, personalityScores, selectedAnswers);
    }
  };

  const generateBasicAnalysis = (learningScores, personalityScores, selectedAnswers) => {
    const learningStyles = Object.entries(learningScores).sort((a, b) => b[1] - a[1]);
    const primaryStyle = learningStyles[0][0];
    const secondaryStyle = learningStyles[1][0];
    const personalityAnalysis = analyzePersonality(personalityScores);
    const styleData = {
      visual: { name: "Visual Learner", icon: Eye, description: "You learn best through seeing", strategies: ["Use mind maps", "Highlight notes", "Watch videos", "Create flowcharts", "Use flashcards with images"], tools: ["Canva", "MindMeister", "Lucidchart", "Khan Academy"] },
      auditory: { name: "Auditory Learner", icon: Ear, description: "You learn best through listening", strategies: ["Record lectures", "Study with music", "Explain aloud", "Join study groups", "Use text-to-speech"], tools: ["Otter.ai", "Audible", "Spotify", "Voice Memos"] },
      kinesthetic: { name: "Kinesthetic Learner", icon: Hand, description: "You learn best through movement", strategies: ["Use hands-on activities", "Take movement breaks", "Use fidget tools", "Build models", "Study while walking"], tools: ["VR apps", "Interactive simulations", "Lab equipment", "Building materials"] },
      reading: { name: "Reading/Writing Learner", icon: FileText, description: "You learn best through reading", strategies: ["Take notes", "Rewrite information", "Create outlines", "Read extensively", "Write summaries"], tools: ["Notion", "Google Docs", "Grammarly", "Evernote"] }
    };
    return {
      primaryStyle: styleData[primaryStyle].name,
      secondaryStyle: styleData[secondaryStyle].name,
      primaryData: styleData[primaryStyle],
      secondaryData: styleData[secondaryStyle],
      learningScores,
      personalityScores,
      personalityType: personalityAnalysis.type,
      personalityTraits: personalityAnalysis.traits,
      learningPersonalityInsights: personalityAnalysis.learningInsights,
      careerSuggestions: personalityAnalysis.careers,
      workingStyle: personalityAnalysis.workingStyle,
      motivationFactors: personalityAnalysis.motivationFactors,
      strengths: personalityAnalysis.strengths,
      challenges: personalityAnalysis.challenges,
      summary: `You are primarily a ${styleData[primaryStyle].name.toLowerCase()} with ${styleData[secondaryStyle].name.toLowerCase()} tendencies. Your MBTI personality type is ${personalityAnalysis.type}, which shapes your learning approach.`
    };
  };

  const analyzePersonality = (scores) => {
    const traits = {
      extraversion: scores.extraversion > 0 ? 'E' : 'I',
      intuition: scores.openness > 0 ? 'N' : 'S',
      thinking: scores.agreeableness < 0 ? 'T' : 'F',
      judging: scores.conscientiousness > 0 ? 'J' : 'P'
    };
    const mbtiType = `${traits.extraversion}${traits.intuition}${traits.thinking}${traits.judging}`;
    const mbtiDescriptions = {
      INTJ: { traits: ["Strategic", "Independent", "Innovative", "Logical", "Driven"], insights: ["Prefers structured, independent learning", "Excels with complex problem-solving", "Values deep understanding"], careers: ["Engineer", "Scientist", "Strategist", "IT Manager"], workingStyle: ["Prefers solo work", "Organized environment", "Goal-oriented"], motivationFactors: ["Mastery", "Challenges", "Recognition"] },
      INTP: { traits: ["Intellectual", "Logical", "Creative", "Curious", "Analytical"], insights: ["Thrives on theoretical exploration", "Prefers self-paced learning", "Enjoys problem-solving"], careers: ["Researcher", "Philosopher", "Programmer", "Writer"], workingStyle: ["Independent", "Flexible", "Innovative"], motivationFactors: ["Knowledge", "Freedom", "Discovery"] },
      ENTJ: { traits: ["Strategic", "Logical", "Ambitious", "Organized", "Leader"], insights: ["Excels in structured, goal-oriented learning", "Prefers leading discussions", "Thrives under pressure"], careers: ["CEO", "Entrepreneur", "Consultant", "Project Manager"], workingStyle: ["Collaborative", "Decisive", "Structured"], motivationFactors: ["Success", "Leadership", "Impact"] },
      ENTP: { traits: ["Inventive", "Enthusiastic", "Versatile", "Curious", "Charismatic"], insights: ["Loves brainstorming and new ideas", "Prefers dynamic learning", "Enjoys debate"], careers: ["Inventor", "Marketer", "Journalist", "Entrepreneur"], workingStyle: ["Flexible", "Social", "Innovative"], motivationFactors: ["Creativity", "Variety", "Influence"] },
      INFJ: { traits: ["Insightful", "Compassionate", "Idealistic", "Gentle", "Visionary"], insights: ["Values meaningful learning", "Prefers deep, personal connections", "Seeks harmony"], careers: ["Counselor", "Writer", "Teacher", "Nonprofit Worker"], workingStyle: ["Supportive", "Quiet", "Purpose-driven"], motivationFactors: ["Purpose", "Growth", "Helping Others"] },
      INFP: { traits: ["Creative", "Sensitive", "Idealistic", "Empathetic", "Reflective"], insights: ["Learns best through personal exploration", "Values creativity", "Seeks inspiration"], careers: ["Artist", "Therapist", "Writer", "Designer"], workingStyle: ["Independent", "Imaginative", "Flexible"], motivationFactors: ["Passion", "Authenticity", "Self-expression"] },
      ENFJ: { traits: ["Charismatic", "Diplomatic", "Responsible", "Empathetic", "Inspiring"], insights: ["Thrives in group learning", "Prefers supportive environments", "Motivates others"], careers: ["Teacher", "Coach", "HR Specialist", "Event Planner"], workingStyle: ["Collaborative", "Empathetic", "Organized"], motivationFactors: ["Connection", "Impact", "Team Success"] },
      ENFP: { traits: ["Enthusiastic", "Creative", "Spontaneous", "Optimistic", "Supportive"], insights: ["Loves exploring new ideas", "Prefers interactive learning", "Seeks inspiration"], careers: ["Entrepreneur", "Actor", "Journalist", "Activist"], workingStyle: ["Dynamic", "Social", "Flexible"], motivationFactors: ["Inspiration", "Freedom", "Variety"] },
      ISTJ: { traits: ["Responsible", "Sincere", "Analytical", "Hardworking", "Practical"], insights: ["Prefers structured, detailed learning", "Values tradition", "Focuses on facts"], careers: ["Accountant", "Administrator", "Lawyer", "Engineer"], workingStyle: ["Organized", "Reliable", "Methodical"], motivationFactors: ["Duty", "Stability", "Accuracy"] },
      ISFJ: { traits: ["Warm", "Considerate", "Gentle", "Thorough", "Caring"], insights: ["Learns best with clear guidance", "Values helping others", "Prefers routine"], careers: ["Nurse", "Teacher", "Social Worker", "Counselor"], workingStyle: ["Supportive", "Consistent", "Detail-oriented"], motivationFactors: ["Helping", "Security", "Harmony"] },
      ESTJ: { traits: ["Efficient", "Outgoing", "Dependable", "Realistic", "Organized"], insights: ["Thrives in structured settings", "Prefers clear goals", "Leads effectively"], careers: ["Manager", "Business Owner", "Planner", "Supervisor"], workingStyle: ["Decisive", "Structured", "Team-focused"], motivationFactors: ["Results", "Order", "Leadership"] },
      ESFJ: { traits: ["Friendly", "Outgoing", "Reliable", "Practical", "Caring"], insights: ["Learns well in social settings", "Values teamwork", "Seeks approval"], careers: ["Teacher", "Nurse", "Event Planner", "Salesperson"], workingStyle: ["Collaborative", "Supportive", "Organized"], motivationFactors: ["Relationships", "Approval", "Teamwork"] },
      ISTP: { traits: ["Action-oriented", "Logical", "Independent", "Practical", "Skilled"], insights: ["Prefers hands-on learning", "Thrives on problem-solving", "Values autonomy"], careers: ["Mechanic", "Technician", "Pilot", "Athlete"], workingStyle: ["Independent", "Practical", "Flexible"], motivationFactors: ["Hands-on work", "Skill mastery", "Freedom"] },
      ISFP: { traits: ["Gentle", "Sensitive", "Nurturing", "Creative", "Helpful"], insights: ["Learns through personal experience", "Values aesthetics", "Prefers quiet"], careers: ["Artist", "Designer", "Veterinarian", "Therapist"], workingStyle: ["Independent", "Creative", "Peaceful"], motivationFactors: ["Beauty", "Expression", "Harmony"] },
      ESTP: { traits: ["Outgoing", "Realistic", "Action-oriented", "Pragmatic", "Bold"], insights: ["Thrives in active learning", "Prefers real-world application", "Enjoys spontaneity"], careers: ["Entrepreneur", "Salesperson", "Athlete", "Performer"], workingStyle: ["Dynamic", "Practical", "Social"], motivationFactors: ["Action", "Excitement", "Results"] },
      ESFP: { traits: ["Playful", "Enthusiastic", "Friendly", "Spontaneous", "Tactful"], insights: ["Learns best through interaction", "Enjoys practical tasks", "Seeks fun"], careers: ["Actor", "Event Planner", "Therapist", "Salesperson"], workingStyle: ["Social", "Flexible", "Energetic"], motivationFactors: ["Fun", "Connection", "Immediate rewards"] }
    };
    const personalityData = mbtiDescriptions[mbtiType] || mbtiDescriptions['INTP']; // Default to INTP if no match
    return {
      type: mbtiType,
      traits: personalityData.traits,
      learningInsights: personalityData.insights,
      careers: personalityData.careers,
      workingStyle: personalityData.workingStyle,
      motivationFactors: personalityData.motivationFactors,
      strengths: personalityData.traits, // Reusing traits as strengths
      challenges: ["May overanalyze in unfamiliar settings", "Could struggle with rigid schedules"]
    };
  };

  const handleAnswer = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const learningScores = { visual: 0, auditory: 0, kinesthetic: 0, reading: 0 };
      const personalityScores = { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 0 };
      newAnswers.forEach(answer => {
        learningScores[answer.value] += answer.weight;
        if (answer.personality) Object.entries(answer.personality).forEach(([trait, score]) => personalityScores[trait] += score);
      });
      setIsAnalyzing(true);
      analyzeWithGemini(learningScores, personalityScores, newAnswers).then(analysis => {
         handleQuizCompletion(analysis);
      });
    }
  };



  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">AI is Analyzing Your Profile</h2>
          <p className="text-gray-600 mb-2">Processing your learning style and personality...</p>
          <p className="text-sm text-gray-500">Creating personalized insights and recommendations</p>
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (result) {
    const PrimaryIcon = result.primaryData.icon;
    const SecondaryIcon = result.secondaryData.icon;
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center items-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full mr-4"><PrimaryIcon className="w-8 h-8 text-blue-600" /></div>
                <div className="bg-purple-100 p-4 rounded-full mr-4"><User className="w-8 h-8 text-purple-600" /></div>
                <div className="bg-gray-100 p-3 rounded-full"><SecondaryIcon className="w-6 h-6 text-gray-600" /></div>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Learning & Personality Profile</h1>
              <div className="flex justify-center gap-4 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-lg font-semibold">{result.primaryStyle}</div>
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-lg font-semibold">{result.personalityType}</div>
              </div>
              <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">{result.summary}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center"><BarChart3 className="w-5 h-5 mr-2 text-blue-600" />Your Learning Style Breakdown</h3>
              <div className="space-y-4">{Object.entries(result.learningScores).map(([style, score]) => {
                const percentage = (score / Math.max(...Object.values(result.learningScores))) * 100;
                const styleNames = { visual: 'Visual', auditory: 'Auditory', kinesthetic: 'Kinesthetic', reading: 'Reading/Writing' };
                return (<div key={style} className="flex items-center"><div className="w-32 text-right pr-4 font-medium">{styleNames[style]}</div><div className="flex-1 bg-gray-200 rounded-full h-4 mr-4"><div className="bg-blue-600 h-4 rounded-full" style={{ width: `${percentage}%` }}></div></div><div className="w-12 text-sm text-gray-600">{score}</div></div>);
              })}</div>
              <h3 className="text-xl font-semibold mt-6 mb-4 flex items-center"><BarChart3 className="w-5 h-5 mr-2 text-purple-600" />Your Personality Breakdown</h3>
              <div className="space-y-4">{Object.entries(result.personalityScores).map(([trait, score]) => {
                const percentage = ((score + 10) / 20) * 100;
                const traitNames = { openness: 'Openness', conscientiousness: 'Conscientiousness', extraversion: 'Extraversion', agreeableness: 'Agreeableness', neuroticism: 'Neuroticism' };
                return (<div key={trait} className="flex items-center"><div className="w-32 text-right pr-4 font-medium">{traitNames[trait]}</div><div className="flex-1 bg-gray-200 rounded-full h-4 mr-4"><div className="bg-purple-600 h-4 rounded-full" style={{ width: `${percentage}%` }}></div></div><div className="w-12 text-sm text-gray-600">{score}</div></div>);
              })}</div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-green-50 rounded-xl p-6"><h3 className="text-xl font-semibold mb-4 flex items-center text-green-800"><BookOpen className="w-5 h-5 mr-2" />AI-Powered Study Strategies</h3><ul className="space-y-2">{result.studyStrategies.map((strategy, index) => (<li key={index} className="flex items-start"><CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-1" /><span className="text-green-700">{strategy}</span></li>))}</ul></div>
              <div className="bg-purple-50 rounded-xl p-6"><h3 className="text-xl font-semibold mb-4 flex items-center text-purple-800"><Target className="w-5 h-5 mr-2" />Recommended Tools</h3><div className="flex flex-wrap gap-2">{result.toolRecommendations.map((tool, index) => (<span key={index} className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">{tool}</span>))}</div></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-yellow-50 rounded-xl p-6"><h3 className="text-xl font-semibold mb-4 flex items-center text-yellow-800"><Lightbulb className="w-5 h-5 mr-2" />Your Personality Traits</h3><ul className="space-y-2">{result.personalityTraits.map((trait, index) => (<li key={index} className="flex items-start"><CheckCircle className="w-4 h-4 text-yellow-600 mr-2 mt-1" /><span className="text-yellow-700">{trait}</span></li>))}</ul></div>
              <div className="bg-indigo-50 rounded-xl p-6"><h3 className="text-xl font-semibold mb-4 flex items-center text-indigo-800"><Users className="w-5 h-5 mr-2" />AI Career Recommendations</h3><div className="space-y-2">{result.careerSuggestions.map((career, index) => (<div key={index} className="bg-indigo-200 text-indigo-800 px-3 py-2 rounded-lg text-sm">{career}</div>))}</div></div>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 mb-8"><h3 className="text-xl font-semibold mb-4 flex items-center text-blue-800"><Brain className="w-5 h-5 mr-2" />Learning & Personality Insights</h3><ul className="space-y-2">{result.learningPersonalityInsights.map((insight, index) => (<li key={index} className="flex items-start"><CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-1" /><span className="text-blue-700">{insight}</span></li>))}</ul></div>
            <div className="bg-teal-50 rounded-xl p-6 mb-8"><h3 className="text-xl font-semibold mb-4 flex items-center text-teal-800"><Users className="w-5 h-5 mr-2" />Your Working Style</h3><ul className="space-y-2">{result.workingStyle.map((style, index) => (<li key={index} className="flex items-start"><CheckCircle className="w-4 h-4 text-teal-600 mr-2 mt-1" /><span className="text-teal-700">{style}</span></li>))}</ul></div>
            <div className="bg-pink-50 rounded-xl p-6 mb-8"><h3 className="text-xl font-semibold mb-4 flex items-center text-pink-800"><Heart className="w-5 h-5 mr-2" />What Motivates You</h3><ul className="space-y-2">{result.motivationFactors.map((factor, index) => (<li key={index} className="flex items-start"><CheckCircle className="w-4 h-4 text-pink-600 mr-2 mt-1" /><span className="text-pink-700">{factor}</span></li>))}</ul></div>
            <div className="bg-lime-50 rounded-xl p-6 mb-8"><h3 className="text-xl font-semibold mb-4 flex items-center text-lime-800"><Zap className="w-5 h-5 mr-2" />Your Strengths</h3><ul className="space-y-2">{result.strengths.map((strength, index) => (<li key={index} className="flex items-start"><CheckCircle className="w-4 h-4 text-lime-600 mr-2 mt-1" /><span className="text-lime-700">{strength}</span></li>))}</ul></div>
            <div className="bg-red-50 rounded-xl p-6 mb-8"><h3 className="text-xl font-semibold mb-4 flex items-center text-red-800"><Shield className="w-5 h-5 mr-2" />Areas to Watch Out For</h3><ul className="space-y-2">{result.challenges.map((challenge, index) => (<li key={index} className="flex items-start"><div className="w-4 h-4 border-2 border-red-400 rounded mr-2 mt-1"></div><span className="text-red-700">{challenge}</span></li>))}</ul></div>
<div className="text-center">
  <button 
    onClick={resetQuiz} 
    disabled={isSaving}
    className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
  >
    {isSaving ? (
      <>
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
        Saving Results...
      </>
    ) : (
      'Start Your Journey'
    )}
  </button>
</div>          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <Brain className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Learning & Personality Quiz</h1>
            <p className="text-gray-600 mb-4">Discover your unique learning style and MBTI personality profile</p>
            <div className="bg-blue-50 rounded-xl p-6 mb-6"><h3 className="font-semibold text-blue-800 mb-3 text-lg">What You'll Discover:</h3><div className="grid md:grid-cols-2 gap-3 text-sm text-blue-700"><div className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" />Your primary learning style</div><div className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" />Your MBTI personality</div><div className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" />AI-powered strategies</div><div className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" />Career recommendations</div></div></div>
            <div className="text-center text-sm text-gray-500 mb-6"><Clock className="w-4 h-4 inline mr-1" />Takes 2-3 minutes • 12 questions • Real-time AI analysis</div>
          </div>
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold text-gray-800">Question {currentQuestion + 1}</h2><span className="text-sm text-gray-500">{currentQuestion + 1} of {questions.length}</span></div>
            <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-blue-600 h-2 rounded-full" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div></div>
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-6 text-gray-800 leading-relaxed">{questions[currentQuestion].question}</h3>
            <div className="space-y-3">{questions[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(option)} className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:border-blue-500 group">
                <div className="flex items-center"><div className="w-8 h-8 rounded-full border-2 border-gray-300 group-hover:border-blue-400 flex items-center justify-center mr-4 text-sm font-semibold group-hover:bg-blue-100">{String.fromCharCode(65 + index)}</div><span className="text-gray-700 group-hover:text-gray-900">{option.text}</span></div>
              </button>
            ))}</div>
          </div>
          <div className="text-center text-sm text-gray-500"><p className="flex items-center justify-center"><Brain className="w-4 h-4 mr-1" />{apiKey ? "Enhanced with Gemini AI" : "Basic analysis • Add API key for AI insights"}</p></div>
        </div>
      </div>
    </div>
  );
};

export default LearningPersonalityQuiz;