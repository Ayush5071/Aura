import express from "express";
import { isAuthenticated, isScrapCollector } from "../middlewares/auth.middleware.js";
import { acceptPickupRequest, getAcceptedRequests, getRequestsByStatus, updateRequestStatus } from "../controllers/scscheduleController.js";
const router = express.Router();


router.post('/accept/:requestId',isAuthenticated,isScrapCollector,acceptPickupRequest);

router.get('/myrequests',isAuthenticated,isScrapCollector,getAcceptedRequests);

router.get('/requests/:status',isAuthenticated,isScrapCollector,getRequestsByStatus);

router.post('/updateStatus/:status',isAuthenticated,isScrapCollector,updateRequestStatus);

export default router;