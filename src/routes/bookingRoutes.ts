import { Router } from 'express';
import { bookSession, getUserBookings } from '../controllers/bookingController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

// Book a session with a speaker (protected route)
router.post('/', verifyToken, bookSession);

// Get all bookings for the logged-in user (protected route)
router.get('/user', verifyToken, getUserBookings);

export default router;
