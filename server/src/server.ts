import express from "express";
import dotenv from "dotenv";
// import connectDB from "./config/db";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

const PORT = process.env.PORT || 5000;

// connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


