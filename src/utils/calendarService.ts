import { google } from 'googleapis';

const calendar = google.calendar('v3');

// Set up OAuth2 client
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

// Set credentials (typically loaded from a token store)
oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

// Create Google Calendar event
export const createGoogleCalendarEvent = async (
    userId: number,
    speakerId: string,
    date: string,
    timeSlot: string
) => {
    const event = {
        summary: 'Speaker Session Booking',
        description: `Session with speaker ID ${speakerId}.`,
        start: {
            dateTime: `${date}T${timeSlot}:00`, // Format: YYYY-MM-DDTHH:mm:ss
            timeZone: 'America/New_York', // Use appropriate time zone
        },
        end: {
            dateTime: `${date}T${parseInt(timeSlot, 10) + 1}:00`,
            timeZone: 'America/New_York',
        },
        attendees: [
            { email: 'user@example.com' }, // Add attendees' emails dynamically
            { email: 'speaker@example.com' },
        ],
    };

    try {
        await calendar.events.insert({
            auth: oauth2Client,
            calendarId: 'primary',
            requestBody: event,
        });
        console.log('Google Calendar event created successfully.');
    } catch (error) {
        console.error('Error creating Google Calendar event:', error);
        throw new Error('Failed to create Google Calendar event.');
    }
};
