import express from 'express'
import { addSavingsGoal,getSavingsGoal,getGoals,deleteSavingsGoal, updateSavingsGoal } from '../controllers/savings.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';
const router=express.Router();

router.post('/addsavingsGoal',protectRoute,addSavingsGoal);
router.get('/getSavingsGoal',protectRoute,getSavingsGoal);
router.get('/getgoals',protectRoute,getGoals);
router.delete('/deleteSavingsGoal/:id',protectRoute,deleteSavingsGoal);
router.put('/updateSavingsGoal/:id',protectRoute,updateSavingsGoal)

export default router;