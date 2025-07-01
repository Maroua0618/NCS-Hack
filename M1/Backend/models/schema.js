import mongoose from "mongoose";
const Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema({
  email: { type: String, unique: true },
  password: { type: String, required: true, minlength: 6, maxlength: 128 },
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String, unique: true },
  profilePicture: { type: String },
  bio: { type: String, required: false, default: "" },
  dateOfBirth: { type: Date, required: false, default: null },

  // Learning Profile
  learningGoals: [{ type: String }],
  learningStyle: {
    type: String,
    enum: ["Visual", "Auditory", "Kinesthetic", "Reading/Writing"],
    default: "",
    required: false
  },
  testResults: {
    learningStyleScore: { type: Object },
    completedAt: { type: Date, required: false, default: null }
  },

  // Progress Tracking
  currentStreak: { type: Number, default: 0, required: false },
  longestStreak: { type: Number, default: 0, required: false },
  totalStudyTime: { type: Number, default: 0, required: false },
  totalSessions: { type: Number, default: 0, required: false },
  quiz: { type: Number, required: false, default: 0 },

  // Profile Settings
  isPublic: { type: Boolean },
  isMentor: { type: Boolean },
  isActive: { type: Boolean },

  // Timestamps
  createdAt: { type: Date, required: false, default: null },
  updatedAt: { type: Date, required: false, default: null },
  lastLoginAt: { type: Date, required: false, default: null }
});

// Study Session Schema
const StudySessionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  goalId: { type: Schema.Types.ObjectId, ref: "LearningGoal" },
  sessionData: {
    startTime: { type: Date, required: false, default: null },
    endTime: { type: Date, required: false, default: null },
    duration: { type: Number, default: 0, required: false },
    notes: { type: String },
    completed: { type: Boolean }
  },
  createdAt: { type: Date, required: false, default: null }
});

// Learning Goal Schema
const LearningGoalSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  goalDetails: {
    title: { type: String },
    description: { type: String },
    topic: { type: String },
    subject: { type: String },
    difficulty: { type: String },
    targetCompletionDate: { type: Date, required: false, default: null }
  },
  progress: {
    currentProgress: { type: Number, default: 0, required: false },
    totalMilestones: { type: Number, default: 0, required: false }
  },
  status: { type: String },
  createdAt: { type: Date, required: false, default: null },
  updatedAt: { type: Date, required: false, default: null }
});

// Study Buddy Schema
const StudyBuddySchema = new Schema({
  requesterUserId: { type: Schema.Types.ObjectId, ref: "User" },
  targetUserId: { type: Schema.Types.ObjectId, ref: "User" },
  matchDetails: {
    compatibilityScore: { type: Number, default: 0, required: false },
    sharedGoals: [{ type: String }],
    status: { type: String }
  },
  createdAt: { type: Date, required: false, default: null },
  updatedAt: { type: Date, required: false, default: null }
});

// Mentor Schema
const MentorSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  email: { type: String },
  phone: { type: String },
  mentorProfile: {
    title: { type: String },
    expertise: [{ type: String }],
    experience: { type: String },
    portfolio: { type: String },
    availability: {
      availableDays: [{ type: String }],
      availableHours: { type: String }
    }
  },
  ratings: {
    averageRating: { type: Number, default: 0, required: false },
    totalReviews: { type: Number, default: 0, required: false },
    totalSessions: { type: Number, default: 0, required: false }
  },
  status: { type: String },
  createdAt: { type: Date, required: false, default: null },
  updatedAt: { type: Date, required: false, default: null }
});

// Review Schema
const ReviewSchema = new Schema({
  reviewerId: { type: Schema.Types.ObjectId, ref: "User" },
  revieweeId: { type: Schema.Types.ObjectId, ref: "User" },
  reviewData: {
    rating: { type: Number, default: 0, required: false }
  },
  createdAt: { type: Date, required: false, default: null },
  updatedAt: { type: Date, required: false, default: null }
});

// Exporting all models
export const User = mongoose.model("User", UserSchema);
export const StudySession = mongoose.model("StudySession", StudySessionSchema);
export const LearningGoal = mongoose.model("LearningGoal", LearningGoalSchema);
export const StudyBuddy = mongoose.model("StudyBuddy", StudyBuddySchema);
export const Mentor = mongoose.model("Mentor", MentorSchema);
export const Review = mongoose.model("Review", ReviewSchema);
