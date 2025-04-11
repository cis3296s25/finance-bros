import mongoose from 'mongoose';



// Category Schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  budget: { type: Number, required: true },
  spent: { type: Number, default: 0 },
});

// Export Models
export const Category = mongoose.model('Categories', categorySchema);


