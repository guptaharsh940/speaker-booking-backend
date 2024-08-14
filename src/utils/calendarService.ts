import { google } from 'googleapis';
import User from '../models/user';
import Speaker from '../models/speaker';

const calendar = google.calendar('v3');

// Set up OAuth2 client
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

// Set credentials (typically loaded from a token store)
oauth2Client.setCredentials({
    access_token: process.env.GOOGLE_ACCESS_TOKEN,
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

// Create Google Calendar event
export const createGoogleCalendarEvent = async (
    userId: number,
    speakerId: number,
    date: string,
    timeSlot: string
) => {
    const user = await User.findByPk(userId)
    const userEmail = user?.email;
    const speaker = await Speaker.findByPk(speakerId)
    const speakerUserId = speaker?.userId;
    const speakerUser = await User.findByPk(speakerUserId);
    const speakerEmail = speakerUser?.email;

    const event = {
        summary: 'Speaker Session Booking',
        description: `Session with speaker ${speakerUser?.firstName} ${speakerUser?.lastName}.`,
        start: {
            dateTime: `${date}T${timeSlot}:00+05:30`, // Format: YYYY-MM-DDTHH:mm:ss
            timeZone: 'Asia/Kolkata', // Use appropriate time zone
        },
        end: {
            dateTime: `${date}T${parseInt(timeSlot, 10) + 1}:00:00+05:30`,
            timeZone: 'Asia/Kolkata',
        },
        attendees: [
            { email: userEmail }, // Add attendees' emails dynamically
            { email: speakerEmail },
        ],
    };
    
    try {
        await calendar.events.insert({
            auth: oauth2Client,
            calendarId: 'primary',
            requestBody: event,
        });
    } catch (error) {
        throw new Error('Failed to create Google Calendar event.');
    }
};
