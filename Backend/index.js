import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import budgetingRoutes from './routes/Budgeting.js'; // Import Budgeting routes

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('welcome to the homepage');
});



// Budgeting Routes
app.use('/budgeting', budgetingRoutes); // Connect Budgeting routes






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




