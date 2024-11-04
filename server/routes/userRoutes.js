import express from "express";
import {
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/authController.js";
import { isAuthenticated, isCustomer } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", isAuthenticated, isCustomer, logoutUser);

router.get("/profile", isAuthenticated, isCustomer, getProfile);

export default router;
