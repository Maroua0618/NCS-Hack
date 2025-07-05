# 📚 StudyMate – AI-Powered Personalized Learning Assistant

StudyMate is an AI-powered learning platform that transforms self-learning from an isolating, overwhelming experience into a structured, motivating, and adaptive journey. It's designed to support learners who want guidance tailored to their personality, learning style, and goals.

---

## 🚀 Why StudyMate?

> "I built StudyMate because I struggled with motivation and direction during my transition into university. Study plans and productivity hacks didn't work for me — they weren't personalized. I needed something that knew me and grew with me."

StudyMate helps learners by offering:
- **Personalized study paths** tailored to individual needs
- **Motivation and performance tracking** to maintain engagement
- **Mentor and peer support** for collaborative learning
- **Adaptive AI systems** for quizzes, content, and feedback

---

## 🧠 Core Features

### 🧩 Personality & Learning Style Onboarding
- MBTI & VARK assessments for personalized learning
- Smart goal setting using the SMART framework

### 🗺️ AI-Powered Roadmap Generator
- Custom learning paths based on individual goals
- Adaptive difficulty and curated content recommendations

### 🧪 Intelligent Assessment System
- Auto-generated milestone quizzes
- Weakness detection with remedial suggestions

### 👯 Study Buddy Matching
- AI-based compatibility matching system
- Peer check-ins and progress sharing features

### 🎓 Mentor Marketplace
- Verified expert mentors across various subjects
- Integrated messaging, video calls, and review system

### 🔥 AI Motivation Engine
- Personalized motivation messages powered by GPT
- Engagement-based nudges and reward system

### 📊 Analytics Dashboard
- Real-time progress tracking, streaks, and retention insights
- Predictive analytics on learning outcomes

---

## 🏗️ Tech Stack

| Layer            | Tools/Frameworks                        |
|------------------|-----------------------------------------|
| Frontend         | JavaScript, Tailwind CSS, Vite          |
| Backend          | MongoDB, Express.js                     |
| Database         | MongoDB Atlas                           |
| Auth & Security  | JWT, bcrypt                             |
| AI Integration   | GeminiAPI                               |
| Real-time        | Socket.io                               |
| File Storage     | AWS S3                                  | 

---

## 🧪 API Overview

Example endpoint structure:

```
/api/v1/
├── auth (register, login, logout)
├── users (profile, assessment)
├── goals (create, list, update)
├── sessions (start, end)
├── mentors (search, request)
└── ai (generate-roadmap, motivation)
```

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/chaima-99/M1.git
cd M1
```

### 2. Backend Setup

```bash
cd backend
npm install
npm run dev
# or
node index.js  # to run the connection and the server
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 4. Environment Variables

Create a `.env` file in the `/backend` directory with:

```env
MONGODB_URI=your_mongo_connection
JWT_SECRET=your_jwt_secret
```

---

## 🔑 Getting Started

### User Authentication Flow
- **New users**: Must complete the personality and learning style quiz after registration
- **Returning users**: Direct access to dashboard if quiz is already completed

### Test Account
For testing purposes, you can use:
- **Email**: `M1ncs@gmail.com`
- **Password**: `1234567`

*Note: This account has not completed the quiz yet, so you can experience the full onboarding process.*

---

## 📈 Success Metrics

- **📅 Daily Active Users (DAU)** - Track user engagement
- **✅ Goal Completion Rate** - Measure learning effectiveness
- **🧠 Quiz Score Improvements** - Monitor learning progress
- **🔁 Study Buddy Engagement Duration** - Assess peer interaction
- **💼 Mentor Marketplace Activity** - Evaluate mentor-student connections

---

