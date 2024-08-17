import { Request, Response } from 'express';
import Booking from '../models/booking';
import Speaker from '../models/speaker';
import { sendBookingConfirmationEmail } from '../utils/emailService';
import { createGoogleCalendarEvent } from '../utils/calendarService';
import { error } from 'console';
import User from '../models/user';
import CustomRequest from '../utils/CustomRequest';


function validateTime(time:string) {
    // Regular expression to match the format HH:MM where HH is between 00 and 23, and MM is between 00 and 59
    const timeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (!timeFormat.test(time)) {
        return false;
    }

    // Split the time string into hours and minutes
    const [hours, minutes] = time.split(':').map(Number);

    // Check if time is between 09:00 and 16:00
    if (hours >= 9 && hours <= 16) {
        if (hours === 16 && minutes > 0) {
            return false;
        }
        return true;
    } else {
        return false;
    }
}
// Book a session with a speaker
export const bookSession = async (req: Request, res: Response) => {
    const { speakerId, date, timeSlot } = req.body;
    const custReq = req as CustomRequest;
    const userId = custReq.userId; // Assuming userId is set in middleware

    try {
        if(!validateTime(timeSlot)){
            return res.status(422).json({error:'Invalid Time or Time Format. Time Slot should be between 09:00 to 16:00 in HH:mm format'})
        }
        // Check if the time slot is available
        const existingBooking = await Booking.findOne({
            where: { speakerId, date, timeSlot },
        });
        
        if (existingBooking) {
            return res.status(409).json({ error: 'Time slot is already booked.' });
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


