import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();

// Connect DB
connectDB();

// Mongoose Debug
mongoose.set("debug", true);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});