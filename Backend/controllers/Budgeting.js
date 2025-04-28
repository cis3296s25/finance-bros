import Budgeting from '../models/budgeting.js';

// Get all budgeting items
export const getBudgetingItems = async (req, res) => {
  try {
    const budgetingItems = await Budgeting.find({ userId: '1' });
    res.status(200).json(budgetingItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch budgeting items' });
  }
};

// Add a new budgeting item
export const addBudgetingItem = async (req, res) => {
  try {
    const { category, amount, notes, userId, period, startDate } = req.body;

    // Validate input
    if (!category || amount === undefined || !userId) {
      return res.status(400).json({ error: 'Category, amount, and userId are required' });
    }

    const newBudgetingItem = new Budgeting({
      category,
      amount,
      notes,
      userId,
      period,
      startDate,
      spent: 0
    });
    
    const savedBudgetingItem = await newBudgetingItem.save();
    res.status(201).json(savedBudgetingItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a budgeting item
export const updateBudgetingItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, amount, notes } = req.body;

    const updatedBudgetingItem = await Budgeting.findByIdAndUpdate(
      id,
      { category, amount, notes },
      { new: true }
    );

    if (!updatedBudgetingItem) {
      return res.status(404).json({ error: 'Budgeting item not found' });
    }

    res.status(200).json(updatedBudgetingItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a budgeting item
export const deleteBudgetingItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBudgetingItem = await Budgeting.findByIdAndDelete(id);

    if (!deletedBudgetingItem) {
      return res.status(404).json({ error: 'Budgeting item not found' });
    }

    res.status(200).json({ message: 'Budgeting item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};