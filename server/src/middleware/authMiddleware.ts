import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "../models/UserSchema";

// Define a typed AuthRequest with user property
export interface AuthRequest extends Request {
  user?: Omit<IUser, "password">;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // Ensure JWT_SECRET exists
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not defined in environment variables");

    // Verify token
    const decoded = jwt.verify(token, secret) as JwtPayload & { id?: string };

    if (!decoded.id) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Find user and attach to request object (excluding password)
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user as Omit<IUser, "password">; // Assign to req.user

    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};