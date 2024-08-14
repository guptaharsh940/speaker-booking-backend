import { Router } from 'express';
import { bookSession } from '../controllers/bookingController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, bookSession);

export default router;
