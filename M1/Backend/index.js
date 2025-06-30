import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
import userRoutes from './routes/userRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';
import goalRoutes from './routes/goalRoutes.js';
import buddyRoutes from './routes/buddyRoutes.js';
import mentorRoutes from './routes/mentorRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Connect to MongoDB
connectDB();

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/buddies', buddyRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/reviews', reviewRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});