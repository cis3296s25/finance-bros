import mongoose from 'mongoose';

// Budgeting Schema
const budgetingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  budget: { type: Number, required: true },
  spent: { type: Number, default: 0 },
});

// Export the Budgeting Model
const Budgeting = mongoose.model('Budgeting', budgetingSchema);
export default Budgeting;