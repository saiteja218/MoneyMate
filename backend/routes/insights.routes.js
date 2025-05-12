import express from 'express';
import { weeklyInsights,monthlyInsights,yearlyInsights } from '../controllers/insights.controller.js'; 
import { protectRoute } from '../middleware/protectRoute.js';
const router = express.Router();

router.get('/weekly',protectRoute, weeklyInsights);
router.get('/monthly',protectRoute, monthlyInsights);
router.get('/yearly',protectRoute ,yearlyInsights);

export default router;