// File: Backend/routes/userRoutes.js
import express from 'express';
import { createUser, getUser, updateUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/', createUser); // Create a new user
router.get('/:id', getUser); // Get user by ID
router.put('/:id', updateUser); // Update user by ID
router.post('/login', loginUser); // New login route for authentication

export default router;