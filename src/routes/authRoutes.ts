import { Router } from 'express';
import { google } from 'googleapis';
import { register, verifyOtp, login } from '../controllers/authController';

const router = Router();
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

// User and speaker registration
router.post('/register', register);

// Verify user/speaker email with OTP
router.post('/verify-otp', verifyOtp);

// Login route
router.post('/login', login);

router.get('/google', (req, res) => {
    const scopes = [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/userinfo.profile'
    ];

    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline', // To get a refresh token
        scope: scopes,
        prompt: 'consent' // To ensure refresh token is provided
    });

    res.redirect(url);
});

// OAuth callback route
router.get('/google/callback', async (req, res) => {
    const code = req.query.code as string;

    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        // Store tokens securely (e.g., in database or session)
        // Example: Save tokens to environment variables or a database
        console.log('Access Token:', tokens.access_token);
        console.log('Refresh Token:', tokens.refresh_token);

        process.env.GOOGLE_ACCESS_TOKEN = tokens.access_token as string;
        process.env.GOOGLE_REFRESH_TOKEN = tokens.refresh_token as string;

        res.send('Authentication successful! Tokens received.');
    } catch (error) {
        console.error('Error exchanging code for tokens:', error);
        res.status(500).send('Failed to authenticate');
    }
});


export default router;
