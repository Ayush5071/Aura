import express from "express";
import { isScrapCollector } from "../middlewares/auth.middleware";
const router = express.Router();

router.post('/accept',isScrapCollector,);
router.get('/myrequests',isScrapCollector,);
router.get('/requests',isScrapCollector,);
router.post('/updateStatus/:status',isScrapCollector,);
