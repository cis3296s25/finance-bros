const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  targetAmount: {
    type: Number,
    required: true,
  },
  currentAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  deadline: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    enum: ['Savings', 'Investment', 'Debt Repayment', 'Education', 'Retirement', 'Other'],
    default: 'Other',
  },
  status: {
    type: String,
    enum: ['In Progress', 'Completed', 'On Hold'],
    default: 'In Progress',
  },
  progressHistory: [{
    amount: Number,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  notifications: {
    enabled: {
      type: Boolean,
      default: true
    },
    frequency: {
      type: String,
      enum: ['Daily', 'Weekly', 'Monthly'],
      default: 'Weekly'
    },
    lastNotified: Date
  },
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

goalSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // Add current amount to progress history when it changes
  if (this.isModified('currentAmount')) {
    this.progressHistory.push({
      amount: this.currentAmount,
      date: new Date()
    });
  }
  
  // Update status based on progress
  if (this.currentAmount >= this.targetAmount) {
    this.status = 'Completed';
  } else if (this.status === 'Completed' && this.currentAmount < this.targetAmount) {
    this.status = 'In Progress';
  }
  
  next();
});

module.exports = mongoose.model('Goal', goalSchema); 