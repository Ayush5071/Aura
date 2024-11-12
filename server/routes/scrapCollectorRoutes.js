import express from "express";
import {
  getScrapCollectorProfile,
  loginScrapCollector,
  logoutScrapCollector,
  registerScrapCollector,
  updateScrapCollectorProfile,
} from "../controllers/scrapCollector.controller.js";
import {
  isAuthenticated,
  isScrapCollector,
} from "../middlewares/auth.middleware.js";
import ScrapCollector from "../models/scrapCollector.models.js";
import { upload } from "../helper/upload.js";
const router = express.Router();

router.post("/register", registerScrapCollector);

router.post("/login", loginScrapCollector);

router.get(
  "/profile",
  isAuthenticated,
  isScrapCollector,
  getScrapCollectorProfile
);

router.post("/logout", isAuthenticated, isScrapCollector, logoutScrapCollector);

router.post(
  "/profile",
  isAuthenticated,
  isScrapCollector,
  upload.single("image"), 
  updateScrapCollectorProfile
);

export default router;

