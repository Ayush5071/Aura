import express from "express";
import { createPickupSchedule, getAllSchedules, getSchedulesByStatus } from "../controllers/scheduleController.js";
const router = express.Router();



router.post('/schedule', createPickupSchedule);
router.get('/schedules', getAllSchedules);
router.get('/status/:status', getSchedulesByStatus);


export default router;