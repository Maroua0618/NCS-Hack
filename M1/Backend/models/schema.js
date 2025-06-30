import { ObjectId } from 'mongodb';

// User Collection Schema
export const userSchema = {
  _id: ObjectId,
  email: String, // unique
  password: String, // hashed
  firstName: String,
  lastName: String,
  username: String, // unique
  profilePicture: String, // URL
  bio: String,
  dateOfBirth: Date,
  
  // Learning Profile
  learningGoals: [String], // Array of goals
  learningStyle: String, // visual, auditory, kinesthetic
  testResults: {
    learningStyleScore: Object,
    completedAt: Date
  },
  
  // Progress Tracking
  currentStreak: Number,
  longestStreak: Number,
  totalStudyTime: Number, // in minutes
  totalSessions: Number,
  quiz:Number,
  
  // Profile Settings
  isPublic: Boolean,
  isMentor: Boolean,
  isActive: Boolean,
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date,
  lastLoginAt: Date
};

// Study Sessions Collection Schema
export const studySessionSchema = {
  _id: ObjectId,
  userId: ObjectId, // Reference to User
  goalId: ObjectId, // Reference to Learning Goal
  
  sessionData: {
    startTime: Date,
    endTime: Date,
    duration: Number, // in minutes
    notes: String,
    completed: Boolean
  },
  
  createdAt: Date
};

// Learning Goals Collection Schema
export const learningGoalSchema = {
  _id: ObjectId,
  userId: ObjectId, // Reference to User
  
  goalDetails: {
    title: String,
    description: String,
    topic: String, // Programming, Design, Marketing, etc.
    subject: String, // Web Development, Data Science, etc.
    difficulty: String, // Beginner, Intermediate, Advanced
    targetCompletionDate: Date
  },
  
  progress: {
    currentProgress: Number, // percentage 0-100
    totalMilestones: Number,
  },
  
  status: String, // active, completed, paused, abandoned
  createdAt: Date,
  updatedAt: Date
};

// Study Buddies/Matches Collection Schema
export const studyBuddySchema = {
  _id: ObjectId,
  requesterUserId: ObjectId, // User who initiated
  targetUserId: ObjectId, // User who received request
  
  matchDetails: {
    compatibilityScore: Number, // Algorithm-generated score
    sharedGoals: [String],
    status: String // pending, accepted, declined, active, inactive
  },
  
  createdAt: Date,
  updatedAt: Date,

};

// Mentors Collection Schema
export const mentorSchema = {
  _id: ObjectId,
  userId: ObjectId, // Reference to User
  email:String,
  phone: String, // Contact number
  mentorProfile: {
    title: String, // "React Developer", "UI/UX Designer"
    expertise: [String], // Array of skills
    experience: String, // Years of experience
    portfolio:String, // URL to personal website or portfolio
    availability: {
      availableDays: [String], // ["Monday", "Tuesday"]
      availableHours: String // "9 AM - 5 PM"
    }
  },
  
  
  ratings: {
    averageRating: Number,
    totalReviews: Number,
    totalSessions: Number
  },
  
  status: String, // active, inactive, suspended
  createdAt: Date,
  updatedAt: Date
};


// Reviews Collection Schema
export const reviewSchema = {
  _id: ObjectId,
  reviewerId: ObjectId, // User who wrote review
  revieweeId: ObjectId, // User being reviewed (mentor or student)
  
  reviewData: {
    rating: Number, // 1-5 stars
  },
  
  createdAt: Date,
  updatedAt: Date
};

