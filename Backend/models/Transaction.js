import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Income', 'Expense'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  tags: {
    type: [String],
    default: [],
  },
  notes: {
    type: String,
    default: '',
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;