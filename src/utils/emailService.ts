import nodemailer from 'nodemailer';

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
        subject: 'Your OTP for Account Verification',
        text: `Your OTP for account verification is ${otp}. This OTP is valid for 10 minutes.`,
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
    speakerId: string,
    date: string,
    timeSlot: string
) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'recipient@example.com', // Set recipient email dynamically
        subject: 'Booking Confirmation',
        text: `Your booking with speaker ID ${speakerId} on ${date} at ${timeSlot} is confirmed.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Booking confirmation email sent successfully.');
    } catch (error) {
        console.error('Error sending booking confirmation email:', error);
        throw new Error('Failed to send booking confirmation email.');
    }
};
