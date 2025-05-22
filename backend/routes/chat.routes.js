import express from 'express'
const router=express.Router();
import { protectRoute } from '../middleware/protectRoute.js';
import {chat} from '../controllers/chat.controller.js'

router.post('/',protectRoute,chat)

export default router;