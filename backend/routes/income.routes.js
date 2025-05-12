import express from 'express';
const router = express.Router();
import { protectRoute } from '../middleware/protectRoute.js';
import { addIncome, getAllIncome, deleteIncome } from '../controllers/income.controller.js';

router.post('/addIncome',protectRoute,addIncome);
router.get('/getIncome',protectRoute,getAllIncome);
router.delete('/deleteIncome/:id',protectRoute,deleteIncome);


export default router;