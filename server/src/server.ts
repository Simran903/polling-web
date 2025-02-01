import express from "express";
import cors from 'cors'
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)

const PORT = process.env.PORT || 5000;

connectDB();

app.use("/api/v1/auth", authRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


