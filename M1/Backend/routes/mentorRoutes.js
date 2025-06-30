import express from 'express';
import { createMentor, getMentors } from '../controllers/mentorController.js';

const router = express.Router();

router.post('/', createMentor);
router.get('/', getMentors);

export default router;