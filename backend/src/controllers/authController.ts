import { Request, Response } from "express";
import User from "../models/userModel";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken";
import { hashPassword, comparePassword } from "../utils/passwordUtils";

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
export const registerUser = async (req: Request, res: Response) => {
  console.log("Signup request received:", req.body);
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "Please enter all fields" });
    return;
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  // password hashing
  const hashedPassword = await hashPassword(password);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    const refreshToken = generateRefreshToken(user.id);
    
    // Set refresh token in cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    });

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      accessToken: generateAccessToken(user.id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// @desc    Authenticate user & get tokens
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await comparePassword(password, user.password))) {
    const refreshToken = generateRefreshToken(user.id);

    // Set refresh token in cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    });

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      accessToken: generateAccessToken(user.id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};
