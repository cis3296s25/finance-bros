import Transaction from '../models/Transaction.js';

// Get all transactions
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 }); // Sort by date (newest first)
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

// Add a new transaction
export const addTransaction = async (req, res) => {
  try {
    // Create a new transaction with proper date conversion
    const transaction = new Transaction({
      ...req.body,
      date: new Date(req.body.date), // Ensure proper Date object
    });

    // Save the transaction to the database
    const savedTransaction = await transaction.save();

    // Respond with the saved transaction
    res.status(201).json(savedTransaction);
  } catch (error) {
    console.error('Error saving transaction:', error);
    res.status(400).json({ error: error.message });
  }
};
// Update a transaction
export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTransaction = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a transaction
export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    if (!deletedTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};