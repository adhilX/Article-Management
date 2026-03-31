import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectDB";
import authRoutes from "./routes/authRoutes";
import articleRoutes from "./routes/articleRoutes";

import { errorHandler } from "./middleware/errorMiddleware";

dotenv.config();

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});