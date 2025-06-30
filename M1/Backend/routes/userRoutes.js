// File: Backend/routes/userRoutes.js
import express from 'express';
import { createUser, getUser, updateUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/', createUser); 
router.post('/login', loginUser);
router.get('/:id', getUser);     


router.post('/', createUser);     // POST /api/users   ✅ (utilisé pour SIGN UP)
router.post('/login', loginUser); // POST /api/users/login ✅ (utilisé pour LOGIN)
router.get('/:id', getUser);      

export default router;