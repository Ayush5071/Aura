import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js"
import { connectDb } from "./db/connectDb.js";
import dotenv from "dotenv"

dotenv.config()

const app = express();

app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.use("/api/auth",authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  connectDb();
  console.log(`App is running very fine on port ${PORT}`);
});
