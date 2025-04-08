import mongoose from 'mongoose';

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Transaction Schema
const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['Income', 'Expense'], required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String },
});

// Category Schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  budget: { type: Number, required: true },
  spent: { type: Number, default: 0 },
});

// Budget Schema
const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  category: { type: String, required: true },
  limit: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

// Savings Schema
const savingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  goalName: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
  deadline: { type: Date, required: true },
});

// Debt Schema
const debtSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  creditor: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
});

// Subscriptions Schema
const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  frequency: { type: String, enum: ['Monthly', 'Yearly'], required: true },
  nextBillingDate: { type: Date, required: true },
});

// Financial Goals Schema
const financialGoalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  name: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
  deadline: { type: Date, required: true },
});

// Export Models
export const Users = mongoose.model('Users', userSchema);
export const Transactions = mongoose.model('Transactions', transactionSchema);
export const Category = mongoose.model('Categories', categorySchema);
export const Budgets = mongoose.model('Budgets', budgetSchema);
export const Savings = mongoose.model('Savings', savingSchema);
export const Debts = mongoose.model('Debts', debtSchema);
export const Subscriptions = mongoose.model('Subscriptions', subscriptionSchema);
export const FinancialGoals = mongoose.model('FinancialGoals', financialGoalSchema);


