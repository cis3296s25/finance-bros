import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoDBURL } from './config.js';
import budgetingRoutes from './routes/Budgeting.js'; // Import Budgeting routes
import transactionRoutes from './routes/transactions.js';
import cors from 'cors';


const app = express(); // Initialize the app

// Middleware
app.use(express.json()); // Parse JSON request bodies

app.use(cors()); // Enable CORS for all routes
// Default Route
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Finance Bros API');
});

// Budgeting Routes
app.use('/budgeting', budgetingRoutes); // Connect Budgeting routes

// Transaction Routes
app.use('/transactions', transactionRoutes);

// Database Connection and Server Startup
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




