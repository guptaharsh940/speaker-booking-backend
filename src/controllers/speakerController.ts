import { Request, Response } from 'express';
import Speaker from '../models/speaker';
import User from '../models/user';
import CustomRequest from '../utils/CustomRequest';
// Add a new speaker profile
export const addSpeakerProfile = async (req: Request, res: Response) => {
    const { expertise, pricePerSession } = req.body;
    const customReq = req as CustomRequest; 
    const userId = customReq.userId; // Assuming userId is set in middleware

    try {
        const user = await User.findByPk(userId);
        if (!user || user.userType !== 'speaker') {
            return res.status(403).json({ error: 'Only speakers can create profiles.' });
        }

        const speakerProfile = await Speaker.create({ expertise, pricePerSession, userId });
        res.status(201).json({ message: 'Speaker profile created successfully.', speakerProfile });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create speaker profile.' });
    }
};

// Get all speakers
export const getSpeakers = async (_req: Request, res: Response) => {
    try {
        const speakers = await Speaker.findAll({ include: [{ model: User, as: 'user', attributes: ['id', 'firstName', 'lastName', 'email'] }], attributes:['id','expertise','pricePerSession'] });
        res.status(200).json(speakers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve speakers.' });
    }
};
