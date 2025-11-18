import { Request, Response } from "express";
import db from "../models";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const User = db.User;

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN BODY:", req.body);

    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ msg: "User not found" });

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.json({ msg: "Login successful", user });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ msg: "Login error", error: err });
  }
};

export const logout = async (req: Request, res: Response) => {
  const token = req.cookies?.token;

  // If token is missing → already logged out
  if (!token) {
    return res.status(400).json({
      msg: "You are already logged out",
    });
  }

  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  return res.json({ msg: "Logged out successfully" });
};


