import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoutes from "./routes/user.route.js";
import promtRoutes from "./routes/promt.route.js";
import sessionRoute from "./routes/session.route.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 4001;
const MONGO_URL = process.env.MONGO_URI;

//Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//DB Connection Code Goes Here
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected To MongoDB"))
  .catch((error) => console.log("MongoDB Connection Error: ", error));

//Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/neromaxai", promtRoutes);
app.use("/api/v1/neromaxai", sessionRoute);

app.listen(port, () => {
  console.log(`Server Is Running On Port ${port}`);
});
