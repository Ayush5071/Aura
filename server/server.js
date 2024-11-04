import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes.js";
import scrapCollectorRoutes from "./routes/scrapCollectorRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import screquestRoutes from "./routes/screquestRoutes.js";
import scrapPriceRoutes from "./routes/scrapPriceRoutes.js";
import billRoutes from "./routes/billRoutes.js"

import { connectDb } from "./db/connectDb.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.use("/api/user/", userRoutes);
app.use("/api/scrapcollector/", scrapCollectorRoutes);
app.use("/api/user/scraprequest/",requestRoutes);
app.use("/api/scrapcollector/scraprequest/",screquestRoutes); // sc = scrap collector 
app.use("/api/admin/scrapprice/",scrapPriceRoutes); 
app.use("/api/bill/",billRoutes); 

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  connectDb();
  console.log(`App is running very fine on port ${PORT}`);
});
