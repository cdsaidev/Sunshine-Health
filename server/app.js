import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./database/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";

// DOTENV CONFIGURATION
dotenv.config();

// REST OBJ
const app = express();

//******** MIDDLEWARE *******/
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// DATABASE CONFIGURATION
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ success: false, message: "Database connection error" });
  }
});

//***** MIDDLEWARE ROUTES *****/
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/doctor", doctorRoutes);

export default app;
