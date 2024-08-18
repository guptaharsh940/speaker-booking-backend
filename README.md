# Speaker Booking Backend API

This project provides a set of APIs for managing speaker bookings, integrated with Google Calendar for event scheduling. You can access these APIs either through the hosted Vercel server or by running the project locally.

## Usage

### Method 1: Using the Hosted Vercel Server

1. The API is hosted on Vercel and can be accessed via the following base URL:  
   [https://speaker-booking-backend.vercel.app](https://speaker-booking-backend.vercel.app)

2. To explore and use the APIs, visit the Swagger documentation at:  
   [https://speaker-booking-backend.vercel.app/api-docs](https://speaker-booking-backend.vercel.app/api-docs)

   The Swagger UI provides detailed information about each API endpoint, including request methods, parameters, and example responses.

### Method 2: Running the Project Locally

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
2. **Install Dependencies:**
   Navigate to the project directory and install all necessary packages:

   ```bash
   npm install
   
3. **Set Up Environment Variables:**
   Create a .env file in the root directory of the project, or copy the .env.example file and fill in the required environment variables:

   - DATABASE_URL: Your database connection URL.
   - JWT_SECRET: Secret key for JWT authentication.
   - EMAIL_USER: Your email address.
   - EMAIL_PASS: The app password for your Gmail account (after enabling two-step verification).
   - GOOGLE_CLIENT_ID: Client ID obtained from the Google Cloud Platform.
   - GOOGLE_CLIENT_SECRET: Client Secret obtained from the Google Cloud Platform.
   - GOOGLE_REDIRECT_URI: Set this to http://localhost:3000/api/auth/google/callback.
   - GOOGLE_ACCESS_TOKEN: Access token for Google Calendar API.
   - GOOGLE_REFRESH_TOKEN: Refresh token for Google Calendar API.
   
5. **Get Google OAuth Credentials:**
   - Go to the Google Cloud Platform and create a new project.
   - Enable the Google Calendar API for your project.
   - Set up OAuth 2.0 credentials and get your GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.
   - Set the callback URI as http://localhost:3000/api/auth/google/callback.
   After setting up OAuth, navigate to http://localhost:3000/api/auth/google/ and perform the OAuth process to obtain your GOOGLE_ACCESS_TOKEN and GOOGLE_REFRESH_TOKEN. These tokens will be displayed in the console.
   
6. **Start the Development Server:**
   Run the server in development mode:
   ```bash
   npm run dev
   ```

   The server will start on http://localhost:3000. You can now access the APIs via Swagger docs at http://localhost:3000/api-docs or use them directly.

