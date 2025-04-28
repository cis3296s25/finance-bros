import Transaction from '../models/Transaction.js';

// Get all transactions
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({});
    return res.status(200).json(transactions);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
};

// Create a new transaction
export const createTransaction = async (req, res) => {
  try {
    if (!req.body.description || !req.body.amount || !req.body.type || !req.body.category) {
      return res.status(400).send({
        message: 'Send all required fields: description, amount, type, category',
      });
    }
    const newTransaction = {
      description: req.body.description,
      amount: req.body.amount,
      type: req.body.type,
      category: req.body.category,
    };
    const transaction = await Transaction.create(newTransaction);
    return res.status(201).send(transaction);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
}; 