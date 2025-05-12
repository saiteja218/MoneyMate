import express from 'express';  
const router = express.Router();
import { protectRoute } from '../middleware/protectRoute.js';
import { addExpense, getAllExpense, deleteExpense } from '../controllers/expense.controller.js';    

router.post('/addExpense',protectRoute,addExpense);
router.get('/getExpense',protectRoute,getAllExpense); 
router.delete('/deleteExpense/:id',protectRoute,deleteExpense);

export default router;