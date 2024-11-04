import express from "express";
import { createPickupSchedule, getAllSchedules, getSchedulesByStatus } from "../controllers/scheduleController.js";
import { isAuthenticated, isCustomer } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post('/schedule',isAuthenticated,isCustomer,createPickupSchedule);
router.get('/schedules',isAuthenticated,isCustomer,getAllSchedules);
router.get('/status/:status',isAuthenticated,isCustomer,getSchedulesByStatus);

export default router;