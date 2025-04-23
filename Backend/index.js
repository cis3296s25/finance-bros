import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoDBURL } from './config.js';
import budgetingRoutes from './routes/Budgeting.js'; // Import Budgeting routes
import transactionRoutes from './routes/Transaction.js';
import goalRoutes from './routes/Goal.js';
// import aiRoutes from './routes/ai.js';
import { aiRoutes } from './routes/ai.js';

import cors from 'cors';

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); // Middleware to parse JSON request bodies


// took this out because it was causing issues with the frontend
// app.use(cors()); // Enable CORS for all routes


// Default Route
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Finance Bros API');
});

// Budgeting Routes
app.use('/budgeting', budgetingRoutes); // Connect Budgeting routes

// Transaction Routes
app.use('/transactions', transactionRoutes);

// Goal Routes
app.use('/goals', goalRoutes);

// AI Chat Route
app.use('/api/ai', aiRoutes); // 👈 add this line here

mongoose
  .connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });




