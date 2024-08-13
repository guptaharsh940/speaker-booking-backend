import { Router } from 'express';
import { register, verifyOtp, login } from '../controllers/authController';

const router = Router();

// User and speaker registration
router.post('/register', register);

// Verify user/speaker email with OTP
router.post('/verify-otp', verifyOtp);

// Login route
router.post('/login', login);

export default router;
