// routes/scrapPrice.routes.js
import express from 'express';
import { isAdmin, isAuthenticated } from '../middlewares/auth.middleware.js';
import { getScrapPrices, setScrapPrice } from '../controllers/scrapPriceController.js';


const router = express.Router();


router.post('/set-price',isAuthenticated, isAdmin, setScrapPrice); 
router.get('/prices',isAuthenticated, isAdmin, getScrapPrices); 

export default router;