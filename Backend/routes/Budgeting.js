import express from 'express';
import {
  getBudgetingItems,
  addBudgetingItem,
  updateBudgetingItem,
  deleteBudgetingItem,
} from '../controllers/budgeting.js';

const router = express.Router();

// Route to get all budgeting items
router.get('/', getBudgetingItems);

// Route to add a new budgeting item
router.post('/', addBudgetingItem);

// Route to update a budgeting item
router.put('/:id', updateBudgetingItem);

// Route to delete a budgeting item
router.delete('/:id', deleteBudgetingItem);


export default router;