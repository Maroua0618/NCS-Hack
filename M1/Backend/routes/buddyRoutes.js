import express from 'express';
import { createBuddyRequest, getBuddyRequests } from '../controllers/buddyController.js';

const router = express.Router();

router.post('/', createBuddyRequest);
router.get('/', getBuddyRequests);

export default router;