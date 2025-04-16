const Budget = require('../models/Budget');

// Get all budgets
const getBudgets = async (req, res) => {
    try {
        const budgets = await Budget.find({ userId: '1' });
        res.status(200).json(budgets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new budget
const createBudget = async (req, res) => {
    try {
        const budget = new Budget(req.body);
        const savedBudget = await budget.save();
        res.status(201).json(savedBudget);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a budget
const updateBudget = async (req, res) => {
    try {
        const { id } = req.params;
        const budget = await Budget.findByIdAndUpdate(id, req.body, { new: true });
        if (!budget) {
            return res.status(404).json({ message: 'Budget not found' });
        }
        res.status(200).json(budget);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a budget
const deleteBudget = async (req, res) => {
    try {
        const { id } = req.params;
        const budget = await Budget.findByIdAndDelete(id);
        if (!budget) {
            return res.status(404).json({ message: 'Budget not found' });
        }
        res.status(200).json({ message: 'Budget deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getBudgets,
    createBudget,
    updateBudget,
    deleteBudget
}; 