const express = require('express');
const router = express.Router();
const {
    getBudgets,
    createBudget,
    updateBudget,
    deleteBudget
} = require('../controllers/BudgetController');

// Get all budgets
router.get('/', getBudgets);

// Create a new budget
router.post('/', createBudget);

// Update a budget
router.put('/:id', updateBudget);

// Delete a budget
router.delete('/:id', deleteBudget);

module.exports = router; 