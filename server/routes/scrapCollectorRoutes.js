import e from "express";
import { getScrapCollectorProfile, loginScrapCollector, logoutScrapCollector, registerScrapCollector } from "../controllers/scrapCollector.controller";
import { isAuthenticated, isScrapCollector } from "../middlewares/auth.middleware.js";
const router = e.Router();

router.post('/register', registerScrapCollector);

router.post('/login', loginScrapCollector);

router.get('/profile', isAuthenticated, isScrapCollector, getScrapCollectorProfile);

router.post('/logout', isAuthenticated, isScrapCollector, logoutScrapCollector);

export default router;