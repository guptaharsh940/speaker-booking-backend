import { Request, Response } from 'express';
import Booking from '../models/booking';
import Speaker from '../models/speaker';
import { sendBookingConfirmationEmail } from '../utils/emailService';
import { createGoogleCalendarEvent } from '../utils/calendarService';

// Book a session with a speaker
export const bookSession = async (req: Request, res: Response) => {
    const { speakerId, date, timeSlot } = req.body;
    const userId = req.userId; // Assuming userId is set in middleware

    try {
        // Check if the time slot is available
        const existingBooking = await Booking.findOne({
            where: { speakerId, date, timeSlot },
        });

        if (existingBooking) {
            return res.status(400).json({ error: 'Time slot is already booked.' });
        }

        // Create booking
        const booking = await Booking.create({
            userId,
            speakerId,
            date,
            timeSlot,
        });

        // Send email notifications
        await sendBookingConfirmationEmail(userId, speakerId, date, timeSlot);

        // Create Google Calendar event
        await createGoogleCalendarEvent(userId, speakerId, date, timeSlot);

        res.status(201).json({ message: 'Session booked successfully.', booking });
    } catch (error) {
        res.status(500).json({ error: 'Failed to book session.' });
    }
};

// Get all bookings for a user
export const getUserBookings = async (req: Request, res: Response) => {
    const userId = req.userId; // Assuming userId is set in middleware

    try {
        const bookings = await Booking.findAll({ where: { userId }, include: [Speaker] });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve bookings.' });
    }
};
