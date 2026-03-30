import { Request, Response } from "express";
import User from "../models/userModel";
import generateToken from "../utils/generateToken";
import { hashPassword } from "../utils/passwordUtils";


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
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};
