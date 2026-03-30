import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB";

dotenv.config();

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});