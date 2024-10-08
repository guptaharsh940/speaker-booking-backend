import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import swaggerdoc from '../openapi.json'
import swaggerui from 'swagger-ui-express';

// Import routes
import authRoutes from './routes/authRoutes';
import speakerRoutes from './routes/speakerRoutes';
import bookingRoutes from './routes/bookingRoutes';

// Initialize environment variables
dotenv.config();

// Create Express app
const app: Application = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerdoc, {
  customCss: '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
  customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css"
}))


// Basic route to check server status
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running!');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/speakers', speakerRoutes);
app.use('/api/bookings', bookingRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;
