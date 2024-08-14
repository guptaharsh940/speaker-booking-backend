import app from '../app';
import { connectDB } from '../models/index';

// Start the server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        // Connect to the database
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();
