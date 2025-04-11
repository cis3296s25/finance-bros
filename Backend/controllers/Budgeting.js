import Budgeting from '../models/budgeting.js';

// Get all budgeting items
export const getBudgetingItems = async (req, res) => {
  try {
    const budgetingItems = await Budgeting.find();
    res.status(200).json(budgetingItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch budgeting items' });
  }
};

// Add a new budgeting item
export const addBudgetingItem = async (req, res) => {
  try {
    const { name, budget } = req.body;

    // Validate input
    if (!name || budget === undefined) {
      return res.status(400).json({ error: 'Name and budget are required' });
    }

    const newBudgetingItem = new Budgeting({ name, budget, spent: 0 });
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
    const { name, budget } = req.body;

    const updatedBudgetingItem = await Budgeting.findByIdAndUpdate(
      id,
      { name, budget },
      { new: true } // Return the updated document
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