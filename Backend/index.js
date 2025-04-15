import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import budgetingRoutes from './routes/Budgeting.js'; // Import Budgeting routes
import transactionRoutes from './routes/Transaction.js';
import goalRoutes from './routes/Goal.js';
import cors from 'cors';

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); // Middleware to parse JSON request bodies

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('welcome to the homepage');
});

// Budgeting Routes
app.use('/budgeting', budgetingRoutes); // Connect Budgeting routes

// Transaction Routes
app.use('/transactions', transactionRoutes);

// Goal Routes
app.use('/goals', goalRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('Connected to the database');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('Error connecting to the database');
    console.error(error);
  });




