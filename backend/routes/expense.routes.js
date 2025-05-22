import express from 'express';  
const router = express.Router();
import { protectRoute } from '../middleware/protectRoute.js';
import { addExpense, getAllExpense, deleteExpense ,toExcel  } from '../controllers/expense.controller.js';    

router.post('/addExpense',protectRoute,addExpense);
router.get('/getExpense',protectRoute,getAllExpense); 
router.delete('/deleteExpense/:id',protectRoute,deleteExpense);
router.post('/downloadExcel',protectRoute,toExcel);

export default router;