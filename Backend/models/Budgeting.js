import mongoose from 'mongoose';

// Budgeting Schema
const budgetingSchema = new mongoose.Schema({
  category: { 
    type: String, 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  spent: { 
    type: Number, 
    default: 0 
  },
  notes: { 
    type: String 
  },
  userId: { 
    type: String,  // For Clerk authentication
    required: true 
  }
}, {
  timestamps: true
});

// Method to calculate current spending for the current month
budgetingSchema.methods.calculateSpending = async function() {
  const Transaction = mongoose.model('Transaction');
  
  // Get start and end of current month
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const transactions = await Transaction.find({
    category: this.category,
    date: { 
      $gte: startOfMonth, 
      $lte: endOfMonth 
    },
    type: 'Expense',
    userId: this.userId
  });

  this.spent = transactions.reduce((sum, t) => sum + t.amount, 0);
  await this.save();
  return this.spent;
};

// Export the Budgeting Model
const Budgeting = mongoose.model('Budgeting', budgetingSchema);
export default Budgeting;