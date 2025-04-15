import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

export const PORT = process.env.PORT || 5555;
export const mongoDBURL = process.env.MONGO_URI;


