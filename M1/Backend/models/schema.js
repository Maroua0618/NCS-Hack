import mongoose from "mongoose";
const Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
  username: { type: String, unique: true },
  profilePicture: String,
  bio: String,
  dateOfBirth: Date,

  // Learning Profile
  learningGoals: [String],
  learningStyle: String,
  testResults: {
    learningStyleScore: Object,
    completedAt: Date
  },

  // Progress Tracking
  currentStreak: Number,
  longestStreak: Number,
  totalStudyTime: Number,
  totalSessions: Number,
  quiz: Number,

  // Profile Settings
  isPublic: Boolean,
  isMentor: Boolean,
  isActive: Boolean,

  // Timestamps
  createdAt: Date,
  updatedAt: Date,
  lastLoginAt: Date
});



// Study Session Schema
const StudySessionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  goalId: { type: Schema.Types.ObjectId, ref: "LearningGoal" },

  sessionData: {
    startTime: Date,
    endTime: Date,
    duration: Number,
    notes: String,
    completed: Boolean
  },

  createdAt: Date
});

// Learning Goal Schema
const LearningGoalSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },

  goalDetails: {
    title: String,
    description: String,
    topic: String,
    subject: String,
    difficulty: String,
    targetCompletionDate: Date
  },

  progress: {
    currentProgress: Number,
    totalMilestones: Number
  },

  status: String,
  createdAt: Date,
  updatedAt: Date
});

// Study Buddy Schema
const StudyBuddySchema = new Schema({
  requesterUserId: { type: Schema.Types.ObjectId, ref: "User" },
  targetUserId: { type: Schema.Types.ObjectId, ref: "User" },

  matchDetails: {
    compatibilityScore: Number,
    sharedGoals: [String],
    status: String
  },

  createdAt: Date,
  updatedAt: Date
});

// Mentor Schema
const MentorSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  email: String,
  phone: String,

  mentorProfile: {
    title: String,
    expertise: [String],
    experience: String,
    portfolio: String,
    availability: {
      availableDays: [String],
      availableHours: String
    }
  },

  ratings: {
    averageRating: Number,
    totalReviews: Number,
    totalSessions: Number
  },

  status: String,
  createdAt: Date,
  updatedAt: Date
});

// Review Schema
const ReviewSchema = new Schema({
  reviewerId: { type: Schema.Types.ObjectId, ref: "User" },
  revieweeId: { type: Schema.Types.ObjectId, ref: "User" },

  reviewData: {
    rating: Number
  },

  createdAt: Date,
  updatedAt: Date
});

// Exporting all models
export const User = mongoose.model("User", UserSchema);
export const StudySession = mongoose.model("StudySession", StudySessionSchema);
export const LearningGoal = mongoose.model("LearningGoal", LearningGoalSchema);
export const StudyBuddy = mongoose.model("StudyBuddy", StudyBuddySchema);
export const Mentor = mongoose.model("Mentor", MentorSchema);
export const Review = mongoose.model("Review", ReviewSchema);
