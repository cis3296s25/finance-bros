import Goal from '../models/Goal.js';

// Get all goals
const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({});
    return res.status(200).json(goals);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
};

// Create a new goal
const createGoal = async (req, res) => {
  try {
    if (!req.body.title || !req.body.targetAmount || !req.body.deadline || !req.body.category || !req.body.userId) {
      return res.status(400).send({
        message: 'Send all required fields: title, targetAmount, deadline, category, userId',
      });
    }
    const newGoal = {
      title: req.body.title,
      targetAmount: Number(req.body.targetAmount),
      deadline: new Date(req.body.deadline),
      category: req.body.category,
      currentAmount: Number(req.body.currentAmount) || 0,
      userId: req.body.userId,
      description: req.body.description || '',
      status: req.body.status || 'In Progress',
      notifications: req.body.notifications || {
        enabled: true,
        frequency: 'Weekly'
      }
    };
    const goal = await Goal.create(newGoal);
    return res.status(201).send(goal);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
};

// Update a goal
const updateGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Goal.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    return res.status(200).send({ message: 'Goal updated successfully' });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
};

// Delete a goal
const deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Goal.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    return res.status(200).send({ message: 'Goal deleted successfully' });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
};

export { getGoals, createGoal, updateGoal, deleteGoal }; 