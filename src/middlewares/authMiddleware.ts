import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import CustomRequest from '../utils/CustomRequest';
interface JwtPayload {
    userId: number;
    userType: string;
}



// Verify token for protected routes
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        const custReq = req as CustomRequest;
        custReq.userId = decoded.userId;
        custReq.userType = decoded.userType;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};

// Verify speaker role for speaker-only routes
export const verifySpeaker = (req: Request, res: Response, next: NextFunction) => {
    const custReq = req as CustomRequest;
    if (custReq.userType !== 'speaker') {
        return res.status(403).json({ error: 'Access denied. Speakers only.' });
    }
    next();
};
