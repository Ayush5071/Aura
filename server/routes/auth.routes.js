import express from "express"
import { getProfile, loginUser, logoutUser, registerUser } from "../controllers/authController.js";

const router = express.Router();

router.post('/register',registerUser);

router.post('/login',loginUser);

router.get('/logout',logoutUser);

router.get('/profile',getProfile);

export default router;