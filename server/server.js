import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes.js";
import scrapCollectorRoutes from "./routes/scrapCollectorRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import screquestRoutes from "./routes/screquestRoutes.js";
import scrapPriceRoutes from "./routes/scrapPriceRoutes.js";
import billRoutes from "./routes/billRoutes.js";
import jwt from 'jsonwebtoken';

import { connectDb } from "./db/connectDb.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.post('/test-login', (req, res) => {
  const token = jwt.sign({ userId: '123', role: 'customer' }, 'your-secret', { expiresIn: '1h' });

  res.cookie('token', token, {
      httpOnly: true,
      secure: false,  // Set to true in production
      maxAge: 60 * 60 * 1000,  // 1 hour expiration
      sameSite: 'None',
  });

  res.status(200).json({ message: 'Cookie set' });
});


app.use("/api/user/", userRoutes);
app.use("/api/scrapcollector/", scrapCollectorRoutes);
app.use("/api/user/scraprequest/", requestRoutes);
app.use("/api/scrapcollector/scraprequest/", screquestRoutes);
app.use("/api/admin/scrapprice/", scrapPriceRoutes);
app.use("/api/bill/", billRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  connectDb();
  console.log(`App is running very fine on port ${PORT}`);
});
