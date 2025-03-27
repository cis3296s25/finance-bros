import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Users, Transactions } from './models/financeModels.js';

const app = express();

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('welcome to the homepage');
});

app.post('/users', async (req, res) => {
  try {
    const user = new Users(req.body); // Create a new user from the request body
    const savedUser = await user.save(); // Save the user to the database
    res.status(201).json(savedUser); // Respond with the saved user
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle errors
  }
});

// Route to save a new transaction
app.post('/transactions', async (req, res) => {
  try {
    const transaction = new Transactions(req.body); // Create a new transaction from the request body
    const savedTransaction = await transaction.save(); // Save the transaction to the database
    res.status(201).json(savedTransaction); // Respond with the saved transaction
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle errors
  }
});



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