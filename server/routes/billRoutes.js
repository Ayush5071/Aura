import express from 'express';

import { createBill, getAllBills, getBillById, getBillsByCollectorId, getBillsByCustomerId } from '../controllers/billController.js';
import { isAdmin, isAuthenticated, isCustomer, isScrapCollector } from '../middlewares/auth.middleware.js';

const router = express.Router();


router.post('/', isAuthenticated, isCustomer, createBill);

router.get('/:id', isAuthenticated, getBillById);

router.get('/', isAuthenticated, isAdmin, getAllBills);

router.get('/user/mybills', isAuthenticated, isCustomer, getBillsByCustomerId);

router.get('/scrapcollector/mybills',isAuthenticated, isScrapCollector, getBillsByCollectorId);



export default router;
