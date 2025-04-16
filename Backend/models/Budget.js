const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
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
    period: {
        type: String,
        default: 'monthly'
    },
    startDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Budget', budgetSchema); 