import express from 'express';
import {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal
} from '../controllers/goalController.js';

const router = express.Router();

router.route('/')
  .get(getGoals)
  .post(validateGoal, createGoal);

router.route('/:id')
  .put(validateGoal, updateGoal)
  .delete(deleteGoal);

export default router;