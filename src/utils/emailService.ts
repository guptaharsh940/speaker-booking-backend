import nodemailer from 'nodemailer';
import User from '../models/user';
import Speaker from '../models/speaker';

// Configure the transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service provider
    auth: {
        user: process.env.EMAIL_USER, // Email account
        pass: process.env.EMAIL_PASS, // Email password or app-specific password
    },
});

// Send OTP email
export const sendOtpEmail = async (to: string, otp: number) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Verify your Account',
        text: `Your One Time Password for account verification is ${otp}. (Valid for 10 minutes)`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP email sent successfully.');
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error('Failed to send OTP email.');
    }
};

// Send booking confirmation email
export const sendBookingConfirmationEmail = async (
    userId: number,
    speakerId: number,
    date: string,
    timeSlot: string
) => {
    const user = await User.findByPk(userId);
    const speaker =await Speaker.findByPk(speakerId);
    const speakerUser = await User.findByPk(speaker?.userId);
    const userEmail = user?.email;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail, 
        subject: 'Booking Confirmation',
        text: `Your booking with speaker ${speakerUser?.firstName} ${speakerUser?.lastName} on ${date} at ${timeSlot} is confirmed.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Booking confirmation email sent successfully.');
    } catch (error) {
        console.error('Error sending booking confirmation email:', error);
        throw new Error('Failed to send booking confirmation email.');
    }
};
