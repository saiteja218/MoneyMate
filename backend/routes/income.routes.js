import express from 'express';
const router = express.Router();
import { protectRoute } from '../middleware/protectRoute.js';
import { addIncome, getAllIncome, deleteIncome,toExcel ,toExcelAllTrasactions} from '../controllers/income.controller.js';

router.post('/addIncome',protectRoute,addIncome);
router.get('/getIncome',protectRoute,getAllIncome);
router.delete('/deleteIncome/:id',protectRoute,deleteIncome);
router.post('/downloadExcel',protectRoute,toExcel);
router.post('/downloadAllTrasactions',protectRoute,toExcelAllTrasactions);


export default router;