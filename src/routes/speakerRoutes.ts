import { Router } from 'express';
import { addSpeakerProfile, getSpeakers } from '../controllers/speakerController';
import { verifyToken, verifySpeaker } from '../middlewares/authMiddleware';

const router = Router();

// Add a new speaker profile (protected route for speakers only)
router.post('/profile', verifyToken, verifySpeaker, addSpeakerProfile);

// Get list of all speakers
router.get('/', getSpeakers);

export default router;
