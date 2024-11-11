import express from "express";
import {
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateProfile,
} from "../controllers/authController.js";
import { isAuthenticated, isCustomer } from "../middlewares/auth.middleware.js";
import { upload } from "../helper/upload.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", isAuthenticated, isCustomer, logoutUser);

router.get("/profile", isAuthenticated, isCustomer, getProfile);

router.post("/profile/update", isAuthenticated, isCustomer,upload.single('image'), updateProfile);

export default router;
