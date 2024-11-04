import express from "express";
const router = express.Router();


router.post('/schedule', createPickupSchedule);
router.get('/schedules', getAllSchedules);
router.get('/status/:status', getSchedulesByStatus);


export default router;