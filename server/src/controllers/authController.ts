import { Request, Response, NextFunction } from "express";
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

// Sign up user
export const signupUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const {
    username,
    email,
    password,
    profileImageUrl,
  }: {
    username: string;
    email: string;
    password: string;
    profileImageUrl?: string;
  } = req.body;

  // Validation: check for missing fields
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validation: check username format
  const usernameRegex: RegExp = /^[a-zA-Z0-9-]+$/;
  if (!usernameRegex.test(username)) {
    return res.status(400).json({
      message:
        "Invalid username. Only alphanumeric characters and hyphens are allowed. No spaces are permitted.",
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

    // Create user
    const user: IUser = await User.create({
      username,
      email,
      password,
      profileImageUrl,
    });

    // Send response
    return res.status(201).json({
      id: user._id.toString(),
      user,
      token: generateToken(user._id.toString()),
    });
  } catch (err: unknown) {
    console.error("Error registering user:", err);
    return res.status(500).json({
      message: "Error registering user",
      error:
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : (err as Error).message,
    });
  }
};

// Sign in user
export const signinUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  
  const { email, password }: { email: string; password: string } = req.body;

   // Validation: check for missing fields
   if (!email || !password) {
     return res.status(400).json({ message: "All fields are required" });
   }

   try {
     const user = await User.findOne({ email });

     if (!user || !(await user.comparePassword(password))) {
       return res.status(400).json({
         message: "Invalid credentials",
       });
     }

     return res.status(200).json({
       id: user._id.toString(),
       user: {
         ...user.toObject(),
         totalPollsCreated: 0,
         totalPollsVotes: 0,
         totalPollsBookmarked: 0,
       },
       token: generateToken(user._id.toString()),
     });
   } catch (err) {
     console.error("Error signing in:", err);
     return res.status(500).json({
       message: "Error signing in",
       error:
         process.env.NODE_ENV === "production"
           ? "Internal Server Error"
           : (err as Error).message,
     });
   }
};

// Get user info
export const getUserInfo = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {

   try {
     const user = await User.findById(req?.user?.id).select("-password");

     if (!user) {
       return res.status(404).json({
         message:"User not found"
       })
     }

     const userInfo = {
       ...user?.toObject(),
       totalPollsCreated:user?.totalPollsCreated ??0, 
       totalPollsVotes:user?.totalPollsVotes ??0 ,
       totalPollsBookmarked:user?.totalPollsBookmarked ??0 ,
     };
     
     
     return res.status(200).json(userInfo);

   } catch (err) {
     console.error("Error fetching user:", err);
     return res.status(500).json({
       message:"Error fetching user",
       error:
         process.env.NODE_ENV === "production"
           ? "Internal Server Error"
           : (err as Error).message ,
     });
   }
};