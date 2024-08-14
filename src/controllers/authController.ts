import e, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { sendOtpEmail } from '../utils/emailService';
import {setOtp,getOtp} from '../utils/otpcheck';

export const register = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, userType } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            isVerified: false,
            userType,
        });
        console.log(JSON.stringify(user));
        // Generate and send OTP for verification
        const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
        setOtp(user.id,otp);
        await sendOtpEmail(email, otp);

        res.status(201).json({ message: 'User registered. Please verify your email with the OTP.', userId: user.id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user.' });
    }
};

export const verifyOtp = async (req: Request, res: Response) => {
    
    const { userId, otp } = req.body;
    try {
        if(getOtp(userId as number)!=otp){
            return res.status(500).json({ error: 'Incorrect OTP' });
        }
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        user.isVerified = true;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to verify OTP.' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        if (!user.isVerified) {
            return res.status(403).json({ error: 'Please verify your email before logging in.' });
        }

        const token = jwt.sign(
            { userId: user.id, userType: user.userType },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful.', token });
    } catch (error) {
        res.status(500).json({ error: 'Failed to login user.' });
    }
};
