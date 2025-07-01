// File: Backend/routes/userRoutes.js
import express from 'express';
import { createUser, getUser, updateUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/', createUser); 
router.post('/login', loginUser);
router.get('/:id', getUser);        

export default router;