import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/UserSchema";

interface AuthRequest extends Request {
  user?: Omit<IUser, "password">;
}

// Generate JWT token
const generateToken = (id: string): string => {
  const secret: string | undefined = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return jwt.sign({ id }, secret, { expiresIn: "1d" });
};
 
// Register User
const signupUser = async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response> => {
  const { username, email, password, profileImageUrl }: { username: string; email: string; password: string; profileImageUrl?: string } = req.body;

  // Validation: check for missing fields
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validation: check username format
  const usernameRegex: RegExp = /^[a-zA-Z0-9-]+$/;
  if (!usernameRegex.test(username)) {
    return res.status(400).json({
      message: "Invalid username. Only alphanumeric characters and hyphens are allowed. No spaces are permitted.",
    });
  }

  try {
    // Check if email already exists
    const existingUser: IUser | null = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Check if username already exists
    const existingUsername: IUser | null = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username not available" });
    }

    // Hash password before saving
    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(password, salt);

    // Create user
    const user: IUser = await User.create({
      username,
      email,
      password: hashedPassword,
      profileImageUrl,
    });

    // Send response
    return res.status(201).json({
      id: user._id.toString(),
      user,
      token: generateToken(user._id.toString()),
    });
  } catch (err: any) {
    console.error("Error registering user:", err);
    return res.status(500).json({
      message: "Error registering user",
      error: process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message,
    });
  }
};

export { signupUser };