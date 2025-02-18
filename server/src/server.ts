import express from "express";
import cors from 'cors'
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import pollRoutes from "./routes/pollRoutes";
import path from "path";

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
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/poll", pollRoutes);

// serve uploads folder
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});