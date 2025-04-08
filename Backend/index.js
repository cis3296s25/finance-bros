import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Users, Transactions, Category } from './models/financeModels.js';

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

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
// Route to get all users
app.get('/users', async (req, res) => {
  try {
    const users = await Users.find({}); // Fetch all users from the database
    res.status(200).json({ // Respond with the list of users
        count: users.length, // Count the number of users
        data: users // Data to be sent in the response
    });
  } catch (error) {
    console.log(error); // Log the error for debugging
    res.status(500).send({ error: error.message }); // Handle errors
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

// Route to get all categories
app.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to add a new category
app.post('/categories', async (req, res) => {
  try {
    const category = new Category(req.body);
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to delete a category by ID
app.delete('/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
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




